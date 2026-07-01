"use client";

import { useRef, useEffect, useCallback } from "react";

const DAMPING = 0.988;      // quanto a onda se dissipa a cada frame
const PHYS_SCALE = 2;       // buffer de física em 1/2 da resolução (performance)
const DROP_RADIUS = 5;       // raio do "impacto" em pixels físicos
const DISP_STRENGTH = 5;    // força do deslocamento na imagem
const OBJ_POS_X = 0.7;      // object-position: 70% (mesma da foto CSS)
const OBJ_POS_Y = 0.5;      // object-position: center

/**
 * Simula uma superfície de água sobre uma imagem usando canvas 2D.
 * A física roda em buffer downscalado (PHYS_SCALE) para manter 60fps.
 * A imagem é renderizada com os pixels deslocados pelo mapa de alturas.
 */
export function HeroWater({ src }: { src: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  // Estado mutável sem re-renders
  const S = useRef({
    pw: 0, ph: 0,          // dimensões do buffer de física
    cw: 0, ch: 0,          // dimensões do canvas real
    b1: null as Float32Array | null,  // buffer altura atual
    b2: null as Float32Array | null,  // buffer altura anterior
    src: null as Uint8ClampedArray | null, // pixels originais (cor)
    out: null as ImageData | null,         // buffer de saída
    ctx: null as CanvasRenderingContext2D | null,
    ready: false,
  });

  const addDrop = useCallback((cx: number, cy: number, strength = 400) => {
    const { pw, ph, b1 } = S.current;
    if (!b1) return;
    const px = Math.round(cx / PHYS_SCALE);
    const py = Math.round(cy / PHYS_SCALE);
    const r = DROP_RADIUS;
    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        if (dx * dx + dy * dy <= r * r) {
          const x = px + dx, y = py + dy;
          if (x >= 0 && x < pw && y >= 0 && y < ph) {
            b1[y * pw + x] = strength;
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    S.current.ctx = ctx;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    let lastDrop = 0;

    const init = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width: cw, height: ch } = parent.getBoundingClientRect();
      const W = Math.floor(cw), H = Math.floor(ch);
      canvas.width = W;
      canvas.height = H;

      const pw = Math.floor(W / PHYS_SCALE);
      const ph = Math.floor(H / PHYS_SCALE);

      // Calcular posição/tamanho object-fit: cover com object-position 70% 50%
      const scaleX = W / img.naturalWidth;
      const scaleY = H / img.naturalHeight;
      const scale = Math.max(scaleX, scaleY);
      const sw = img.naturalWidth * scale;
      const sh = img.naturalHeight * scale;
      const ox = -(sw - W) * OBJ_POS_X;
      const oy = -(sh - H) * OBJ_POS_Y;

      ctx.drawImage(img, ox, oy, sw, sh);
      const imgData = ctx.getImageData(0, 0, W, H);

      S.current = {
        ...S.current,
        cw: W, ch: H, pw, ph,
        b1: new Float32Array(pw * ph),
        b2: new Float32Array(pw * ph),
        src: new Uint8ClampedArray(imgData.data),
        out: imgData,
        ready: true,
      };
    };

    if (img.complete && img.naturalWidth > 0) init();
    else img.onload = init;

    const ro = new ResizeObserver(init);
    ro.observe(canvas.parentElement!);

    // Loop de animação
    const loop = () => {
      rafRef.current = requestAnimationFrame(loop);
      const { pw, ph, cw, ch, b1, b2, src, out, ctx, ready } = S.current;
      if (!ready || !b1 || !b2 || !src || !out || !ctx) return;

      // ── Física da onda ──────────────────────────────────────────────
      for (let y = 1; y < ph - 1; y++) {
        for (let x = 1; x < pw - 1; x++) {
          const i = y * pw + x;
          b2[i] = (b1[i - 1] + b1[i + 1] + b1[i - pw] + b1[i + pw]) * 0.5 - b2[i];
          b2[i] *= DAMPING;
          if (Math.abs(b2[i]) < 0.001) b2[i] = 0; // dead zone
        }
      }

      // Troca de buffers
      [S.current.b1, S.current.b2] = [b2, b1];
      const cur = S.current.b1!;

      // ── Render com deslocamento ─────────────────────────────────────
      const outData = out.data;
      for (let y = 1; y < ch - 1; y++) {
        for (let x = 1; x < cw - 1; x++) {
          const pi = (Math.floor(y / PHYS_SCALE)) * pw + Math.floor(x / PHYS_SCALE);
          const dx = Math.round((cur[pi] - cur[pi + 1]) * DISP_STRENGTH);
          const dy = Math.round((cur[pi] - cur[pi + pw]) * DISP_STRENGTH);
          const sx = Math.max(0, Math.min(cw - 1, x + dx));
          const sy = Math.max(0, Math.min(ch - 1, y + dy));
          const si = (sy * cw + sx) * 4;
          const di = (y * cw + x) * 4;
          outData[di]     = src[si];
          outData[di + 1] = src[si + 1];
          outData[di + 2] = src[si + 2];
          outData[di + 3] = 255;
        }
      }

      ctx.putImageData(out, 0, 0);
    };

    rafRef.current = requestAnimationFrame(loop);

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const now = performance.now();
      if (now - lastDrop < 20) return; // max 50 drops/seg
      lastDrop = now;
      addDrop(e.clientX - rect.left, e.clientY - rect.top);
    };

    canvas.addEventListener("mousemove", handleMove);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", handleMove);
      ro.disconnect();
    };
  }, [src, addDrop]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full grayscale"
    />
  );
}
