import { forwardRef, Ref, useRef } from "react";
import { Box } from "../../../components";
import NextImage from "next/image";
import { ImageProps } from "./Image.types";
import { spacer } from "./Image.styles";
import { motion } from "framer-motion";
import { containsMotionProps } from "../../../utils";
import { useImageOptimiser } from "../../../hooks";

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
      ...props
    }: ImageProps,
    ref: Ref<any>,
  ): any => {
    const imageRef = useRef<any>();
    const isAnimated = containsMotionProps(props);

    if (!propSrc) return null;

    // get focal point
    const queryString = propSrc.split("?")[1];
    const searchParams = new URLSearchParams(queryString);
    const focalPoint = searchParams.get("rxy");
    const imageHeight = searchParams.get("height");

    const optimiserProps = useImageOptimiser(
      propSrc,
      (propWidth = 0),
      (propHeight = 0),
      responsive,
      sizes,
      imageRef,
      quality,
      imageHeight,
      focalPoint,
    );

    // this works out parent dimensions
    if (
      (optimiserProps.width && optimiserProps.width === 0) ||
      !optimiserProps.src
    ) {
      return <Box {...spacer} ref={imageRef} />;
    }

    const allProps = {
      alt,
      ...props,
      ...optimiserProps,
      priority,
      ...(!disablePlaceholder
        ? {
            placeholder: "blur",
            blurDataURL:
              "data:image/webp;base64,UklGRmQGAABXRUJQVlA4WAoAAAAE4QVnCQAACQAAVlA4TIoAAAAvCUACAM3UIKL/AScCABDO2eZcGW18ZP90ZFyybVvfiCCQtHHv3/mB+PFIm0McMX5ebC4+3gSskY2DPzfQ3d3VjsqMAYvC0VBfd1sNA1teIAgBBcIRYFcZB99TUbZOEIC/uc+h23dSVFcz8tHxtGlaSdWNXUrQ181PEOEP9TQ3w6KuZza18YUgEQBYTVAgswUAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAyIDc5LmYzNTRlZmMsIDIwMjMvMTEvMDktMTI6NDA6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyNS41IChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjQtMDgtMjFUMTY6NTc6NTcrMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDI0LTA4LTIxVDE3OjAyOjI3KzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTA4LTIxVDE3OjAyOjI3KzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjNTU2YzI1Ny1lNDI4LWUwNDEtODJjMi00YThlMWQ5ZWE4OGEiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyZjUwNDg2NS0zZTMzLTJhNGUtOGI2Yi1hNjZjY2QzYWQzNjAiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxNTVlMzVhMy0wOWRhLWM3NGUtODdlYS1lNWY1ZDY3NjZjZTMiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjE1NWUzNWEzLTA5ZGEtYzc0ZS04N2VhLWU1ZjVkNjc2NmNlMyIgc3RFdnQ6d2hlbj0iMjAyNC0wOC0yMVQxNjo1Nzo1NyswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDI1LjUgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpjNTU2YzI1Ny1lNDI4LWUwNDEtODJjMi00YThlMWQ5ZWE4OGEiIHN0RXZ0OndoZW49IjIwMjQtMDgtMjFUMTc6MDI6MjcrMDE6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNS41IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4A",
          }
        : {}),
    };

    return isAnimated ? (
      motion(NextImage, { ...allProps, ref })
    ) : (
      <NextImage {...allProps} ref={ref} />
    );
  },
);

Image.displayName = "Image";
