import { forwardRef, Ref, Suspense } from "react";
import { MediaProps } from "./Media.types";
import { caption, mediaHolder } from "./Media.styles";
import { Box, Image, Text, Video } from "../../../components";

export const Media = forwardRef(
  (
    {
      data,
      size,
      imageSizes,
      responsive = true,
      priority = false,
      align,
      captionTextStyle = "p",
      onAutoPlayStarted,
      onPlayerReady,
      orientation,
      cardVariant = "primary",
      imageQuality,
      disablePlaceholder,
      usePhotographerAsCredit,
      ...props
    }: MediaProps,
    ref: Ref<MediaProps>,
  ): any => {
    if (!data) return null;

    const hasImageSizes = imageSizes ? { sizes: imageSizes } : {};

    let variant: any = (
      <Image
        {...hasImageSizes}
        src={data?.imageUrl}
        alt={data?.imageAlt}
        responsive={responsive}
        priority={priority}
        quality={imageQuality}
        gravity={data?.gravity}
        blurHash={data?.blurHash}
        disablePlaceholder={disablePlaceholder || data?.isSvg}
      />
    );
    if (data?.coverImage) {
      const remappedVideoData: {
        image: {
          src: string;
          alt?: string;
          gravity?: string | null;
          blurHash?: string | null;
        };
        video: {
          src: string | number;
          type: "vimeo" | "youtube";
          autoPlay: boolean;
          loop: boolean;
          allowFullscreen: boolean;
          allowControls: boolean;
          allowSound: boolean;
        };
      } = {
        image: {
          src: data?.coverImage?.imageUrl,
          alt: data?.coverImage?.imageAlt,
          gravity: data?.coverImage?.gravity,
          blurHash: data?.coverImage?.blurHash,
        },
        video: {
          src: data?.vimeoId || data?.youtubeId || data?.videoFromGallery,
          type: getVideoType(data),
          autoPlay: data?.autoPlay,
          loop: data?.loop,
          allowFullscreen: data?.allowFullScreen,
          allowControls: data?.allowControls || true,
          allowSound: data?.allowSound || true,
        },
      };

      if (
        data?.vimeoId !== "" ||
        data?.youtubeId !== "" ||
        data?.videoFromGallery
      ) {
        variant = (
          <Video
            onAutoPlayStarted={onAutoPlayStarted}
            onPlayerReady={onPlayerReady}
            data={remappedVideoData}
            {...hasImageSizes}
            priority={priority} // for cover image
            imageQuality={imageQuality}
          />
        );
      } else {
        // catch for images with video marked as cover images
        variant = (
          <Image
            {...hasImageSizes}
            src={data?.coverImage?.imageUrl}
            alt={data?.coverImage?.imageAlt}
            responsive={responsive}
            priority={priority}
            quality={imageQuality}
            gravity={data?.coverImage?.gravity}
            blurHash={data?.coverImage?.blurHash}
            disablePlaceholder={disablePlaceholder || data?.coverImage?.isSvg}
          />
        );
      }
    }
    if (data.isSvg && data.svg) {
      const SVG = require(data.imageUrl).current || null;
      variant = <SVG />;
    }

    if (!variant) return null;

    return (
      <Box {...props} {...mediaHolder(size, align, orientation, props)}>
        {variant}
        {data?.title && <Text text={data?.title} {...caption("title")} />}
        {data?.photographer && usePhotographerAsCredit && (
          <Text text={data?.photographer} {...caption("photographer")} />
        )}
        {data?.imageCredit && (
          <Text text={data?.imageCredit} {...caption("photographer credit")} />
        )}
        <Text text={data?.caption} {...caption("")} />
      </Box>
    );
  },
);

const getVideoType = (data: any) => {
  let vidType: "vimeo" | "youtube" = "vimeo";
  if (data?.vimeoId && data?.vimeoId?.length > 0) vidType = "vimeo";
  if (data?.youtubeId && data?.youtubeId?.length > 0) vidType = "youtube";

  return vidType;
};

Media.displayName = "Media";
