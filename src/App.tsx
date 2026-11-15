import React from 'react';
import { Sparkles, Terminal } from 'lucide-react';

export default function App(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-[#F4F0E8] text-[#151515] p-6 md:p-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-xl border-2 border-[#151515] bg-[#FAF8F5] p-8 shadow-manga relative">
        {/* Editorial Top Stamp */}
        <div className="flex items-center justify-between border-b-2 border-[#151515] pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#E53935] inline-block" />
            <span className="font-mono text-xs font-bold tracking-widest uppercase">
              PHASE 01: SYSTEM FOUNDATION
            </span>
          </div>
          <span className="font-mono text-xs text-[#A5A19B]">
            VOL. 01 / VER. 1.0.0
          </span>
        </div>

        {/* Brand Display Title */}
        <h1 className="font-display text-6xl tracking-wide uppercase text-[#151515] mb-2">
          YOGESH<span className="text-[#E53935]">.</span>
        </h1>
        <p className="font-mono text-xs text-[#55524E] uppercase tracking-wider mb-6">
          THE DEVELOPER'S STORY — DESIGN SYSTEM INITIALIZED
        </p>

        {/* Design System Token Verifications */}
        <div className="grid grid-cols-2 gap-3 mb-6 font-mono text-xs">
          <div className="p-3 bg-[#F4F0E8] border border-[#151515]">
            <div className="w-4 h-4 rounded-none bg-[#F4F0E8] border border-[#151515] mb-2" />
            <span className="font-bold block">Paper Canvas</span>
            <span className="text-[#A5A19B]">#F4F0E8</span>
          </div>
          <div className="p-3 bg-[#151515] text-[#F4F0E8] border border-[#151515]">
            <div className="w-4 h-4 rounded-none bg-[#151515] border border-white mb-2" />
            <span className="font-bold block">Deep Ink</span>
            <span className="text-[#A5A19B]">#151515</span>
          </div>
          <div className="p-3 bg-[#E53935] text-white border border-[#151515]">
            <div className="w-4 h-4 rounded-none bg-[#E53935] border border-white mb-2" />
            <span className="font-bold block">Manga Red</span>
            <span className="text-white/80">#E53935</span>
          </div>
          <div className="p-3 bg-[#EAE5DC] border border-[#151515]">
            <div className="w-4 h-4 rounded-none bg-[#EAE5DC] border border-[#151515] mb-2" />
            <span className="font-bold block">Ink Wash</span>
            <span className="text-[#A5A19B]">#EAE5DC</span>
          </div>
        </div>

        {/* Verification Checkpoints */}
        <div className="border-t border-[#151515] pt-4 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2 text-[#55524E]">
            <Terminal className="w-4 h-4 text-[#151515]" />
            <span>React 19 + TypeScript + Tailwind v4</span>
          </div>
          <div className="flex items-center gap-1 text-[#E53935] font-bold">
            <Sparkles className="w-4 h-4" />
            <span>READY FOR PHASE 2</span>
          </div>
        </div>
      </div>
    </div>
  );
}
