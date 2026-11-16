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

  // Black Sub-header Banner with Title: YOGESH // PORTFOLIO LOG
  ctx.fillStyle = '#14151B';
  ctx.fillRect(52, 140, canvas.width - 104, 60);
  ctx.strokeStyle = '#D71936';
  ctx.lineWidth = 2;
  ctx.strokeRect(52, 140, canvas.width - 104, 60);

  ctx.fillStyle = '#F4F2ED';
  ctx.font = 'bold 24px "Space Mono", monospace';
  ctx.letterSpacing = '3px';
  ctx.fillText('YOGESHKUMAR S // PORTFOLIO LOG', 80, 178);

  // Center Geometric Speedlines Frame
  ctx.strokeStyle = '#23252C';
  ctx.lineWidth = 2;
  for (let i = 0; i < 14; i++) {
    const y = 230 + i * 28;
    ctx.beginPath();
    ctx.moveTo(80, y);
    ctx.lineTo(canvas.width - 80, y);
    ctx.stroke();
  }

  // Large Dramatic Title: "YOGESHKUMAR S"
  ctx.fillStyle = '#090A0E';
  ctx.fillRect(80, 460, canvas.width - 160, 290);

  // Hard Crimson Shadow Behind Title
  ctx.fillStyle = '#D71936';
  ctx.font = '900 115px "Space Grotesk", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('YOGESHKUMAR S', 95, 620);

  // Foreground Crisp White Title
  ctx.fillStyle = '#F4F2ED';
  ctx.fillText('YOGESHKUMAR S', 88, 614);

  // Sub-badge: PORTFOLIO LOG
  ctx.fillStyle = '#D71936';
  ctx.fillRect(80, 660, canvas.width - 160, 52);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 28px "Space Mono", monospace';
  ctx.letterSpacing = '4px';
  ctx.fillText('PORTFOLIO LOG // 開発者録', 100, 696);

  // Author Full Name & Positioning
  ctx.fillStyle = '#F4F2ED';
  ctx.font = 'bold 36px "Space Mono", monospace';
  ctx.fillText('YOGESHKUMAR S', 84, 765);

  ctx.fillStyle = '#D71936';
  ctx.fillRect(80, 785, canvas.width - 160, 4);

  // Tagline & Positioning
  ctx.fillStyle = '#F4F2ED';
  ctx.font = 'bold 30px "Space Mono", monospace';
  ctx.fillText('THE DEVELOPER\'S STORY', 84, 835);

  ctx.fillStyle = '#747C8B';
  ctx.font = '22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('B.Tech IT Student  •  Full-Stack MERN  •  AI-Powered Web Apps', 84, 875);

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
  ctx.font = '900 52px "Space Grotesk", sans-serif';
  ctx.letterSpacing = '4px';
  ctx.fillText('YOGESHKUMAR S // PORTFOLIO LOG', 0, 20);

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
  ctx.font = '900 52px "Space Grotesk", sans-serif';
  ctx.fillText('YOGESHKUMAR S 2026', 110, 1300);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// 4. INNER MANGA PAGE SPREAD TEXTURE (Revealed when cover opens)
export function createInsidePageTexture(): THREE.Texture {
  const loader = new THREE.TextureLoader();
  const texture = loader.load('/art/panel-focus.jpg');
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  return texture;
}

// 5. INNER FRONT COVER SPREAD TEXTURE (Revealed on the inside face of the swinging cover)
export function createInsideCoverTexture(): THREE.Texture {
  const loader = new THREE.TextureLoader();
  const texture = loader.load('/art/skillswap-manga.jpg');
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
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
