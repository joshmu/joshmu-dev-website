/**
 * @path /src/components/Galaxy/Galaxy.tsx
 *
 * @project joshmu-dev-website
 * @file Galaxy.tsx
 *
 * @see https://www.youtube.com/watch?v=Q7AOvWpIVHU
 * @author Josh Mu <hello@joshmu.dev>
 * @created Sunday, 23rd January 2022
 * @modified Sunday, 23rd January 2022 9:53:04 pm
 * @copyright © 2020 - 2022 MU
 */

import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface InitGalaxyFn {
  (): void;
  cleanUp?: () => void;
}

const initGalaxy: InitGalaxyFn = function () {
  const scene = new THREE.Scene();

  // field of view / aspect ratio / near / far
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  // render machine and target
  const canvas = document.getElementById("galaxy") as HTMLCanvasElement | null;
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas ?? undefined,
    powerPreference: "low-power",
    antialias: false,
  });

  // Cap DPR. Uncapped, 3x retina renders 9x the pixels of 1x — on browsers
  // without hardware-accelerated WebGL (Arc sandbox, software fallback) this
  // tanks the framerate.
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  // full screen canvas
  renderer.setSize(window.innerWidth, window.innerHeight);
  // render.setClearColor(0xffffff)
  // camera.position.z = 5
  camera.position.set(0, 0, 30);

  // init renderer
  renderer.render(scene, camera);

  const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
  const material = new THREE.MeshBasicMaterial({
    color: 0xff6347,
    wireframe: true,
  });
  // const material = new THREE.MeshStandardMaterial({
  //   color: 0xff6347,
  // })
  const torus = new THREE.Mesh(geometry, material);
  torus.position.x = 10;

  scene.add(torus);

  // light (when using standard mesh)
  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(5, 5, 5);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

  scene.add(pointLight, ambientLight);

  // controls
  const enableControls = false;
  let controls: OrbitControls | null = null;
  if (enableControls) controls = new OrbitControls(camera, renderer.domElement);

  // add stars
  function addStar() {
    const geometry = new THREE.SphereGeometry(0.1, 12, 12);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
      .fill(null)
      .map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);

    scene.add(star);
  }
  Array(50).fill(null).forEach(addStar);

  // Track scroll top via rAF instead of reading getBoundingClientRect on every
  // scroll event (forced reflow). Update only when a new frame is requested.
  let scrollTop = 0;
  let scrollDirty = false;
  function onScroll() {
    if (scrollDirty) return;
    scrollDirty = true;
    requestAnimationFrame(() => {
      scrollTop = document.body.getBoundingClientRect().top;
      scrollDirty = false;
    });
  }
  scrollTop = document.body.getBoundingClientRect().top;
  document.addEventListener("scroll", onScroll, { passive: true });

  // Pause the animation loop when the canvas is offscreen — no point burning
  // GPU/CPU rendering pixels nobody can see.
  let visible = true;
  let observer: IntersectionObserver | null = null;
  if (canvas && typeof IntersectionObserver !== "undefined") {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(canvas);
  }

  let rafId = 0;

  // external clean up when react component unmounts
  initGalaxy.cleanUp = () => {
    document.removeEventListener("scroll", onScroll);
    observer?.disconnect();
    cancelAnimationFrame(rafId);
  };

  // animation loop
  function animate() {
    rafId = requestAnimationFrame(animate);

    torus.rotation.x += 0.0004;
    torus.rotation.y += 0.0002;
    torus.rotation.z += 0.00001;

    camera.position.x = scrollTop * -0.002;
    camera.position.y = scrollTop * -0.005;
    camera.position.z = scrollTop * -0.01;

    if (enableControls && controls) controls.update();

    if (visible) renderer.render(scene, camera);
  }
  animate();
};

type ThreeProps = { props?: { [key: string]: any } };

export const Galaxy = ({ ...props }: ThreeProps) => {
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    try {
      initGalaxy();
    } catch (err) {
      // WebGL context creation can fail in sandboxed/privacy browsers (Arc, Brave shields,
      // hardware-accel disabled). The galaxy is decorative — swallow the error so the
      // rest of the page keeps rendering.
      console.warn("Galaxy disabled: WebGL unavailable", err);
    }

    return initGalaxy.cleanUp;
  }, []);

  return (
    <canvas id="galaxy" className="fixed top-0 left-0 cursor-none opacity-20" {...props}></canvas>
  );
};
