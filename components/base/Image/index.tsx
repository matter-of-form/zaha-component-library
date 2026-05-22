import { forwardRef, Ref, useRef } from "react";
import { Box } from "../../../components";
import NextImage, { ImageLoader } from "next/image";
import { ImageProps, Format, RatioBucket } from "./Image.types";
import { focalPointSettings, spacer } from "./Image.styles";
import { motion } from "framer-motion";
import { containsMotionProps, stripQueryString } from "../../../utils";
import { useImageOptimiser, useDimensions } from "../../../hooks";

type NextImageLoaderProps = Parameters<ImageLoader>[0];

const FALLBACK_BLUR_DATA_URL =
  "data:image/webp;base64,UklGRmQGAABXRUJQVlA4WAoAAAAE4QVnCQAACQAAVlA4TIoAAAAvCUACAM3UIKL/AScCABDO2eZcGW18ZP90ZFyybVvfiCCQtHHv3/mB+PFIm0McMX5ebC4+3gSskY2DPzfQ3d3VjsqMAYvC0VBfd1sNA1teIAgBBcIRYFcZB99TUbZOEIC/uc+h23dSVFcz8tHxtGlaSdWNXUrQ181PEOEP9TQ3w6KuZza18YUgEQBYTVAgswUAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+";

function pickRatio(width: number, ratios: RatioBucket[] = []) {
  const sorted = [...ratios].sort((a, b) => a.maxWidth - b.maxWidth);
  for (const bucket of sorted) {
    if (width <= bucket.maxWidth) return bucket.ratio;
  }
  return sorted.length > 0 ? sorted[sorted.length - 1].ratio : undefined;
}

function createCustomImageLoader({
  gravity,
  format = "webp",
  ratios,
  fit,
}: {
  gravity?: string | null;
  format?: Format;
  ratios?: RatioBucket[];
  fit?: string;
}) {
  return ({ src, width, quality }: NextImageLoaderProps) => {
    const isAbsolute =
      src.startsWith("http://") ||
      src.startsWith("https://") ||
      src.startsWith("//");

    const baseUrl = isAbsolute
      ? stripQueryString(src)
      : `${process.env.IMAGE_PROCESSOR_URL || ""}${stripQueryString(src)}`;

    const params: string[] = [`w=${width}`];

    const ratio = pickRatio(width, ratios);
    if (ratio && ratio > 0) {
      const height = Math.round(width / ratio);
      params.push(`h=${height}`);
    }

    if (gravity) {
      params.push(`g=${gravity}`);
    }

    // const validQuality =
    //   quality && !isNaN(quality) && quality > 0 ? quality : 75;
    // params.push(`q=${validQuality}`);

    if (quality) {
      params.push(`q=${quality}`);
    }

    if (format) {
      params.push(`fm=${format}`);
    }

    if (fit) {
      params.push(`fit=${fit}`);
    }

    return `${baseUrl}?${params.join("&")}`;
  };
}

export const Image = forwardRef(
  (
    {
      src: propSrc,
      width: propWidth,
      height: propHeight,
      alt = "image",
      responsive = false,
      placeholder,
      sizes,
      quality,
      disablePlaceholder,
      priority = false,
      gravity,
      format,
      ratios,
      fit,
      blurHash,
      ...props
    }: ImageProps,
    ref: Ref<any>,
  ): any => {
    const imageRef = useRef<any>();
    const dimensions = useDimensions(imageRef);
    const isAnimated = containsMotionProps(props);

    // No src → spacer (gives the ref a DOM node to measure)
    if (!propSrc) return <Box {...spacer} ref={imageRef} />;

    // Non-responsive static image with no explicit width: wait until the
    // container has been measured before rendering the actual image.
    const measuredWidth = dimensions?.width ?? 0;
    if (!responsive && !propWidth && measuredWidth === 0) {
      return <Box {...spacer} ref={imageRef} />;
    }

    // Determine the blur placeholder: CMS blurHash takes priority, then fallback
    const resolvedBlurDataURL = blurHash || FALLBACK_BLUR_DATA_URL;

    const loader = createCustomImageLoader({
      gravity,
      format,
      ratios,
      fit,
    });

    const allProps = {
      alt,
      ...props,
      src: propSrc,
      loader,
      priority,
      ...(!propWidth && !propHeight
        ? { sizes: sizes ?? "(max-width: 1920px) 100vw, 1920px" }
        : {}),
      ...(responsive
        ? {
            fill: true,
            style: {
              objectFit: "cover" as const,
              ...focalPointSettings(gravity as string),
              ...props.style,
            },
          }
        : {}),
      ...(!responsive && (propWidth ?? measuredWidth)
        ? { width: propWidth ?? measuredWidth }
        : {}),
      ...(!responsive && propHeight ? { height: propHeight } : {}),
      ...(!disablePlaceholder
        ? {
            placeholder: "blur" as const,
            blurDataURL: resolvedBlurDataURL,
          }
        : {}),
    };

    const MotionImage = motion(NextImage as any);

    return isAnimated ? (
      <MotionImage {...allProps} ref={ref} />
    ) : (
      <NextImage {...allProps} ref={ref} />
    );

    // Legacy path: use useImageOptimiser
    // const queryString = propSrc.split("?")[1];
    // const searchParams = new URLSearchParams(queryString);
    // const focalPoint = searchParams.get("rxy");
    // const imageHeight = searchParams.get("height");

    // const optimiserProps = useImageOptimiser(
    //   propSrc,
    //   (propWidth = 0),
    //   (propHeight = 0),
    //   responsive,
    //   sizes,
    //   imageRef,
    //   quality,
    //   imageHeight,
    //   focalPoint,
    // );

    // // this works out parent dimensions
    // if (
    //   (optimiserProps.width && optimiserProps.width === 0) ||
    //   !optimiserProps.src
    // ) {
    //   return <Box {...spacer} ref={imageRef} />;
    // }

    // const allProps = {
    //   alt,
    //   ...props,
    //   ...optimiserProps,
    //   priority,
    //   ...(!disablePlaceholder
    //     ? {
    //         placeholder: "blur" as const,
    //         blurDataURL: resolvedBlurDataURL,
    //       }
    //     : {}),
    // };

    // return isAnimated ? (
    //   motion(NextImage, { ...allProps, ref })
    // ) : (
    //   <NextImage {...allProps} ref={ref} />
    // );
  },
);

Image.displayName = "Image";
