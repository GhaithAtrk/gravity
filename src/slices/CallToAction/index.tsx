import Bounded from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";
import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicText, SliceComponentProps } from "@prismicio/react";
import { IoMdPlanet } from "react-icons/io";

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction = ({ slice }: CallToActionProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative py-32 text-center font-medium md:py-40"
    >
      <div className="glow absolute -z-10 aspect-square w-full max-w-sm rounded-full bg-blue-500/50 blur-[160px] filter" />
      <div className="rounded-glass-container">
        <div className=" -rotate-[25deg] rounded-full bg-gradient-to-b from-slate-800 to-slate-900 p-4 text-8xl">
          <IoMdPlanet />
        </div>
      </div>
      <div className="mt-8 max-w-xl text-5xl">
        <PrismicText field={slice.primary.heading} />
      </div>
      <ButtonLink field={slice.primary.button_link} className="mt-6">
        {slice.primary.button_text}
      </ButtonLink>
    </Bounded>
  );
};

export default CallToAction;
