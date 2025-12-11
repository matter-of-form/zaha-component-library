"use client";
import { FC } from "react";
import { Image } from "../../../";

const VideoCoverImage: FC<any> = ({ data: { src, alt }, ...props }: any) => {
  if (!src) return null;

  return <Image src={src} alt={alt} responsive {...props} />;
};

export default VideoCoverImage;
