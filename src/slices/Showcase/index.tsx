"use client";

import Bounded from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { PiGearDuotone, PiArrowsCounterClockwiseDuotone } from "react-icons/pi";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import AnimatedContent from "./AnimatedContent";

const icons = {
  gear: <PiGearDuotone />,
  cycle: <PiArrowsCounterClockwiseDuotone />,
};

/**
 * Props for `Showcase`.
 */
export type ShowcaseProps = SliceComponentProps<Content.ShowcaseSlice>;

/**
 * Component for "Showcase" Slices.
 */
const Showcase = ({ slice }: ShowcaseProps): JSX.Element => {
  const heading = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  gsap.registerPlugin(useGSAP);

  return (
    <Bounded
      className="relative"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="glow absolute -z-10 aspect-square w-full max-w-xl rounded-full bg-blue-400/20 blur-3xl filter" />
      <div className="my-4 text-4xl">
        <AnimatedContent>
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading2: ({ children }) => (
                <h2
                  ref={heading}
                  className="text-balance text-center text-5xl font-medium md:text-7xl"
                >
                  {children}
                </h2>
              ),
            }}
          />
        </AnimatedContent>
      </div>
      <div className="mt-16 grid items-center rounded-xl border border-blue-50/20 bg-gradient-to-b from-slate-50/15 to-slate-50/5 p-8 backdrop-blur-sm lg:grid-cols-3 lg:py-12">
        <div className="">
          <div className="w-fit rounded-md bg-blue-500/35 p-4 text-3xl">
            {slice.primary.icon && icons[slice.primary.icon]}
          </div>
          <div className="mt-6 text-2xl font-normal">
            <PrismicRichText field={slice.primary.subheading} />
          </div>
          <div className="prose prose-invert mt-4 max-w-xl">
            <PrismicRichText field={slice.primary.body} />
          </div>
        </div>

        <PrismicNextImage
          field={slice.primary.image}
          className={clsx(
            "rounded-xl opacity-90 shadow-2xl lg:col-span-2 lg:pt-0",
            slice.variation === "reverse"
              ? "lg:order-1 lg:translate-x-[15%]"
              : "lg:-order-1 lg:translate-x-[-15%]",
          )}
        />
      </div>
    </Bounded>
  );
};

export default Showcase;
