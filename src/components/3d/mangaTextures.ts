import * as THREE from 'three';

/**
 * Procedural texture generators for the 3D Manga Volume.
 * Generates crisp, high-resolution canvas textures entirely in-memory with zero external network requests.
 */

// 1. FRONT COVER TEXTURE
export function createFrontCoverTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1448;
  const ctx = canvas.getContext('2d')!;

  // Deep void background
  ctx.fillStyle = '#090A0E';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Screentone / Halftone Dot Matrix in background
  ctx.fillStyle = '#23252C';
  for (let x = 30; x < canvas.width - 30; x += 18) {
    for (let y = 30; y < canvas.height - 30; y += 18) {
      if ((x + y) % 36 === 0) {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Double Ink Outer Frame
  ctx.strokeStyle = '#F4F2ED';
  ctx.lineWidth = 8;
  ctx.strokeRect(36, 36, canvas.width - 72, canvas.height - 72);

  ctx.strokeStyle = '#D71936';
  ctx.lineWidth = 3;
  ctx.strokeRect(48, 48, canvas.width - 96, canvas.height - 96);

  // Top Crimson Issue Ribbon
  ctx.fillStyle = '#D71936';
  ctx.fillRect(52, 52, canvas.width - 104, 80);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 32px "Space Mono", monospace';
  ctx.letterSpacing = '4px';
  ctx.fillText('SEINEN MANGA ARCHIVE // VOL. 01', 80, 104);

  // Japanese Sub-header
  ctx.fillStyle = '#747C8B';
  ctx.font = 'bold 24px "Space Mono", monospace';
  ctx.fillText('週刊少年・開発者物語 // 2026 EDITION', 80, 180);

  // Center Geometric Speedlines Frame
  ctx.strokeStyle = '#23252C';
  ctx.lineWidth = 2;
  for (let i = 0; i < 16; i++) {
    const y = 220 + i * 28;
    ctx.beginPath();
    ctx.moveTo(80, y);
    ctx.lineTo(canvas.width - 80, y);
    ctx.stroke();
  }

  // Large Dramatic Title: "YOGESH."
  ctx.fillStyle = '#090A0E';
  ctx.fillRect(80, 460, canvas.width - 160, 260);

  // Hard Crimson Shadow Behind Title
  ctx.fillStyle = '#D71936';
  ctx.font = '900 210px "Bebas Neue", sans-serif';
  ctx.letterSpacing = '8px';
  ctx.fillText('YOGESH.', 95, 665);

  // Foreground Crisp White Title
  ctx.fillStyle = '#F4F2ED';
  ctx.fillText('YOGESH.', 88, 658);

  // Red accent dot on the period
  ctx.fillStyle = '#D71936';
  ctx.fillRect(80, 740, canvas.width - 160, 8);

  // Tagline & Positioning
  ctx.fillStyle = '#F4F2ED';
  ctx.font = 'bold 36px "Space Mono", monospace';
  ctx.fillText('THE DEVELOPER\'S STORY', 84, 810);

  ctx.fillStyle = '#747C8B';
  ctx.font = '24px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('B.Tech IT Student  •  Full-Stack MERN  •  AI-Powered Web Apps', 84, 860);

  // Japanese Character Seal: 開発 (Development)
  ctx.strokeStyle = '#D71936';
  ctx.lineWidth = 6;
  ctx.strokeRect(canvas.width - 240, 920, 150, 150);

  ctx.fillStyle = '#D71936';
  ctx.fillRect(canvas.width - 232, 928, 134, 134);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 70px "Bebas Neue", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('創', canvas.width - 165, 1025);
  ctx.textAlign = 'left';

  // Barcode & Publication Metadata
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(84, 1220, 320, 120);

  // Draw procedural barcode stripes
  ctx.fillStyle = '#090A0E';
  for (let b = 104; b < 380; b += 6) {
    const barWidth = (b * 7) % 5 === 0 ? 4 : 2;
    ctx.fillRect(b, 1235, barWidth, 75);
  }
  ctx.font = '16px "Space Mono", monospace';
  ctx.fillText('978-0-2026-SRM-IT', 104, 1330);

  // Bottom Stamp
  ctx.fillStyle = '#747C8B';
  ctx.font = 'bold 20px "Space Mono", monospace';
  ctx.fillText('AUTHENTIC SEINEN PUBLICATION  •  CHENNAI, INDIA', 84, 1390);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// 2. SPINE TEXTURE
export function createSpineTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 1448;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#090A0E';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Top Red Band
  ctx.fillStyle = '#D71936';
  ctx.fillRect(0, 0, canvas.width, 100);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 36px "Bebas Neue", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('VOL. 01', canvas.width / 2, 65);

  // Vertical Spine Title
  ctx.save();
  ctx.translate(canvas.width / 2, 724);
  ctx.rotate(Math.PI / 2);

  ctx.fillStyle = '#F4F2ED';
  ctx.font = '900 72px "Bebas Neue", sans-serif';
  ctx.letterSpacing = '6px';
  ctx.fillText('YOGESH.  //  THE DEVELOPER\'S STORY', 0, 24);

  ctx.restore();

  // Bottom Publisher Mark
  ctx.fillStyle = '#D71936';
  ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 36px "Bebas Neue", sans-serif';
  ctx.fillText('完', canvas.width / 2, canvas.height - 40);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// 3. BACK COVER TEXTURE
export function createBackCoverTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1448;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#090A0E';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Screentone grid
  ctx.fillStyle = '#23252C';
  for (let x = 30; x < canvas.width - 30; x += 18) {
    for (let y = 30; y < canvas.height - 30; y += 18) {
      if ((x + y) % 36 === 0) {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Border
  ctx.strokeStyle = '#23252C';
  ctx.lineWidth = 6;
  ctx.strokeRect(36, 36, canvas.width - 72, canvas.height - 72);

  // Synopsis Box
  ctx.fillStyle = '#14151B';
  ctx.fillRect(80, 160, canvas.width - 160, 400);
  ctx.strokeStyle = '#D71936';
  ctx.lineWidth = 3;
  ctx.strokeRect(80, 160, canvas.width - 160, 400);

  ctx.fillStyle = '#D71936';
  ctx.font = 'bold 28px "Space Mono", monospace';
  ctx.fillText('VOLUME SYNOPSIS // 作品概要', 110, 220);

  ctx.fillStyle = '#F4F2ED';
  ctx.font = '24px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('"Turning ideas into interactive experiences."', 110, 280);

  ctx.fillStyle = '#747C8B';
  ctx.font = '20px "Plus Jakarta Sans", sans-serif';
  const lines = [
    'A journey of a full-stack engineer mastering modern web architectures,',
    'AI tool workflows, peer-to-peer learning networks, and responsive systems.',
    'From Chennai to global tech arenas — this volume documents eight verified works,',
    'industry internships, campus ambassadorship, and competitive hackathon prototypes.',
  ];
  lines.forEach((line, idx) => {
    ctx.fillText(line, 110, 340 + idx * 36);
  });

  // Bottom Logo
  ctx.fillStyle = '#F4F2ED';
  ctx.font = '900 64px "Bebas Neue", sans-serif';
  ctx.fillText('YOGESH. 2026', 110, 1300);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// 4. INNER MANGA PAGE SPREAD TEXTURE (Revealed when cover opens)
export function createInsidePageTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1448;
  const ctx = canvas.getContext('2d')!;

  // Pure high-contrast manga paper tone
  ctx.fillStyle = '#F4F2ED';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Manga Panel Comic Border
  ctx.strokeStyle = '#090A0E';
  ctx.lineWidth = 8;
  ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

  // Chapter 00 Header
  ctx.fillStyle = '#090A0E';
  ctx.fillRect(40, 40, canvas.width - 80, 90);

  ctx.fillStyle = '#F4F2ED';
  ctx.font = '900 52px "Bebas Neue", sans-serif';
  ctx.fillText('CHAPTER 00 // PROLOGUE — THE FIRST DISPATCH', 65, 105);

  // Top Comic Panel: Code Terminal
  ctx.strokeStyle = '#090A0E';
  ctx.lineWidth = 6;
  ctx.strokeRect(60, 160, canvas.width - 120, 420);

  ctx.fillStyle = '#090A0E';
  ctx.fillRect(60, 160, canvas.width - 120, 50);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px "Space Mono", monospace';
  ctx.fillText('TERMINAL // SRC/CORE/INITIALIZE.TS', 80, 195);

  // Code lines inside panel
  ctx.fillStyle = '#090A0E';
  ctx.font = '24px "Space Mono", monospace';
  const codeLines = [
    'import { Developer } from "@/core/story";',
    '',
    'export const engineer: Developer = {',
    '  name: "YOGESHKUMAR S",',
    '  institution: "SRM IST Ramapuram",',
    '  focus: ["MERN Full-Stack", "AI Applications"],',
    '  mangaVolume: "Volume 01 (2026)",',
    '  status: "BUILDING_FUTURE"',
    '};',
  ];
  codeLines.forEach((line, idx) => {
    ctx.fillText(line, 85, 260 + idx * 36);
  });

  // Middle Dramatic Japanese Sound Effect: ドォォン! (DON!)
  ctx.save();
  ctx.translate(canvas.width / 2, 700);
  ctx.rotate(-0.08);
  ctx.fillStyle = '#D71936';
  ctx.font = '900 120px "Bebas Neue", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('始 動 // INITIATE!', 0, 0);
  ctx.restore();

  // Bottom Panel: Character Intro Frame
  ctx.strokeStyle = '#090A0E';
  ctx.lineWidth = 6;
  ctx.strokeRect(60, 780, canvas.width - 120, 580);

  ctx.fillStyle = '#090A0E';
  ctx.fillRect(80, 800, 360, 60);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 28px "Space Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('PROTAGONIST DOSSIER', 95, 840);

  ctx.fillStyle = '#090A0E';
  ctx.font = '900 72px "Bebas Neue", sans-serif';
  ctx.fillText('YOGESH.', 85, 940);

  ctx.fillStyle = '#747C8B';
  ctx.font = 'bold 24px "Space Mono", monospace';
  ctx.fillText('GRADE: 8.68 GPA  •  LOCATION: CHENNAI, IN', 85, 985);

  // Screentone pattern inside bottom panel
  ctx.fillStyle = '#090A0E';
  for (let x = 85; x < canvas.width - 85; x += 16) {
    for (let y = 1030; y < 1320; y += 16) {
      if ((x + y) % 32 === 0) {
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Quote
  ctx.fillStyle = '#090A0E';
  ctx.font = 'italic bold 32px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('"Turning ideas into interactive experiences."', 85, 1260);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// 5. PAGE EDGES TEXTURE (Realistic compressed paper sheets)
export function createPageEdgeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Manga paper edge base color
  ctx.fillStyle = '#EBE6DD';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Micro horizontal paper sheet lines
  ctx.strokeStyle = '#D1CBC0';
  ctx.lineWidth = 1;
  for (let y = 0; y < canvas.height; y += 3) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Random graphite ink flecks
  ctx.strokeStyle = '#A8A296';
  for (let y = 0; y < canvas.height; y += 12) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 1);
  return texture;
}
