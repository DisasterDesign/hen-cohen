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
    // Only show custom cursor on devices with fine pointer (no touch)
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

  // 6 aperture blades
  const bladeCount = 6;
  const size = 32;
  const center = size / 2;

  return (
    <div
      ref={cursorRef}
      className="aperture-cursor"
      style={{
        position: "fixed",
        top: -center,
        left: -center,
        width: size,
        height: size,
        pointerEvents: "none",
        zIndex: 99999,
        willChange: "transform",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ overflow: "visible" }}
      >
        {Array.from({ length: bladeCount }).map((_, i) => {
          const angle = (i * 360) / bladeCount;
          return (
            <ApertureBlade
              key={i}
              angle={angle}
              center={center}
              isHovering={isHovering}
              index={i}
            />
          );
        })}
      </svg>
    </div>
  );
}

function ApertureBlade({
  angle,
  center,
  isHovering,
  index,
}: {
  angle: number;
  center: number;
  isHovering: boolean;
  index: number;
}) {
  // Each blade is a curved trapezoid shape rotated around center
  const openOffset = 6;
  const closedOffset = 0.5;
  const offset = isHovering ? closedOffset : openOffset;

  // Blade shape: a slightly curved leaf shape
  const bladeLength = 13;
  const bladeWidth = 9;

  return (
    <g
      transform={`rotate(${angle}, ${center}, ${center})`}
      style={{
        transition: "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
    >
      <path
        d={`
          M ${center} ${center - offset}
          L ${center + bladeWidth / 2} ${center - offset - bladeLength * 0.4}
          Q ${center + bladeWidth * 0.3} ${center - offset - bladeLength * 0.85}
            ${center} ${center - offset - bladeLength}
          Q ${center - bladeWidth * 0.3} ${center - offset - bladeLength * 0.85}
            ${center - bladeWidth / 2} ${center - offset - bladeLength * 0.4}
          Z
        `}
        fill="rgba(27, 27, 25, 0.85)"
        stroke="rgba(27, 27, 25, 0.15)"
        strokeWidth="0.5"
        style={{
          transition: "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
          transitionDelay: `${index * 15}ms`,
        }}
      />
    </g>
  );
}
