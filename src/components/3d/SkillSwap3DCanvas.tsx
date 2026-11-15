import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural Canvas Texture for the SkillSwap 3D Display Screen
function createSkillSwapScreenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 800;
  const ctx = canvas.getContext('2d')!;

  // Deep void dark background
  ctx.fillStyle = '#090A0E';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Screentone grid overlay
  ctx.fillStyle = '#14151B';
  for (let x = 0; x < canvas.width; x += 16) {
    for (let y = 0; y < canvas.height; y += 16) {
      if ((x + y) % 32 === 0) {
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Top Browser Chrome / App Header Bar
  ctx.fillStyle = '#14151B';
  ctx.fillRect(0, 0, canvas.width, 56);
  ctx.strokeStyle = '#23252C';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 56);
  ctx.lineTo(canvas.width, 56);
  ctx.stroke();

  // Traffic light window controls
  ctx.fillStyle = '#D71936';
  ctx.beginPath();
  ctx.arc(30, 28, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#747C8B';
  ctx.beginPath();
  ctx.arc(52, 28, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#23252C';
  ctx.beginPath();
  ctx.arc(74, 28, 6, 0, Math.PI * 2);
  ctx.fill();

  // URL Bar Capsule
  ctx.fillStyle = '#090A0E';
  ctx.strokeStyle = '#23252C';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(120, 14, 460, 28);
  ctx.fillRect(120, 14, 460, 28);

  ctx.fillStyle = '#F4F2ED';
  ctx.font = '13px "Space Mono", monospace';
  ctx.fillText('https://skillswap-learnnearn-in.web.app', 135, 33);

  // Live status badge
  ctx.fillStyle = '#D71936';
  ctx.fillRect(canvas.width - 150, 14, 120, 28);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 12px "Space Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('● LIVE DEMO', canvas.width - 90, 33);
  ctx.textAlign = 'left';

  // MAIN DASHBOARD LAYOUT
  // Left Column: Jitsi Meet Collaborative Video Room Mock (Width: 740, Height: 480)
  ctx.fillStyle = '#14151B';
  ctx.fillRect(32, 80, 740, 480);
  ctx.strokeStyle = '#23252C';
  ctx.lineWidth = 2;
  ctx.strokeRect(32, 80, 740, 480);

  // Video header
  ctx.fillStyle = '#090A0E';
  ctx.fillRect(32, 80, 740, 44);
  ctx.fillStyle = '#F4F2ED';
  ctx.font = 'bold 16px "Space Mono", monospace';
  ctx.fillText('JITSI MEET // LIVE PEER COLLABORATION ROOM', 52, 108);

  ctx.fillStyle = '#D71936';
  ctx.font = 'bold 13px "Space Mono", monospace';
  ctx.fillText('ENCRYPTED P2P', 650, 108);

  // Video feed area
  ctx.fillStyle = '#090A0E';
  ctx.fillRect(52, 144, 700, 340);
  ctx.strokeStyle = '#23252C';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(52, 144, 700, 340);

  // User A Feed (Instructor)
  ctx.fillStyle = '#14151B';
  ctx.fillRect(72, 164, 320, 230);
  ctx.strokeStyle = '#D71936';
  ctx.lineWidth = 2;
  ctx.strokeRect(72, 164, 320, 230);
  ctx.fillStyle = '#F4F2ED';
  ctx.font = 'bold 14px "Space Mono", monospace';
  ctx.fillText('PEER A (TEACHING: REACT.JS)', 90, 195);
  ctx.fillStyle = '#747C8B';
  ctx.font = '12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Firebase Real-Time Listeners Connected', 90, 225);

  // User B Feed (Learner)
  ctx.fillStyle = '#14151B';
  ctx.fillRect(412, 164, 320, 230);
  ctx.strokeStyle = '#23252C';
  ctx.lineWidth = 2;
  ctx.strokeRect(412, 164, 320, 230);
  ctx.fillStyle = '#F4F2ED';
  ctx.font = 'bold 14px "Space Mono", monospace';
  ctx.fillText('PEER B (LEARNING: PYTHON)', 430, 195);
  ctx.fillStyle = '#747C8B';
  ctx.font = '12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Code Editor Stream Active', 430, 225);

  // Video Controls Bar
  ctx.fillStyle = '#090A0E';
  ctx.fillRect(52, 420, 700, 50);
  ctx.fillStyle = '#F4F2ED';
  ctx.font = '12px "Space Mono", monospace';
  ctx.fillText('AUDIO: MIC_ON  •  VIDEO: HD_720P  •  CHAT: ACTIVE (4 MESSAGES)', 72, 450);

  // Right Column: Gamification & Swap Match Engine (Width: 440, Height: 480)
  ctx.fillStyle = '#14151B';
  ctx.fillRect(804, 80, 444, 480);
  ctx.strokeStyle = '#23252C';
  ctx.lineWidth = 2;
  ctx.strokeRect(804, 80, 444, 480);

  // Gamification Header
  ctx.fillStyle = '#090A0E';
  ctx.fillRect(804, 80, 444, 44);
  ctx.fillStyle = '#D71936';
  ctx.font = 'bold 16px "Space Mono", monospace';
  ctx.fillText('GAMIFICATION & REWARDS', 824, 108);

  // XP Counter & Level Progress
  ctx.fillStyle = '#F4F2ED';
  ctx.font = '900 48px "Bebas Neue", sans-serif';
  ctx.fillText('LEVEL 04 // 1,250 XP', 824, 175);

  // Progress Bar
  ctx.fillStyle = '#23252C';
  ctx.fillRect(824, 195, 404, 14);
  ctx.fillStyle = '#D71936';
  ctx.fillRect(824, 195, 290, 14);

  // Streak Badge
  ctx.fillStyle = '#090A0E';
  ctx.fillRect(824, 230, 404, 90);
  ctx.strokeStyle = '#D71936';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(824, 230, 404, 90);

  ctx.fillStyle = '#D71936';
  ctx.font = 'bold 20px "Space Mono", monospace';
  ctx.fillText('ACTIVE STREAK: 7 DAYS 🔥', 844, 268);
  ctx.fillStyle = '#747C8B';
  ctx.font = '13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Daily Practice Quiz Validated (+50 Coins Earned)', 844, 295);

  // Swap Request Queue
  ctx.fillStyle = '#090A0E';
  ctx.fillRect(824, 340, 404, 190);
  ctx.strokeStyle = '#23252C';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(824, 340, 404, 190);

  ctx.fillStyle = '#F4F2ED';
  ctx.font = 'bold 15px "Space Mono", monospace';
  ctx.fillText('ACTIVE SWAP MATCHES (3 QUEUED)', 844, 375);

  ctx.fillStyle = '#747C8B';
  ctx.font = '13px "Space Mono", monospace';
  ctx.fillText('1. Frontend React <-> Backend Go', 844, 415);
  ctx.fillText('2. UI/UX Figma <-> Tailwind CSS', 844, 445);
  ctx.fillText('3. API Testing <-> MongoDB Schema', 844, 475);

  // Bottom Explicit Watermark Banner
  ctx.fillStyle = '#14151B';
  ctx.fillRect(32, 590, canvas.width - 64, 170);
  ctx.strokeStyle = '#D71936';
  ctx.lineWidth = 2;
  ctx.strokeRect(32, 590, canvas.width - 64, 170);

  ctx.fillStyle = '#D71936';
  ctx.font = 'bold 18px "Space Mono", monospace';
  ctx.fillText('● GENUINE APPLICATION SCREENSHOT PLACEHOLDER', 64, 635);

  ctx.fillStyle = '#F4F2ED';
  ctx.font = '15px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(
    'This display plane is designed for direct replacement with an actual 1280×800 production screenshot of the SkillSwap web app.',
    64,
    675
  );

  ctx.fillStyle = '#747C8B';
  ctx.font = '13px "Space Mono", monospace';
  ctx.fillText(
    'TECH DEPLOYMENT: REACT  •  FIREBASE REAL-TIME DB  •  JITSI MEET API  •  TAILWIND CSS',
    64,
    720
  );

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
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
  const width = 4.8;
  const height = 3.0;
  const depth = 0.16;

  useFrame((state, delta) => {
    if (!meshGroupRef.current) return;

    if (!reducedMotion) {
      // Subtle natural floating
      const t = state.clock.elapsedTime;
      meshGroupRef.current.position.y = Math.sin(t * 1.2) * 0.05;

      // Mouse cursor 3D perspective tilt
      const targetRotY = pointer.x * 0.22 - 0.05;
      const targetRotX = -pointer.y * 0.18 + 0.04;

      meshGroupRef.current.rotation.y = THREE.MathUtils.damp(
        meshGroupRef.current.rotation.y,
        targetRotY,
        4.0,
        delta
      );
      meshGroupRef.current.rotation.x = THREE.MathUtils.damp(
        meshGroupRef.current.rotation.x,
        targetRotX,
        4.0,
        delta
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
          color="#14151B"
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>

      {/* 2. Inner Recessed Display Screen Plane (with procedural UI screenshot) */}
      <mesh position={[0, 0, depth / 2 + 0.002]}>
        <planeGeometry args={[width - 0.16, height - 0.16]} />
        <meshStandardMaterial
          map={screenTex}
          roughness={0.25}
          metalness={0.1}
        />
      </mesh>

      {/* 3. Floating 3D Stamp Badge (Z offset +0.35) */}
      <mesh position={[width / 2 - 0.45, height / 2 - 0.45, depth / 2 + 0.35]} castShadow>
        <boxGeometry args={[0.65, 0.65, 0.05]} />
        <meshStandardMaterial color="#D71936" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* 4. Floating 3D Corner Tag (Z offset +0.25) */}
      <mesh position={[-width / 2 + 0.55, -height / 2 + 0.35, depth / 2 + 0.25]} castShadow>
        <boxGeometry args={[0.9, 0.32, 0.04]} />
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
      <div className="w-full aspect-[16/10] bg-[#14151B] border-2 border-[#23252C] p-6 flex flex-col justify-between">
        <div className="font-mono text-xs text-[#D71936] font-bold">SKILLSWAP // DEPLOYED APPLICATION</div>
        <div className="text-center font-mono text-sm text-[#F4F2ED]">
          GENUINE APPLICATION SCREENSHOT PLACEHOLDER
        </div>
        <div className="font-mono text-[10px] text-[#747C8B]">1280x800 PRODUCTION VIEWPORT</div>
      </div>
    );
  }

  return (
    <div className="w-full aspect-[16/10] select-none relative cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5.0], fov: 40 }}
        className="w-full h-full"
      >
        <ambientLight intensity={1.2} />
        <directionalLight
          position={[3, 4, 4]}
          intensity={2.0}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-3, -2, 2]} intensity={1.4} color="#D71936" />
        <ScreenChassis reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
};
