import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import StarBackground from "./StarBackground";

import { GiCometSpark } from "react-icons/gi";
import { PiSunFill } from "react-icons/pi";
import { PiMoonStarsFill } from "react-icons/pi";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { BsStars } from "react-icons/bs";
import { Fragment } from "react";
import { GiAsteroid } from "react-icons/gi";
import { IoMdPlanet } from "react-icons/io";
import clsx from "clsx";
/**
 * Props for `Integrations`.
 */
export type IntegrationsProps = SliceComponentProps<Content.IntegrationsSlice>;

/**
 * Component for "Integrations" Slices.
 */
const Integrations = ({ slice }: IntegrationsProps): JSX.Element => {
  const icons = {
    asteroid: <GiAsteroid />,
    moon: <PiMoonStarsFill />,
    earth: <GiEarthAfricaEurope />,
    stars: <BsStars />,
    sun: <PiSunFill />,
    comet: <GiCometSpark />,
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden"
    >
      <div className="-z-1 absolute left-1/2 top-1/3 h-full w-full -translate-x-1/2 -translate-y-1/3 bg-gradient-to-b from-slate-900 to-slate-800" />
      <StarBackground />
      <div className="relative">
        <h2 className="mx-auto max-w-2xl text-balance text-center text-5xl font-medium md:text-7xl">
          <PrismicText field={slice.primary.heading} />
        </h2>
        <div className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300">
          <PrismicRichText field={slice.primary.body} />
        </div>

        <div className="mt-20 flex flex-col items-center md:flex-row">
          {slice.items.map((item, index) => (
            <Fragment key={index}>
              {index === Math.floor(slice.items.length / 2) && (
                <>
                  <div className="pulsing-icon flex aspect-square w-fit shrink-0 -rotate-[25deg] items-center justify-center rounded-full border border-blue-50 bg-blue-50/25 bg-gradient-to-b from-slate-500 to-slate-800 p-2 text-8xl opacity-50 lg:text-9xl">
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
                    index === Math.floor(slice.items.length / 2)
                      ? "rotate-180"
                      : "rotate=0",
                  )}
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default Integrations;
