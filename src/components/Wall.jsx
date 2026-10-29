import { useEffect, useRef, useState } from "react";

const mod = (a, n) => ((a % n) + n) % n;

// Deterministic pseudo-random number for a grid cell.
function hash(c, r) {
  let h = (c * 374761393 + r * 668265263) | 0;
  h = (h ^ (h >>> 13)) * 1274126177;
  return (h ^ (h >>> 16)) >>> 0;
}

// Card size and how many cards are needed to cover the screen.
function measure() {
  const small = window.innerWidth <= 600;
  const w = small ? 150 : 200;
  const h = small ? 210 : 280;
  const gap = small ? 20 : 28;
  const cw = w + gap;
  const ch = h + gap;
  return {
    cw,
    ch,
    cols: Math.ceil(window.innerWidth / cw) + 4,
    rows: Math.ceil(window.innerHeight / ch) + 4,
  };
}

export default function Wall({ images, paused, onOpen, onInteract }) {
  const stageRef = useRef(null);
  const gridRef = useRef(null);
  const cardRefs = useRef([]);
  const [dims, setDims] = useState(measure);

  // Latest props for the animation loop, without restarting it.
  const live = useRef({ paused, onOpen, onInteract });
  live.current = { paused, onOpen, onInteract };

  // Motion state lives in a ref so React never re-renders per frame.
  const st = useRef({
    x: 0, y: 0, vx: -0.35, vy: 0,
    tiltX: 0, tiltY: 0, tx: 0, ty: 0,
  });

  useEffect(() => {
    const onResize = () => setDims(measure());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const grid = gridRef.current;
    const cards = cardRefs.current;
    const { cw, ch, cols, rows } = dims;
    const N = images.length;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const s = st.current;
    if (reduce) s.vx = 0;

    cards.forEach((el) => el && (el.dataset.key = ""));

    let dragging = false;
    let lastX = 0, lastY = 0, moved = 0, downCard = null, lastT = 0, raf = 0;

    function render() {
      const c0 = Math.floor(-s.x / cw) - 2;
      const r0 = Math.floor(-s.y / ch) - 2;
      for (let c = c0; c < c0 + cols; c++) {
        for (let r = r0; r < r0 + rows; r++) {
          const el = cards[mod(c, cols) * rows + mod(r, rows)];
          if (!el) continue;
          const key = c + "," + r;
          if (el.dataset.key !== key) {
            const hh = hash(c, r);
            const idx = N >= 3 ? mod(c * 3 + r * 5, N) : hh % N; // neighbours never repeat
            el.dataset.key = key;
            el.dataset.img = idx;
            el.dataset.rot = (((hh >>> 8) % 70) - 35) / 10; // -3.5 to 3.5 deg
            el.dataset.z = ((hh >>> 16) % 60) - 30;
            el.style.backgroundImage = images[idx];
          }
          const px = c * cw + s.x;
          const py = r * ch + s.y + (mod(c, 2) ? 34 : 0);
          el.style.transform = `translate3d(${px.toFixed(1)}px,${py.toFixed(1)}px,${el.dataset.z}px) rotate(${el.dataset.rot}deg)`;
        }
      }
    }

    function frame(t) {
      const dt = Math.min(48, t - lastT || 16) / 16.67;
      lastT = t;
      if (!dragging) {
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        const damp = Math.pow(0.95, dt);
        s.vx *= damp;
        s.vy *= damp;
        // slow idle drift so the wall never sits dead still
        if (!reduce && Math.abs(s.vx) < 0.35) s.vx += (-0.35 - s.vx) * 0.01 * dt;
      }
      s.tiltX += (s.tx - s.tiltX) * 0.07 * dt;
      s.tiltY += (s.ty - s.tiltY) * 0.07 * dt;
      const speed = Math.hypot(s.vx, s.vy);
      const blur = reduce ? 0 : Math.min(Math.max(speed - 3, 0) * 0.22, 6);
      grid.style.transform = `rotateX(${s.tiltX.toFixed(2)}deg) rotateY(${s.tiltY.toFixed(2)}deg)`;
      grid.style.filter = blur > 0.15 ? `blur(${blur.toFixed(2)}px)` : "none";
      render();
      raf = requestAnimationFrame(frame);
    }

    function onDown(e) {
      dragging = true;
      moved = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      downCard = e.target.closest ? e.target.closest(".card") : null;
      s.vx = 0;
      s.vy = 0;
      stage.classList.add("dragging");
      try { stage.setPointerCapture(e.pointerId); } catch {}
      live.current.onInteract();
    }
    function onMove(e) {
      if (!reduce) {
        s.ty = (e.clientX / window.innerWidth - 0.5) * 2 * 7;
        s.tx = -(e.clientY / window.innerHeight - 0.5) * 2 * 5;
      }
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      moved += Math.abs(dx) + Math.abs(dy);
      s.x += dx;
      s.y += dy;
      s.vx = dx;
      s.vy = dy;
    }
    function onUp() {
      if (!dragging) return;
      dragging = false;
      stage.classList.remove("dragging");
      if (moved < 6 && downCard) live.current.onOpen(+downCard.dataset.img);
      downCard = null;
    }
    function onCancel() {
      dragging = false;
      stage.classList.remove("dragging");
    }
    function onWheel(e) {
      e.preventDefault();
      s.x -= e.deltaX;
      s.y -= e.deltaY;
      s.vx = -e.deltaX * 0.2;
      s.vy = -e.deltaY * 0.2;
      live.current.onInteract();
    }
    function onKey(e) {
      if (live.current.paused) return;
      if (e.key === "ArrowLeft") s.vx += 12;
      if (e.key === "ArrowRight") s.vx -= 12;
      if (e.key === "ArrowUp") s.vy += 12;
      if (e.key === "ArrowDown") s.vy -= 12;
    }

    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointercancel", onCancel);
    stage.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerup", onUp);
      stage.removeEventListener("pointercancel", onCancel);
      stage.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [dims, images]);

  return (
    <main
      ref={stageRef}
      className="stage"
      tabIndex={0}
      aria-label="Photo gallery. Drag to move around, click a photo to open it."
    >
      <div ref={gridRef} className="grid">
        {Array.from({ length: dims.cols * dims.rows }, (_, i) => (
          <div
            key={i}
            className="card"
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
          />
        ))}
      </div>
      <div className="vignette" />
    </main>
  );
}
