import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
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

  const { pointer } = useThree();

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

  // Book dimensions (Manga tankōbon proportions ~ 1:1.45)
  const bookWidth = 2.3;
  const bookHeight = 3.3;
  const bookDepth = 0.44;
  const coverThickness = 0.035;

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!reducedMotion) {
      // 1. Natural floating levitation
      const t = state.clock.elapsedTime;
      groupRef.current.position.y = Math.sin(t * 1.4) * 0.08;

      // 2. Cursor-responsive rotation parallax
      const targetRotY = pointer.x * 0.38 - 0.22; // default 3/4 manga volume angle
      const targetRotX = -pointer.y * 0.22 + 0.08;
      const targetRotZ = pointer.x * -0.05;

      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetRotY,
        4.5,
        delta
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetRotX,
        4.5,
        delta
      );
      groupRef.current.rotation.z = THREE.MathUtils.damp(
        groupRef.current.rotation.z,
        targetRotZ,
        4.5,
        delta
      );
    } else {
      // Static ideal 3/4 display angle for reduced motion
      groupRef.current.rotation.y = -0.25;
      groupRef.current.rotation.x = 0.08;
    }

    // 3. Smooth front cover opening hinge rotation
    if (frontCoverHingeRef.current) {
      const targetHingeAngle = isOpen || hovered ? -1.05 : 0; // ~60 degrees open
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
          roughness={0.45}
          metalness={0.05}
        />
      </mesh>

      {/* 2. INNER PAGE BLOCK (Text Block with visible paper edges) */}
      <mesh position={[0.02, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[bookWidth - 0.06, bookHeight - 0.08, bookDepth - coverThickness * 2]} />
        <meshStandardMaterial
          map={pageEdgeTex}
          roughness={0.85}
          metalness={0.0}
        />
      </mesh>

      {/* 3. FIRST MANGA PAGE SPREAD (Visible right underneath front cover) */}
      <mesh position={[0.01, 0, bookDepth / 2 - coverThickness - 0.002]}>
        <planeGeometry args={[bookWidth - 0.08, bookHeight - 0.1]} />
        <meshStandardMaterial
          map={insidePageTex}
          roughness={0.6}
          metalness={0.0}
        />
      </mesh>

      {/* 4. BOOK SPINE (Left edge hinge) */}
      <mesh
        position={[-bookWidth / 2 + coverThickness / 2, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
        castShadow
      >
        <boxGeometry args={[bookDepth, bookHeight, coverThickness]} />
        <meshStandardMaterial
          map={spineTex}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* 5. FRONT COVER (Hinged around spine edge at x = -bookWidth/2) */}
      <group
        ref={frontCoverHingeRef}
        position={[-bookWidth / 2, 0, bookDepth / 2]}
      >
        {/* Offset front cover mesh so rotation pivot is precisely along the left spine crease */}
        <mesh position={[bookWidth / 2, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[bookWidth, bookHeight, coverThickness]} />
          <meshStandardMaterial
            map={frontCoverTex}
            roughness={0.38}
            metalness={0.12}
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
      <div className={`relative aspect-[3/4] max-w-[340px] w-full border-4 border-[#F4F2ED] bg-[#090A0E] shadow-noir-lg flex flex-col justify-between p-6 ${className}`}>
        <div className="font-mono text-xs text-[#D71936] font-bold">SEINEN MANGA ARCHIVE // VOL. 01</div>
        <div>
          <h2 className="font-display text-6xl text-[#F4F2ED]">YOGESH.</h2>
          <p className="font-mono text-xs text-[#747C8B]">THE DEVELOPER'S STORY</p>
        </div>
        <div className="pt-4 border-t border-[#23252C] font-mono text-[10px] text-[#747C8B]">
          SRM IST • FULL-STACK MERN • AI APPS
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full aspect-[4/5] max-w-[440px] select-none ${className}`}>
      {/* 3D Canvas */}
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5.0], fov: 42 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        {/* Ambient fill */}
        <ambientLight intensity={1.1} />

        {/* Key Directional Light with Soft Shadows */}
        <directionalLight
          position={[4, 5, 4]}
          intensity={2.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={12}
          shadow-bias={-0.0001}
        />

        {/* Crimson Edge/Rim Light for cinematic Seinen aesthetic */}
        <pointLight position={[-4, -2, -2]} intensity={2.4} color="#D71936" />
        <pointLight position={[3, -3, 2]} intensity={1.2} color="#F4F2ED" />

        {/* 3D Manga Volume Object */}
        <BookMesh
          isOpen={isOpen}
          onToggleOpen={() => setIsOpen((prev) => !prev)}
          reducedMotion={reducedMotion}
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
          {isOpen ? 'CLOSE VOLUME [-]' : 'CLICK TO OPEN PAGES [+]'}
        </button>
      </div>
    </div>
  );
};
