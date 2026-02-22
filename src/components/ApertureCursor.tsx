"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function ApertureCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  const updateCursorPosition = useCallback(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
    }
    rafRef.current = requestAnimationFrame(updateCursorPosition);
  }, []);

  useEffect(() => {
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasPointer) return;

    document.documentElement.classList.add("custom-cursor-active");

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      );
      setIsHovering(!!interactive);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    rafRef.current = requestAnimationFrame(updateCursorPosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(rafRef.current);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [updateCursorPosition]);

  const size = isHovering ? 48 : 32;
  const half = size / 2;

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 99999,
        willChange: "transform",
        marginTop: -half,
        marginLeft: -half,
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#808080",
        mixBlendMode: "difference",
        transition:
          "width 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), height 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), margin 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
    />
  );
}
