import React, { useEffect, useRef } from "react";
import {
  Camera,
  Mesh,
  Plane,
  Program,
  Renderer,
  Texture,
  Transform,
} from "ogl";

// === Utility Functions ===
function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== "constructor" && typeof instance[key] === "function") {
      instance[key] = instance[key].bind(instance);
    }
  });
}

// === Text Texture for Titles ===
function createTextTexture(gl, text, font = "bold 30px monospace", color = "white") {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = font;
  const metrics = ctx.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const textHeight = Math.ceil(parseInt(font, 10) * 1.2);
  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  // don't generate mipmaps for canvas/text textures
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

// === Title Class ===
class Title {
  constructor({ gl, plane, text, textColor = "#fff", font = "30px sans-serif" }) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }

  createMesh() {
    const { texture, width, height } = createTextTexture(
      this.gl,
      this.text,
      this.font,
      this.textColor
    );
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    const textHeight = this.plane.scale.y * 0.15;
    const textWidth = textHeight * aspect;
    this.mesh.scale.set(textWidth, textHeight, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05;
    this.mesh.setParent(this.plane);
  }
}

// === Media Class (handles image or video) ===
class Media {
  constructor({
    geometry,
    gl,
    source,
    index,
    length,
    scene,
    viewport,
    bend,
    text,
    textColor,
    borderRadius = 0,
    font,
  }) {
    autoBind(this);
    this.geometry = geometry;
    this.gl = gl;
    this.source = source;
    this.index = index;
    this.length = length;
    this.scene = scene;
    this.viewport = viewport;
    this.bend = bend;
    this.text = text;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.video = null;
    this.img = null;
    this.textureReady = false;

    // create texture and program (texture.image will be set later when ready)
    this.texture = new Texture(this.gl, { generateMipmaps: false });
    this.createProgram();
    this.createMesh();
    this.createTitle();
    this.setupSource();
  }

  createProgram() {
    this.program = new Program(this.gl, {
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.05) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: this.texture } },
      transparent: true,
    });
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.plane.setParent(this.scene);
  }

  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      text: this.text,
      textColor: this.textColor,
      font: this.font,
    });
  }

  setupSource() {
    // If source looks like a video, prepare a video element and wait for canplay
    if (this.source && (this.source.endsWith(".mp4") || this.source.endsWith(".webm"))) {
      this.video = document.createElement("video");
      this.video.src = this.source;
      this.video.crossOrigin = "anonymous";
      this.video.loop = true;
      this.video.muted = true;
      this.video.playsInline = true;
      this.video.preload = "auto";

      const onCanPlay = () => {
        // Only assign when we have valid dimensions and data
        if (this.video.videoWidth > 0 && this.video.videoHeight > 0) {
          try {
            this.texture.image = this.video;
            this.textureReady = true;
            // attempt autoplay, fallback handled below
            this.video.play().catch(() => {
              // autoplay blocked - wait for user gesture
              if (!this._autoplayClickAttached) {
                this._autoplayClickAttached = true;
                const resume = () => {
                  this.video.play().catch(() => {});
                  window.removeEventListener("click", resume);
                };
                window.addEventListener("click", resume);
              }
            });
          } catch (err) {
            // assign later in update loop when ready
            console.warn("Error assigning video texture — will retry in update.", err);
          }
        }
      };

      this.video.addEventListener("canplay", onCanPlay);
      // keep reference so we can remove listener on destroy
      this._videoCanPlayListener = onCanPlay;
      // start loading
      this.video.load();
    } else {
      // image flow
      this.img = new Image();
      this.img.crossOrigin = "anonymous";
      this.img.src = this.source;
      this.img.onload = () => {
        try {
          this.texture.image = this.img;
          this.textureReady = true;
        } catch (err) {
          console.warn("Error assigning image texture — will retry in update.", err);
        }
      };
      this.img.onerror = (e) => {
        console.warn("Image failed to load:", this.source, e);
      };
    }
  }

  update(scroll, direction) {
    if (!this.viewport) return;

    this.plane.position.x = this.x - scroll.current;
    const H = this.viewport.width / 2 || 1;
    const bendAmount = this.bend || 2;
    const offset = (this.plane.position.x / H) * bendAmount;
    this.plane.position.y = Math.sin(offset) * 2;
    this.plane.rotation.z = -offset * 0.5;

    // If video became ready but assignment failed earlier, try again
    if (this.video && !this.textureReady) {
      if (this.video.readyState >= this.video.HAVE_CURRENT_DATA && this.video.videoWidth > 0 && this.video.videoHeight > 0) {
        try {
          this.texture.image = this.video;
          this.textureReady = true;
        } catch (err) {
          // will try again next frame
        }
      }
    }

    // Update video frame (only when there is data)
    if (this.video && this.textureReady) {
      if (this.video.readyState >= this.video.HAVE_CURRENT_DATA && this.video.videoWidth > 0 && this.video.videoHeight > 0) {
        // assign image each frame to ensure current frame uploaded
        // assigning is safe because texture.image already equals video, but
        // some contexts require explicit needsUpdate
        this.texture.needsUpdate = true;
      }
    }
  }

  onResize({ screen, viewport }) {
    this.viewport = viewport;
    // good default scale - you can tweak multipliers to taste
    const scaleX = Math.max(0.05, viewport.width * 0.15);
    const scaleY = Math.max(0.05, viewport.height * 0.15);
    this.plane.scale.set(scaleX, scaleY, 1);
    this.x = (this.index - this.length / 2) * (this.plane.scale.x * 1.5);
  }

  destroy() {
    if (this.video) {
      try {
        this.video.pause();
        this.video.src = "";
        this.video.load();
      } catch (e) {}
      if (this._videoCanPlayListener) this.video.removeEventListener("canplay", this._videoCanPlayListener);
    }
    if (this.img) {
      try {
        this.img.src = "";
      } catch (e) {}
    }
  }
}

// === App Controller ===
class App {
  constructor(container, { items = [], bend = 2, textColor = "#fff", borderRadius = 0, font = "bold 30px Figtree", scrollSpeed = 2, scrollEase = 0.05 }) {
    autoBind(this);
    this.container = container;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.scrollSpeed = scrollSpeed;
    this.items = items;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this._raf = null;

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.createGeometry();

    // safe default viewport (used until onResize runs)
    this.viewport = { width: Math.max(1, window.innerWidth / 100), height: Math.max(1, window.innerHeight / 100) };

    // create medias after renderer + viewport exist
    this.createMedias(this.items);

    // listeners and initial sizing
    this.addEventListeners();
    // ensure layout is correct then start loop
    this.onResize();
    this.update();
  }

  createRenderer() {
    this.renderer = new Renderer({ alpha: true, antialias: true });
    this.gl = this.renderer.gl;
    // append canvas to container
    if (this.container) {
      this.container.appendChild(this.gl.canvas);
    } else {
      console.warn("CircularGallery: container is not present");
    }
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.position.z = 10;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.geometry = new Plane(this.gl);
  }

  createMedias(items) {
    this.medias = items.map((data, i) => {
      return new Media({
        geometry: this.geometry,
        gl: this.gl,
        source: data.image,
        index: i,
        length: items.length,
        scene: this.scene,
        viewport: this.viewport,
        bend: this.bend,
        text: data.text,
        textColor: this.textColor,
        borderRadius: this.borderRadius,
        font: this.font,
      });
    });
  }

  onResize() {
    if (!this.container) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.renderer.setSize(width, height);
    // keep viewport units (scale down to "scene units")
    this.viewport = { width: Math.max(1, width / 100), height: Math.max(1, height / 100) };
    if (this.medias) {
      this.medias.forEach((m) => m.onResize({ screen: { width, height }, viewport: this.viewport }));
    }
  }

  update() {
    // lerp scroll
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);

    const direction = this.scroll.current > this.scroll.last ? "right" : "left";

    if (this.medias) {
      this.medias.forEach((m) => m.update(this.scroll, direction));
    }

    // render
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render({ scene: this.scene, camera: this.camera });
    }

    this.scroll.last = this.scroll.current;
    this._raf = requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    this._boundResize = this.onResize.bind(this);
    this._boundWheel = (e) => {
      this.scroll.target += e.deltaY * 0.01 * this.scrollSpeed;
    };
    window.addEventListener("resize", this._boundResize);
    window.addEventListener("wheel", this._boundWheel, { passive: true });

    // pointer/touch support to drag scroll (basic)
    this._isDown = false;
    this._startX = 0;
    this._startScroll = 0;

    this._onDown = (e) => {
      this._isDown = true;
      this._startX = e.touches ? e.touches[0].clientX : e.clientX;
      this._startScroll = this.scroll.current;
    };
    this._onMove = (e) => {
      if (!this._isDown) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (this._startX - x) * (this.scrollSpeed * 0.02);
      this.scroll.target = this._startScroll + delta;
    };
    this._onUp = () => {
      this._isDown = false;
    };

    window.addEventListener("mousedown", this._onDown);
    window.addEventListener("mousemove", this._onMove);
    window.addEventListener("mouseup", this._onUp);
    window.addEventListener("touchstart", this._onDown, { passive: true });
    window.addEventListener("touchmove", this._onMove, { passive: true });
    window.addEventListener("touchend", this._onUp, { passive: true });
  }

  destroy() {
    // stop RAF
    if (this._raf) cancelAnimationFrame(this._raf);
    // remove listeners
    window.removeEventListener("resize", this._boundResize);
    window.removeEventListener("wheel", this._boundWheel);
    window.removeEventListener("mousedown", this._onDown);
    window.removeEventListener("mousemove", this._onMove);
    window.removeEventListener("mouseup", this._onUp);
    window.removeEventListener("touchstart", this._onDown);
    window.removeEventListener("touchmove", this._onMove);
    window.removeEventListener("touchend", this._onUp);

    // destroy medias (stop videos, free images)
    if (this.medias && this.medias.length) {
      this.medias.forEach((m) => {
        try {
          m.destroy();
        } catch (e) {}
      });
    }

    // remove canvas
    try {
      if (this.renderer && this.renderer.gl && this.renderer.gl.canvas && this.renderer.gl.canvas.parentNode) {
        this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
      }
    } catch (e) {}
  }
}

// === React Wrapper Component ===
export default function CircularGallery({
  items = [
    { image: "/assets/image/dinner/d1.jpg", text: "Dinner Night" },
    { image: "/assets/image/dinner/d3.jpg", text: "Family Table" },
    { image: "/assets/image/videos/v1.mp4", text: "Ocean Waves" }, // example video
    { image: "/assets/image/banner2.jpg", text: "Bridge View" },
  ],
  bend = 2,
  textColor = "#fff",
  borderRadius = 0.05,
  font = "bold 30px Figtree",
  scrollSpeed = 2,
  scrollEase = 0.05,
}) {
  const containerRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const app = new App(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      font,
      scrollSpeed,
      scrollEase,
    });
    appRef.current = app;
    return () => {
      try {
        app.destroy();
      } catch (e) {}
      appRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty: recreate manually if parent unmounts

  return <div className="circular-gallery" ref={containerRef} style={{ width: "100%", height: "100%", minHeight: "420px" }} />;
}
