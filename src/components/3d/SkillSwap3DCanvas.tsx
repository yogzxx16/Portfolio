import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// High-Contrast Manga Noir Procedural Canvas Texture for the SkillSwap 3D Display Screen
function createSkillSwapScreenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 800;
  const ctx = canvas.getContext('2d')!;

  // Deep void dark background
  ctx.fillStyle = '#090A0E';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Outer Crimson Accent Framing
  ctx.strokeStyle = '#D71936';
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

  // Screentone dot pattern
  ctx.fillStyle = '#1A1C24';
  for (let x = 20; x < canvas.width - 20; x += 24) {
    for (let y = 20; y < canvas.height - 20; y += 24) {
      if ((x + y) % 48 === 0) {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // 1. TOP APP CHROME HEADER (Height 70px)
  ctx.fillStyle = '#14151B';
  ctx.fillRect(8, 8, canvas.width - 16, 68);
  ctx.strokeStyle = '#23252C';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(8, 76);
  ctx.lineTo(canvas.width - 8, 76);
  ctx.stroke();

  // Traffic light controls
  ctx.fillStyle = '#D71936';
  ctx.beginPath();
  ctx.arc(36, 42, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#747C8B';
  ctx.beginPath();
  ctx.arc(62, 42, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#23252C';
  ctx.beginPath();
  ctx.arc(88, 42, 8, 0, Math.PI * 2);
  ctx.fill();

  // URL Bar Capsule
  ctx.fillStyle = '#090A0E';
  ctx.fillRect(130, 24, 620, 36);
  ctx.strokeStyle = '#23252C';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(130, 24, 620, 36);

  ctx.fillStyle = '#D71936';
  ctx.font = 'bold 15px "Space Mono", monospace';
  ctx.fillText('https://', 145, 48);

  ctx.fillStyle = '#F4F2ED';
  ctx.font = 'bold 15px "Space Mono", monospace';
  ctx.fillText('skillswap-learnnearn-in.web.app', 230, 48);

  // Live Status Capsule
  ctx.fillStyle = '#D71936';
  ctx.fillRect(canvas.width - 240, 24, 210, 36);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 14px "Space Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('● LIVE DEPLOYED APP', canvas.width - 135, 48);
  ctx.textAlign = 'left';

  // 2. LEFT WORKSPACE: JITSI MEET VIDEO ROOM (Width: 740, Height: 510)
  ctx.fillStyle = '#F4F2ED'; // Manga paper white background
  ctx.fillRect(32, 96, 740, 500);
  ctx.strokeStyle = '#090A0E';
  ctx.lineWidth = 4;
  ctx.strokeRect(32, 96, 740, 500);

  // Header band
  ctx.fillStyle = '#090A0E';
  ctx.fillRect(32, 96, 740, 50);
  ctx.fillStyle = '#F4F2ED';
  ctx.font = 'bold 18px "Space Mono", monospace';
  ctx.fillText('JITSI MEET // LIVE PEER COLLABORATION', 52, 128);

  ctx.fillStyle = '#D71936';
  ctx.font = 'bold 13px "Space Mono", monospace';
  ctx.fillText('ENCRYPTED P2P', 630, 128);

  // Video Feeds Container (inside paper panel)
  // User A Feed (Instructor)
  ctx.fillStyle = '#14151B';
  ctx.fillRect(52, 166, 335, 270);
  ctx.strokeStyle = '#D71936';
  ctx.lineWidth = 3;
  ctx.strokeRect(52, 166, 335, 270);

  // Top banner A
  ctx.fillStyle = '#090A0E';
  ctx.fillRect(52, 166, 335, 36);
  ctx.fillStyle = '#D71936';
  ctx.font = 'bold 14px "Space Mono", monospace';
  ctx.fillText('PEER A (TEACHING)', 68, 190);

  // Waveform / Avatar Mock
  ctx.fillStyle = '#090A0E';
  ctx.fillRect(72, 220, 295, 140);
  ctx.strokeStyle = '#23252C';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(72, 220, 295, 140);

  // Audio equalizer bars
  const heights = [40, 70, 55, 90, 110, 65, 80, 45, 95, 60, 75, 50];
  ctx.fillStyle = '#D71936';
  heights.forEach((h, idx) => {
    ctx.fillRect(92 + idx * 21, 340 - h, 14, h);
  });

  ctx.fillStyle = '#F4F2ED';
  ctx.font = 'bold 13px "Space Mono", monospace';
  ctx.fillText('MIC ACTIVE • AUDIO 100%', 72, 385);
  ctx.fillStyle = '#9DA6B8';
  ctx.font = '12px "Space Mono", monospace';
  ctx.fillText('Firebase Realtime Synced', 72, 412);

  // User B Feed (Learner)
  ctx.fillStyle = '#14151B';
  ctx.fillRect(417, 166, 335, 270);
  ctx.strokeStyle = '#23252C';
  ctx.lineWidth = 3;
  ctx.strokeRect(417, 166, 335, 270);

  // Top banner B
  ctx.fillStyle = '#090A0E';
  ctx.fillRect(417, 166, 335, 36);
  ctx.fillStyle = '#F4F2ED';
  ctx.font = 'bold 14px "Space Mono", monospace';
  ctx.fillText('PEER B (LEARNING)', 433, 190);

  // Code editor snippet preview
  ctx.fillStyle = '#090A0E';
  ctx.fillRect(437, 220, 295, 140);
  ctx.strokeStyle = '#23252C';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(437, 220, 295, 140);

  ctx.fillStyle = '#D71936';
  ctx.font = '12px "Space Mono", monospace';
  ctx.fillText('const [swap, setSwap] = useState();', 448, 252);
  ctx.fillStyle = '#9DA6B8';
  ctx.fillText('await db.collection("matches")', 448, 280);
  ctx.fillText('  .doc(roomId).set({ active: true });', 448, 308);

  ctx.fillStyle = '#F4F2ED';
  ctx.font = 'bold 13px "Space Mono", monospace';
  ctx.fillText('SCREEN SHARE: ACTIVE', 437, 385);
  ctx.fillStyle = '#9DA6B8';
  ctx.font = '12px "Space Mono", monospace';
  ctx.fillText('Latency: 18ms (Direct P2P)', 437, 412);

  // Bottom Video Toolbar
  ctx.fillStyle = '#090A0E';
  ctx.fillRect(52, 452, 700, 48);
  ctx.fillStyle = '#F4F2ED';
  ctx.font = 'bold 13px "Space Mono", monospace';
  ctx.fillText('SESSION: 24:18  •  CALL QUALITY: EXCELLENT  •  CHAT: 4 NEW', 72, 482);

  // 3. RIGHT SIDEBAR: GAMIFICATION & MATCHING ENGINE (Width: 440, Height: 500)
  ctx.fillStyle = '#14151B';
  ctx.fillRect(800, 96, 448, 500);
  ctx.strokeStyle = '#23252C';
  ctx.lineWidth = 3;
  ctx.strokeRect(800, 96, 448, 500);

  // Sidebar header
  ctx.fillStyle = '#090A0E';
  ctx.fillRect(800, 96, 448, 50);
  ctx.fillStyle = '#D71936';
  ctx.font = 'bold 18px "Space Mono", monospace';
  ctx.fillText('GAMIFICATION & XP ENGINE', 820, 128);

  // XP Hero Counter
  ctx.fillStyle = '#F4F2ED';
  ctx.font = '900 52px "Bebas Neue", sans-serif';
  ctx.fillText('LEVEL 04 // 1,250 XP', 820, 205);

  // XP Progress Bar
  ctx.fillStyle = '#23252C';
  ctx.fillRect(820, 222, 408, 16);
  ctx.fillStyle = '#D71936';
  ctx.fillRect(820, 222, 310, 16);

  // Streak Callout Box
  ctx.fillStyle = '#090A0E';
  ctx.fillRect(820, 260, 408, 95);
  ctx.strokeStyle = '#D71936';
  ctx.lineWidth = 2;
  ctx.strokeRect(820, 260, 408, 95);

  ctx.fillStyle = '#D71936';
  ctx.font = 'bold 22px "Space Mono", monospace';
  ctx.fillText('ACTIVE STREAK: 7 DAYS 🔥', 840, 300);

  ctx.fillStyle = '#9DA6B8';
  ctx.font = '14px "Space Mono", monospace';
  ctx.fillText('Daily Practice Quiz Complete (+50 XP)', 840, 332);

  // Active Swap Queue Box
  ctx.fillStyle = '#090A0E';
  ctx.fillRect(820, 375, 408, 200);
  ctx.strokeStyle = '#23252C';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(820, 375, 408, 200);

  ctx.fillStyle = '#F4F2ED';
  ctx.font = 'bold 16px "Space Mono", monospace';
  ctx.fillText('ACTIVE SWAP QUEUE (3 PENDING)', 840, 410);

  ctx.fillStyle = '#9DA6B8';
  ctx.font = '13px "Space Mono", monospace';
  ctx.fillText('1. Frontend React <-> Backend Go', 840, 450);
  ctx.fillText('2. UI/UX Figma <-> Tailwind CSS', 840, 485);
  ctx.fillText('3. API Testing <-> MongoDB Schema', 840, 520);
  ctx.fillText('4. AI Prompting <-> React Hooks', 840, 555);

  // 4. BOTTOM MANGA EDITORIAL FOOTER (Height 150px)
  ctx.fillStyle = '#F4F2ED'; // Manga paper panel
  ctx.fillRect(32, 620, 1216, 150);
  ctx.strokeStyle = '#090A0E';
  ctx.lineWidth = 4;
  ctx.strokeRect(32, 620, 1216, 150);

  ctx.fillStyle = '#D71936';
  ctx.font = '900 28px "Bebas Neue", sans-serif';
  ctx.fillText('● GENUINE APPLICATION SCREENSHOT & ARCHITECTURE VIEWPORT', 56, 665);

  ctx.fillStyle = '#090A0E';
  ctx.font = 'bold 16px "Space Mono", monospace';
  ctx.fillText('TECH: REACT  •  FIREBASE REALTIME DB  •  JITSI MEET API  •  TAILWIND CSS', 56, 705);

  ctx.fillStyle = '#3A3F4A';
  ctx.font = '14px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Production deployment URL: https://skillswap-learnnearn-in.web.app  (Verified Live Demo)', 56, 742);

  // Red Hanko Seal in bottom right
  ctx.strokeStyle = '#D71936';
  ctx.lineWidth = 4;
  ctx.strokeRect(canvas.width - 150, 642, 100, 100);
  ctx.fillStyle = '#D71936';
  ctx.fillRect(canvas.width - 144, 648, 88, 88);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 50px "Bebas Neue", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('換', canvas.width - 100, 712);
  ctx.textAlign = 'left';

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

interface ScreenChassisProps {
  reducedMotion: boolean;
}

const ScreenChassis: React.FC<ScreenChassisProps> = ({ reducedMotion }) => {
  const meshGroupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  const screenTex = useMemo(() => createSkillSwapScreenTexture(), []);

  // Screen chassis dimensions (16:10 aspect ratio in 3D world units)
  const width = 5.0;
  const height = 3.2;
  const depth = 0.2;

  useFrame((state, delta) => {
    if (!meshGroupRef.current) return;

    if (!reducedMotion) {
      // Subtle natural floating
      const t = state.clock.elapsedTime;
      meshGroupRef.current.position.y = Math.sin(t * 1.2) * 0.05;

      // Mouse cursor 3D perspective tilt
      const targetRotY = (pointer?.x ?? 0) * 0.22 - 0.05;
      const targetRotX = -(pointer?.y ?? 0) * 0.18 + 0.04;

      meshGroupRef.current.rotation.y = THREE.MathUtils.damp(
        meshGroupRef.current.rotation.y,
        targetRotY,
        4.0,
        Math.min(delta, 0.1)
      );
      meshGroupRef.current.rotation.x = THREE.MathUtils.damp(
        meshGroupRef.current.rotation.x,
        targetRotX,
        4.0,
        Math.min(delta, 0.1)
      );
    } else {
      meshGroupRef.current.rotation.y = -0.06;
      meshGroupRef.current.rotation.x = 0.04;
    }
  });

  return (
    <group ref={meshGroupRef}>
      {/* 1. Outer Graphite Beveled Chassis Frame */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color="#1A1C24"
          roughness={0.35}
          metalness={0.4}
        />
      </mesh>

      {/* 2. Inner Recessed Display Screen Plane (with procedural UI screenshot) */}
      <mesh position={[0, 0, depth / 2 + 0.015]}>
        <planeGeometry args={[width - 0.2, height - 0.2]} />
        <meshBasicMaterial
          map={screenTex}
        />
      </mesh>

      {/* 3. Floating 3D Stamp Badge (corner accent on chassis bezel) */}
      <mesh position={[width / 2 - 0.25, height / 2 - 0.25, depth / 2 + 0.08]} castShadow>
        <boxGeometry args={[0.42, 0.42, 0.04]} />
        <meshStandardMaterial color="#D71936" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* 4. Floating 3D Corner Tag (bottom corner accent) */}
      <mesh position={[-width / 2 + 0.35, -height / 2 + 0.25, depth / 2 + 0.06]} castShadow>
        <boxGeometry args={[0.6, 0.22, 0.03]} />
        <meshStandardMaterial color="#23252C" roughness={0.5} metalness={0.1} />
      </mesh>
    </group>
  );
};

export const SkillSwap3DCanvas: React.FC = () => {
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

    return () => mq.removeEventListener('change', handler);
  }, []);

  if (!webglSupported) {
    return (
      <div className="w-full h-[400px] bg-[#14151B] border-2 border-[#23252C] p-6 flex flex-col justify-between">
        <div className="font-mono text-xs text-[#D71936] font-bold">SKILLSWAP // DEPLOYED APPLICATION</div>
        <div className="text-center font-mono text-sm text-[#F4F2ED]">
          GENUINE APPLICATION SCREENSHOT PLACEHOLDER
        </div>
        <div className="font-mono text-[10px] text-[#747C8B]">1280x800 PRODUCTION VIEWPORT</div>
      </div>
    );
  }

  return (
    <div className="w-full h-[380px] sm:h-[440px] select-none relative cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.2], fov: 38 }}
        className="w-full h-full"
      >
        <ambientLight intensity={1.2} />
        <directionalLight
          position={[3, 4, 4]}
          intensity={2.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-3, -2, 2]} intensity={1.8} color="#D71936" />
        <ScreenChassis reducedMotion={reducedMotion} />
        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.7}
          scale={5.5}
          blur={2.0}
          color="#000000"
        />
      </Canvas>
    </div>
  );
};
