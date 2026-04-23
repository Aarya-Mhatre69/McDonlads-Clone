"use client";

import { useEffect, useRef } from "react";

export default function CursorFX() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* Only activate on real pointer/mouse devices */
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let raf: number;
    let mx = -300, my = -300;
    let rx = -300, ry = -300;
    let isHovering = false;
    let isPressing = false;
    let isVisible  = false;

    function paint() {
      const dotSize  = isPressing ? 5  : isHovering ? 18 : 10;
      const ringSize = isPressing ? 20 : isHovering ? 56 : 36;

      dot!.style.width      = dotSize  + "px";
      dot!.style.height     = dotSize  + "px";
      dot!.style.background = isHovering ? "#FFC72C" : "#DA291C";
      dot!.style.opacity    = isVisible  ? "1" : "0";

      ring!.style.width   = ringSize + "px";
      ring!.style.height  = ringSize + "px";
      ring!.style.border  = isHovering
        ? "1.5px solid rgba(255,199,44,0.8)"
        : "1.5px solid rgba(218,41,28,0.5)";
      ring!.style.opacity = isVisible ? "1" : "0";
    }

    const INTERACTIVE =
      "a,button,input,textarea,select,label,summary," +
      "[role='button'],[role='link'],[tabindex]";

    function onMove(e: MouseEvent) {
      mx = e.clientX; my = e.clientY;
      if (!isVisible) { isVisible = true; paint(); }
    }
    function onOver(e: MouseEvent) {
      const h = !!(e.target as Element | null)?.closest(INTERACTIVE);
      if (h !== isHovering) { isHovering = h; paint(); }
    }
    function onDown()  { isPressing = true;  paint(); }
    function onUp()    { isPressing = false; paint(); }
    function onLeave() { isVisible  = false; paint(); }
    function onEnter() { isVisible  = true;  paint(); }

    function loop() {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      dot!.style.left  = mx + "px";
      dot!.style.top   = my + "px";
      ring!.style.left = rx + "px";
      ring!.style.top  = ry + "px";
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove",  onMove,  { passive: true });
    window.addEventListener("mouseover",  onOver,  { passive: true });
    window.addEventListener("mousedown",  onDown,  { passive: true });
    window.addEventListener("mouseup",    onUp,    { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseover",  onOver);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          html, html * { cursor: none !important; }
        }
      `}</style>

      {/* DOT — always in DOM from first render so RAF can find it */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position:      "fixed",
          top:           "-300px",
          left:          "-300px",
          width:         "10px",
          height:        "10px",
          background:    "#DA291C",
          borderRadius:  "50%",
          pointerEvents: "none",
          zIndex:        2147483647,
          transform:     "translate(-50%, -50%)",
          opacity:       0,
          transition:    "width .16s cubic-bezier(.16,1,.3,1), height .16s cubic-bezier(.16,1,.3,1), background .18s, opacity .2s",
          willChange:    "left, top",
        }}
      />

      {/* RING — always in DOM from first render so RAF can find it */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position:      "fixed",
          top:           "-300px",
          left:          "-300px",
          width:         "36px",
          height:        "36px",
          border:        "1.5px solid rgba(218,41,28,0.5)",
          borderRadius:  "50%",
          pointerEvents: "none",
          zIndex:        2147483646,
          transform:     "translate(-50%, -50%)",
          opacity:       0,
          transition:    "width .28s cubic-bezier(.16,1,.3,1), height .28s cubic-bezier(.16,1,.3,1), border .22s, opacity .2s",
          willChange:    "left, top",
        }}
      />
    </>
  );
}