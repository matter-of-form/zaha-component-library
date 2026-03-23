"use client";
import { FC } from "react";
import { Image } from "../../../";

const VideoCoverImage: FC<any> = ({
  data: { src, alt, gravity, blurHash },
  imageQuality,
  ...props
}: any) => {
  if (!src) return null;

  return (
    <Image
      src={src}
      alt={alt}
      gravity={gravity}
      blurHash={blurHash}
      responsive
      quality={imageQuality}
      {...props}
    />
  );
};

export default VideoCoverImage;
