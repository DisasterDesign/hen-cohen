"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";

export default function GrainOverlay() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 9998 }}
      aria-hidden="true"
    >
      <div className="grain-effect absolute inset-[-200%]" />
    </div>
  );
}
