import { ImageProps as NextImageProps } from "next/image";
import { MotionProps } from "framer-motion";

export type Format = "jpg" | "png" | "webp" | "avif";

export type RatioBucket = {
  maxWidth: number;
  ratio: number;
};

type ImageAndMotionProps = NextImageProps & MotionProps;

export interface ImageProps extends ImageAndMotionProps {
  responsive?: boolean;
  src: string;
  motion?: boolean;
  disablePlaceholder?: boolean;
  /** Focal point string from CMS, e.g. "0.5x0.5" or "0.5,0.3" */
  gravity?: string | null;
  /** Output format for the CDN */
  format?: Format;
  /**
   * Responsive aspect-ratio buckets.
   * Each entry maps a max viewport width to a width/height ratio.
   * The loader picks the first bucket where `width <= maxWidth`.
   */
  ratios?: RatioBucket[];
  /** Fit mode passed to the CDN (e.g. "cover", "contain") */
  fit?: string;
  /** Blur hash data URL from the CMS, used as placeholder */
  blurHash?: string;
}
