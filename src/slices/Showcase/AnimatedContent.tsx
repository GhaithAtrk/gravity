"use client";

import React, { ReactNode, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AnimatedContent({ children }: { children: ReactNode }) {
  const container = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  gsap.registerPlugin(useGSAP, ScrollTrigger);

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(container.current, { y: 0 });
        return;
      }

      gsap.fromTo(
        container.current,
        { y: 160 },
        {
          y: 0,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom-=20%",
            toggleActions: "play pause resume reverse",
          },
        },
      );
    },
    { scope: container },
  );

  return <div ref={container}>{children}</div>;
}
