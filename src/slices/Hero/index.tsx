import Bounded from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";
import StarGrid from "@/components/StarGrid";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="text-center"
    >
      <div className="relative">
        <StarGrid />
        {isFilled.richText(slice.primary.heading) && (
          <h1 className="text-balance text-5xl text-[#FFD07D] md:text-7xl">
            <PrismicText field={slice.primary.heading} />
          </h1>
        )}

        {isFilled.richText(slice.primary.body) && (
          <div className="text mx-auto mt-6 max-w-md text-balance text-slate-300">
            <PrismicRichText field={slice.primary.body} />
          </div>
        )}
        {isFilled.link(slice.primary.button_link) && (
          <ButtonLink className="mt-8" field={slice.primary.button_link}>
            {slice.primary.button_label}
          </ButtonLink>
        )}
        {isFilled.image(slice.primary.image) && (
          <div className="rounded-glass-container mt-16 w-fit mx-auto">
            <div className="absolute inset-0 -z-10 rounded-full bg-blue-500/30 blur-2xl filter" />
            <PrismicNextImage
              className="rounded-full"
              field={slice.primary.image}
              quality={100}
            />
          </div>
        )}
      </div>
    </Bounded>
  );
};

export default Hero;
