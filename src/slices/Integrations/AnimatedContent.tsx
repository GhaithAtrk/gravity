"use client";

import { Content, filter } from "@prismicio/client";
import clsx from "clsx";
import React, { Fragment } from "react";
import { BsStars } from "react-icons/bs";
import { GiAsteroid, GiCometSpark, GiEarthAfricaEurope } from "react-icons/gi";
import { IoMdPlanet } from "react-icons/io";
import { PiMoonStarsFill, PiSunFill } from "react-icons/pi";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function AnimatedContent({
  slice,
}: {
  slice: Content.IntegrationsSlice;
}) {
  const container = useRef(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  gsap.registerPlugin(useGSAP);

  const icons = {
    asteroid: <GiAsteroid />,
    moon: <PiMoonStarsFill />,
    earth: <GiEarthAfricaEurope />,
    stars: <BsStars />,
    sun: <PiSunFill />,
    comet: <GiCometSpark />,
  };

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(".pulsing-logo , .signal-line", { opacity: 1 });

        return;
      }

      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "power2.inOut" },
      });
      // Logo
      tl.to(
        ".pulsing-logo", {
        keyframes: [
          {
            opacity: 1,
            stagger: {
              from: "center",
              each: 0.3,
            },
            duration: 0.5,
          },
          {
            opacity: 0.4,
            duration: 1,
            stagger: {
              from: "center",
              each: 0.3,
            },
          },
        ],
      },
      "-=0.8",
    );
      // Sigmal line
      tl.to(
        ".signal-line",
        {
          keyframes: [
            {
              backgroundPosition: "0% 0%",
            },
            {
              backgroundPosition: "100% 100%",
              stagger: {
                from: "center",
                each: 0.3,
              },
              duration: 1,
            },
          ],
        },
        "-=1.4",
      );

      // Icons
      tl.to(
        ".pulsing-icon",
        {
          keyframes: [
            {
              opacity: 1,
              stagger: {
                from: "center",
                each: 0.3,
              },
              duration: 1,
            },
            {
              opacity: 0.4,
              duration: 1,
              stagger: {
                from: "center",
                each: 0.3,
              },
            },
          ],
        },
        "-=2",
      );
    },
    { scope: container },
  );

  return (
    <div
      className="mt-20 flex flex-col items-center md:flex-row"
      ref={container}
    >
      {slice.items.map((item, index) => (
        <Fragment key={index}>
          {index === Math.floor(slice.items.length / 2) && (
            <>
              <div className="pulsing-logo flex aspect-square w-fit shrink-0 -rotate-[25deg] items-center justify-center rounded-full border border-blue-50 bg-blue-50/25 bg-gradient-to-b from-slate-500 to-slate-800 p-2 text-8xl opacity-50 lg:text-9xl">
                <IoMdPlanet />
              </div>
              <div className="signal-line rotate-180 bg-gradient-to-t" />
            </>
          )}
          <div className="pulsing-icon flex aspect-square shrink-0 items-center justify-center rounded-full border border-blue-50/30 bg-blue-50/25 p-3 text-3xl text-blue-100 opacity-40 md:text-4xl lg:text-5xl">
            {item.icon && icons[item.icon]}
          </div>
          {index !== slice.items.length - 1 && (
            <div
              className={clsx(
                "signal-line",
                index >= Math.floor(slice.items.length / 2)
                  ? "rotate-180"
                  : "rotate=0",
              )}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}
