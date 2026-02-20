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

  const size = 54;
  const half = size / 2;

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: -half,
        left: -half,
        width: size,
        height: size,
        pointerEvents: "none",
        zIndex: 99999,
        willChange: "transform",
      }}
    >
      {/* Closed state: solid dot */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "#1B1B19",
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)",
          opacity: isHovering ? 1 : 0,
        }}
      />
      {/* Open state: aperture SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 624 624"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transition: "transform 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)",
          transformOrigin: "center center",
          transform: isHovering ? "scale(0)" : "scale(1)",
        }}
      >
        <path
          d="M437.1 239.501C418.5 225.501 398.2 212.101 376.6 199.601C354.9 187.101 333.2 176.301 311.8 167.101C276.3 151.901 241.8 141.501 210.2 135.801C141.6 123.601 86.8998 134.401 66.2998 170.001C115.3 85.3008 206.9 28.3008 311.8 28.3008C353 28.3008 389.7 70.3008 413.4 135.801C424.3 166.001 432.5 201.101 437.1 239.501Z"
          fill="black"
          stroke="white"
          strokeMiterlimit="10"
        />
        <path
          d="M515 311.801C494.3 336.301 468 361.001 437.1 384.201C439.9 361.101 441.4 336.901 441.4 311.801C441.4 286.701 439.9 262.501 437.1 239.401C432.5 201.101 424.3 165.901 413.4 135.801C389.7 70.3008 353 28.3008 311.8 28.3008C416.7 28.3008 508.3 85.3008 557.3 170.001C577.9 205.701 559.8 258.501 515 311.801Z"
          fill="black"
          stroke="white"
          strokeMiterlimit="10"
        />
        <path
          d="M595.3 311.8C595.3 363.4 581.5 411.8 557.4 453.6C536.8 489.3 482.1 500 413.5 487.8C381.9 482.2 347.4 471.7 311.9 456.5C333.3 447.4 355 436.5 376.7 424C398.4 411.5 418.6 398.1 437.2 384.1C468.1 360.9 494.4 336.3 515.1 311.7C559.9 258.4 578 205.6 557.4 170C581.5 211.8 595.3 260.2 595.3 311.8Z"
          fill="black"
          stroke="white"
          strokeMiterlimit="10"
        />
        <path
          d="M557.3 453.599C508.3 538.299 416.7 595.299 311.8 595.299C270.6 595.299 233.9 553.299 210.2 487.799C199.3 457.599 191.1 422.499 186.5 384.199C205.1 398.199 225.4 411.599 247 424.099C268.7 436.599 290.4 447.499 311.8 456.599C347.3 471.799 381.8 482.299 413.4 487.899C482 499.999 536.7 489.199 557.3 453.599Z"
          fill="black"
          stroke="white"
          strokeMiterlimit="10"
        />
        <path
          d="M311.8 595.3C206.9 595.3 115.3 538.3 66.2995 453.6C45.6995 417.9 63.7995 365.2 108.6 311.9C129.3 287.4 155.6 262.7 186.5 239.5C183.7 262.6 182.2 286.8 182.2 311.9C182.2 337 183.7 361.2 186.5 384.3C191.1 422.6 199.3 457.8 210.2 487.9C234 553.3 270.6 595.3 311.8 595.3Z"
          fill="black"
          stroke="white"
          strokeMiterlimit="10"
        />
        <path
          d="M311.8 167.101C290.4 176.201 268.7 187.101 247 199.601C225.3 212.101 205.1 225.501 186.5 239.501C155.6 262.701 129.3 287.301 108.6 311.901C63.8004 365.201 45.7004 418.001 66.3004 453.601C42.2004 411.901 28.4004 363.501 28.4004 311.801C28.4004 260.101 42.2004 211.801 66.3004 170.001C86.9004 134.301 141.6 123.601 210.2 135.801C241.8 141.501 276.3 151.901 311.8 167.101Z"
          fill="black"
          stroke="white"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
}
