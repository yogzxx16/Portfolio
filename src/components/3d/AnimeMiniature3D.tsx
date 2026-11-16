import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, ContactShadows, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// =========================================================================
// 3D PORTRAIT STANDEE (MANGA NOIR CHARACTER CARD)
// Loads /art/manga-portrait.jpg and renders an interactive 3D standee
// with crimson backing and smooth levitation.
// =========================================================================

interface PortraitStandeeProps {
  reducedMotion: boolean;
}

const PortraitStandee: React.FC<PortraitStandeeProps> = ({ reducedMotion }) => {
  const texture = useTexture('/art/manga-portrait.jpg');
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (reducedMotion) return;

    if (groupRef.current) {
      // Subtle cursor-tracking reactive tilt
      const targetRotY = pointer.x * 0.35;
      const targetRotX = -pointer.y * 0.25;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 4);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 4);
    }
  });

  return (
    <Float
      floatIntensity={reducedMotion ? 0 : 2}
      rotationIntensity={reducedMotion ? 0 : 0.5}
      speed={reducedMotion ? 0 : 2}
    >
      <group
        ref={groupRef}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
        scale={hovered ? 1.05 : 1}
      >
        {/* Crimson Border/Backing */}
        <mesh position={[0, 0, -0.01]} castShadow receiveShadow>
          <planeGeometry args={[3.2, 4.0]} />
          <meshStandardMaterial
            color="#D71936"
            roughness={0.8}
            metalness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Portrait Image */}
        <mesh position={[0, 0, 0.005]} castShadow receiveShadow>
          <planeGeometry args={[3.0, 3.75]} />
          <meshStandardMaterial
            map={texture}
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
};

export interface AnimeMiniature3DProps {
  className?: string;
}

export const AnimeMiniature3D: React.FC<AnimeMiniature3DProps> = ({ className = '' }) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

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

    return () => {
      mq.removeEventListener('change', handler);
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (!webglSupported) {
    return (
      <div className={`flex flex-col items-center justify-center p-6 border-2 border-[#23252C] bg-[#14151B] text-[#9DA6B8] ${className}`}>
        <img
          src="/art/manga-portrait.jpg"
          alt="Manga Portrait Fallback"
          className="w-48 h-60 object-cover border-2 border-[#D71936] shadow-noir"
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5.8], fov: 45 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        {/* Soft Ambient Fill for Base Illumination */}
        <ambientLight intensity={1.6} />

        {/* Directional Front Light to Illuminate Portrait Texture Crisp & Clear */}
        <directionalLight position={[0, 2, 5]} intensity={2.2} />

        {/* Key Spotlight with Soft Shadows */}
        <spotLight
          position={[4, 6, 5]}
          angle={0.6}
          penumbra={0.8}
          intensity={2.5}
          castShadow
        />

        {/* Dramatic Crimson Rim Light for Manga Noir Aesthetic */}
        <pointLight position={[-4, 1, -2]} intensity={3.5} color="#D71936" />

        {/* Soft White Fill Light */}
        <pointLight position={[3, -3, 3]} intensity={1.5} color="#F4F2ED" />

        {/* Suspense boundary for texture streaming */}
        <Suspense fallback={null}>
          <PortraitStandee reducedMotion={reducedMotion} />
        </Suspense>

        {/* Ground Contact Shadow */}
        <ContactShadows
          position={[0, -2.4, 0]}
          opacity={0.6}
          scale={6.5}
          blur={2.2}
          far={4.5}
          color="#D71936"
        />
      </Canvas>
    </div>
  );
};
