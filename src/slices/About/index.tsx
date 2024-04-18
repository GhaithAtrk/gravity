import Bounded from "@/components/Bounded";
import StarGrid from "@/components/StarGrid";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `About`.
 */
export type AboutProps = SliceComponentProps<Content.AboutSlice>;

/**
 * Component for "About" Slices.
 */
const About = ({ slice }: AboutProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="relative grid place-items-center text-center">
        <StarGrid />
        <div className="mb-8 text-5xl">
          <PrismicRichText field={slice.primary.heading} />
        </div>
        <div className="my-6 text-2lg">
          <PrismicRichText field={slice.primary.body} />
        </div>
        <PrismicNextImage
          field={slice.primary.image}
          className="rounded-lg"
          quality={100}
        />
        <div className="my-4 text-lg text-left leading-10">
          <PrismicRichText field={slice.primary.content} />
        </div>

        <PrismicNextImage field={slice.primary.showcase_image} />
      </div>
    </Bounded>
  );
};

export default About;
