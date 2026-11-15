import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import {
  createFrontCoverTexture,
  createSpineTexture,
  createBackCoverTexture,
  createInsidePageTexture,
  createPageEdgeTexture,
} from './mangaTextures';

interface BookMeshProps {
  isOpen: boolean;
  onToggleOpen?: () => void;
  reducedMotion: boolean;
}

const BookMesh: React.FC<BookMeshProps> = ({ isOpen, onToggleOpen, reducedMotion }) => {
  const groupRef = useRef<THREE.Group>(null);
  const frontCoverHingeRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { pointer } = useThree();

  // Track window scroll progress for natural scroll-driven page opening
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(Math.max(scrollY / 400, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Create memoized textures once
  const { frontCoverTex, spineTex, backCoverTex, insidePageTex, pageEdgeTex } = useMemo(() => {
    return {
      frontCoverTex: createFrontCoverTexture(),
      spineTex: createSpineTexture(),
      backCoverTex: createBackCoverTexture(),
      insidePageTex: createInsidePageTexture(),
      pageEdgeTex: createPageEdgeTexture(),
    };
  }, []);

  // Tangible manga tankōbon proportions (B6 standard format ~ 1:1.43)
  const bookWidth = 2.45;
  const bookHeight = 3.5;
  const bookDepth = 0.52; // Substantial volume thickness
  const coverThickness = 0.04;

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!reducedMotion) {
      // 1. Natural floating levitation
      const t = state.clock.elapsedTime;
      groupRef.current.position.y = Math.sin(t * 1.3) * 0.07;

      // 2. Responsive cursor rotation parallax with natural damping
      const targetRotY = pointer.x * 0.42 - 0.24; // 3/4 manga volume showcase angle
      const targetRotX = -pointer.y * 0.24 + 0.09;
      const targetRotZ = pointer.x * -0.06;

      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetRotY,
        5.0,
        delta
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetRotX,
        5.0,
        delta
      );
      groupRef.current.rotation.z = THREE.MathUtils.damp(
        groupRef.current.rotation.z,
        targetRotZ,
        5.0,
        delta
      );
    } else {
      // Static display angle for users preferring reduced motion
      groupRef.current.rotation.y = -0.26;
      groupRef.current.rotation.x = 0.08;
    }

    // 3. Smooth front cover opening hinge rotation:
    // Opens progressively with scroll (up to -0.9 rad) or when clicked / hovered (up to -1.35 rad)
    if (frontCoverHingeRef.current) {
      let targetHingeAngle = 0;
      if (isOpen) {
        targetHingeAngle = -1.45; // ~83 degrees open
      } else if (hovered) {
        targetHingeAngle = -0.95; // ~54 degrees open
      } else if (scrollProgress > 0.05) {
        targetHingeAngle = -scrollProgress * 1.15; // Opens progressively on scroll
      }

      frontCoverHingeRef.current.rotation.y = THREE.MathUtils.damp(
        frontCoverHingeRef.current.rotation.y,
        targetHingeAngle,
        5.5,
        delta
      );
    }
  });

  return (
    <group
      ref={groupRef}
      onClick={onToggleOpen}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      cursor-pointer="true"
    >
      {/* 1. BACK COVER */}
      <mesh position={[0, 0, -bookDepth / 2]} receiveShadow castShadow>
        <boxGeometry args={[bookWidth, bookHeight, coverThickness]} />
        <meshStandardMaterial
          map={backCoverTex}
          roughness={0.42}
          metalness={0.08}
        />
      </mesh>

      {/* 2. INNER PAGE BLOCK (Thick paper block with visible strata edges) */}
      <mesh position={[0.02, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[bookWidth - 0.05, bookHeight - 0.08, bookDepth - coverThickness * 2]} />
        <meshStandardMaterial
          map={pageEdgeTex}
          roughness={0.88}
          metalness={0.0}
        />
      </mesh>

      {/* 3. FIRST MANGA SPREAD (Visible right underneath front cover when opened) */}
      <mesh position={[0.015, 0, bookDepth / 2 - coverThickness - 0.002]}>
        <planeGeometry args={[bookWidth - 0.08, bookHeight - 0.1]} />
        <meshStandardMaterial
          map={insidePageTex}
          roughness={0.55}
          metalness={0.0}
        />
      </mesh>

      {/* 4. BOOK SPINE (Left edge hinge with embossed title) */}
      <mesh
        position={[-bookWidth / 2 + coverThickness / 2, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
        castShadow
      >
        <boxGeometry args={[bookDepth, bookHeight, coverThickness]} />
        <meshStandardMaterial
          map={spineTex}
          roughness={0.38}
          metalness={0.12}
        />
      </mesh>

      {/* 5. FRONT COVER (Hinged around spine edge at x = -bookWidth/2) */}
      <group
        ref={frontCoverHingeRef}
        position={[-bookWidth / 2, 0, bookDepth / 2]}
      >
        {/* Offset front cover mesh so rotation pivot is precisely along the spine crease */}
        <mesh position={[bookWidth / 2, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[bookWidth, bookHeight, coverThickness]} />
          <meshStandardMaterial
            map={frontCoverTex}
            roughness={0.32}
            metalness={0.16}
          />
        </mesh>
      </group>
    </group>
  );
};

export interface MangaBook3DProps {
  className?: string;
}

export const MangaBook3D: React.FC<MangaBook3DProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  // Check reduced motion and WebGL support
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }

    return () => mq.removeEventListener('change', handler);
  }, []);

  // Static Fallback Poster if WebGL is unavailable
  if (!webglSupported) {
    return (
      <div className={`relative aspect-[3/4] max-w-[360px] w-full border-4 border-[#F4F2ED] bg-[#090A0E] shadow-noir-lg flex flex-col justify-between p-6 ${className}`}>
        <div className="font-mono text-xs text-[#D71936] font-bold">SEINEN MANGA ARCHIVE // VOL. 01</div>
        <div>
          <h2 className="font-display text-6xl text-[#F4F2ED]">YOGESH.</h2>
          <p className="font-mono text-xs text-[#9DA6B8]">THE DEVELOPER'S STORY</p>
        </div>
        <div className="pt-4 border-t border-[#23252C] font-mono text-[10px] text-[#9DA6B8]">
          SRM IST • FULL-STACK MERN • AI APPS
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full aspect-[4/5] max-w-[480px] lg:max-w-[520px] select-none ${className}`}>
      {/* 3D Canvas */}
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4.8], fov: 44 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        {/* Soft Ambient Fill */}
        <ambientLight intensity={1.2} />

        {/* Key Spotlight with Soft Shadows */}
        <spotLight
          position={[3.5, 5.5, 4.5]}
          angle={0.6}
          penumbra={0.8}
          intensity={3.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />

        {/* Dramatic Crimson Rim Light for Seinen Manga Aesthetic */}
        <pointLight position={[-4.5, 0.5, -2]} intensity={3.5} color="#D71936" />

        {/* Soft Manga White Rim Fill from Bottom Right */}
        <pointLight position={[3.5, -3, 2.5]} intensity={1.4} color="#F4F2ED" />

        {/* 3D Manga Volume Object */}
        <BookMesh
          isOpen={isOpen}
          onToggleOpen={() => setIsOpen((prev) => !prev)}
          reducedMotion={reducedMotion}
        />

        {/* Ground Contact Shadow for Realistic Physical Weight */}
        <ContactShadows
          position={[0, -2.0, 0]}
          opacity={0.8}
          scale={6.5}
          blur={2.4}
          far={4}
          color="#000000"
        />
      </Canvas>

      {/* Floating Interactive Badge / Control Tooltip */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 bg-[#14151B] border border-[#23252C] shadow-crimson pointer-events-auto">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D71936] animate-pulse" />
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="font-mono text-[10px] text-[#F4F2ED] uppercase tracking-wider hover:text-[#D71936] transition-colors cursor-pointer"
        >
          {isOpen ? 'CLOSE VOLUME [-]' : 'CLICK OR SCROLL TO OPEN PAGES [+]'}
        </button>
      </div>
    </div>
  );
};
