'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = host.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
    } catch { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.35));
    renderer.setSize(element.clientWidth, element.clientHeight);
    renderer.setClearColor(0x000000, 0);
    element.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, element.clientWidth / element.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 8);
    const group = new THREE.Group();
    scene.add(group);
    const geometry = new THREE.IcosahedronGeometry(1.12, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.34 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(2.2, 0.2, 0);
    group.add(mesh);
    const smallGeometry = new THREE.BoxGeometry(0.72, 0.72, 0.72);
    const smallMaterial = new THREE.MeshBasicMaterial({ color: 0x36d9ff, wireframe: true, transparent: true, opacity: 0.34 });
    const cube = new THREE.Mesh(smallGeometry, smallMaterial);
    cube.position.set(-2.2, -1.15, -0.6);
    group.add(cube);
    const resize = () => {
      if (!element) return;
      const width = element.clientWidth || 1;
      const height = element.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    let visible = true;
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    intersection.observe(element);
    let frame = 0;
    const clock = new THREE.Clock();
    const render = () => {
      frame = requestAnimationFrame(render);
      if (!visible || document.hidden) return;
      const t = clock.getElapsedTime();
      mesh.rotation.x = t * 0.12;
      mesh.rotation.y = t * 0.18;
      cube.rotation.x = t * 0.16;
      cube.rotation.y = t * -0.2;
      renderer.render(scene, camera);
    };
    render();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      geometry.dispose(); material.dispose(); smallGeometry.dispose(); smallMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  return <div ref={host} aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.65 }} />;
}
