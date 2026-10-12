import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * A bespoke kinetic monogram for the portfolio.
 * The letterform is constructed from machined segments rather than stock 3D props.
 * Scrolling separates and brings the pieces back into a coherent mark.
 */
export default function KineticMonogram() {
  const holder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const attached = holder.current;
    if (!attached) return;
    const element: HTMLDivElement = attached;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reduced = motionPreference.matches;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      // The CSS letterform remains visible on browsers without WebGL.
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    element.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 100);
    camera.position.set(0, 0, 10.8);

    const group = new THREE.Group();
    scene.add(group);

    // Thirteen bevelled sections form three continuous strokes.
    // They move as a coordinated exploded view, never as random particles.
    const ink = new THREE.MeshStandardMaterial({ color: 0x27364a, metalness: 0.48, roughness: 0.32 });
    const silver = new THREE.MeshStandardMaterial({ color: 0x9caabd, metalness: 0.56, roughness: 0.28 });
    const accent = new THREE.MeshStandardMaterial({ color: 0x5275bd, metalness: 0.4, roughness: 0.34 });
    const edge = new THREE.LineBasicMaterial({ color: 0xd8e6f4, transparent: true, opacity: 0.35 });

    type Segment = {
      object: THREE.Group;
      anchor: THREE.Vector3;
      separation: THREE.Vector3;
      spin: THREE.Vector3;
    };
    const segments: Segment[] = [];
    const geometries: THREE.BufferGeometry[] = [];

    const line = (x1: number, y1: number, x2: number, y2: number, count: number, stroke: number) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const angle = Math.atan2(dy, dx);
      const length = Math.hypot(dx, dy);
      const pieceLength = length / count;
      for (let index = 0; index < count; index++) {
        const t = (index + 0.5) / count;
        const x = x1 + dx * t;
        const y = y1 + dy * t;

        const shape = new THREE.Shape();
        const w = pieceLength - 0.018;
        const h = 0.60;
        shape.moveTo(-w / 2, -h / 2);
        shape.lineTo(w / 2, -h / 2);
        shape.lineTo(w / 2, h / 2);
        shape.lineTo(-w / 2, h / 2);
        shape.closePath();
        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: 0.31,
          steps: 1,
          bevelEnabled: true,
          bevelThickness: 0.045,
          bevelSize: 0.035,
          bevelSegments: 3
        });
        geometry.translate(0, 0, -0.155);
        geometries.push(geometry);
        const object = new THREE.Group();
        const face = stroke === 1 ? (index === 2 ? accent : silver) : ink;
        const mesh = new THREE.Mesh(geometry, face);
        mesh.rotation.z = angle;
        object.add(mesh);

        const outlineGeometry = new THREE.EdgesGeometry(geometry, 42);
        geometries.push(outlineGeometry);
        const outline = new THREE.LineSegments(outlineGeometry, edge);
        outline.rotation.z = angle;
        object.add(outline);
        group.add(object);

        // The columns part to either side while the central structural
        // brace moves forward, like an architectural exploded drawing.
        const delta = index - (count - 1) / 2;
        const side = stroke === 0 ? -1 : stroke === 2 ? 1 : 0;
        segments.push({
          object,
          anchor: new THREE.Vector3(x, y, stroke === 1 ? 0.22 : -0.06),
          separation: new THREE.Vector3(
            side * 1.35 + (stroke === 1 ? delta * 0.22 : 0),
            delta * 0.23,
            stroke === 1 ? 1.65 + Math.abs(delta) * 0.10 : -0.7
          ),
          spin: new THREE.Vector3(
            stroke === 1 ? 0.12 : 0,
            stroke === 1 ? -0.24 : side * 0.16,
            side * 0.06
          )
        });
      }
    };

    line(-1.40, -1.74, -1.40, 1.74, 4, 0);
    line(-1.40, 1.65, 1.40, -1.65, 5, 1);
    line(1.40, -1.74, 1.40, 1.74, 4, 2);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x8190ac, 3.1);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(0xffffff, 5);
    key.position.set(-4, 6, 7);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x91b9ff, 2.2);
    fill.position.set(5, -2, 4);
    scene.add(fill);
    const rim = new THREE.PointLight(0xe3eeff, 32);
    rim.position.set(0, 2, -2);
    scene.add(rim);

    let active = false;
    let frame = 0;
    let progress = 0;
    let eased = 0;
    let cursorX = 0;
    let cursorY = 0;
    let filteredX = 0;
    let filteredY = 0;
    let entryTime = performance.now();
    let lastTime = 0;
    let removed = false;

    const clamp = (n: number) => Math.max(0, Math.min(1, n));
    const smooth = (n: number) => {
      const t = clamp(n);
      return t * t * (3 - 2 * t);
    };

    const resize = () => {
      const w = element.clientWidth;
      const h = element.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      if (reduced) paint(performance.now());
      else wake();
    };

    const updateScroll = () => {
      const hero = element.closest('.hero');
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      progress = clamp(-rect.top / distance);
      wake();
    };

    const onPointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const box = element.getBoundingClientRect();
      cursorX = clamp((event.clientX - box.left) / box.width) * 2 - 1;
      cursorY = clamp((event.clientY - box.top) / box.height) * 2 - 1;
    };
    const onPointerLeave = () => { cursorX = 0; cursorY = 0; };

    const paint = (now: number) => {
      const dt = Math.min(0.05, (now - (lastTime || now)) / 1000);
      lastTime = now;
      eased += (progress - eased) * Math.min(1, dt * 5);
      filteredX += (cursorX - filteredX) * Math.min(1, dt * 3);
      filteredY += (cursorY - filteredY) * Math.min(1, dt * 3);

      // The mark is composed on arrival, separates during the scroll,
      // and settles back into alignment before the work section.
      const breakup = reduced ? 0 : Math.sin(Math.PI * smooth((eased - 0.06) / 0.91));
      const entrance = reduced ? 0 : (1 - smooth((now - entryTime) / 1450));
      const amount = Math.max(breakup, entrance * 0.58);
      for (let i = 0; i < segments.length; i++) {
        const part = segments[i];
        const delay = (i % 3) * 0.035;
        const amountPerPart = smooth((amount - delay) / (1 - delay));
        part.object.position.copy(part.anchor).addScaledVector(part.separation, amountPerPart);
        part.object.rotation.set(
          part.spin.x * amountPerPart,
          part.spin.y * amountPerPart,
          part.spin.z * amountPerPart
        );
      }

      group.rotation.y = -0.19 + filteredX * 0.10 + (reduced ? 0 : eased * 0.12);
      group.rotation.x = -0.12 - filteredY * 0.06;
      group.position.y = reduced ? 0 : Math.sin(now * 0.00045) * 0.055;
      group.scale.setScalar(element.clientWidth < 520 ? 0.82 : 1);
      renderer.render(scene, camera);
      element.classList.add('scene-ready');
    };

    function tick(now: number) {
      frame = 0;
      if (!active || document.hidden || removed) return;
      paint(now);
      if (!reduced) frame = requestAnimationFrame(tick);
    }

    function wake() {
      if (active && !frame && !document.hidden && !removed) frame = requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(entries => {
      active = Boolean(entries[0]?.isIntersecting);
      if (!active && frame) { cancelAnimationFrame(frame); frame = 0; }
      wake();
    }, { rootMargin: '140px' });
    observer.observe(element);
    const sizes = new ResizeObserver(resize);
    sizes.observe(element);

    window.addEventListener('scroll', updateScroll, { passive: true });
    element.addEventListener('pointermove', onPointer);
    element.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', wake);
    updateScroll();
    resize();
    return () => {
      removed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      sizes.disconnect();
      window.removeEventListener('scroll', updateScroll);
      element.removeEventListener('pointermove', onPointer);
      element.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', wake);
      geometries.forEach(g => g.dispose());
      [ink, silver, accent, edge].forEach(m => m.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="cinematic-assembly" ref={holder} role="img"
      aria-label="An abstract metallic N monogram composed of segments that separate and rejoin as the page scrolls">
      <span className="scene-fallback" aria-hidden="true">N</span>
    </div>
  );
}
