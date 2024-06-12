"use client";
import { FC, Suspense, useContext, useEffect } from "react";
import { Box } from "../../../";
import { VideoContext, VideoPlayer } from "./";
import { videoFullscreen } from "../Video.styles";
import { createPortal } from "react-dom";

const VideoFullscreen: FC<any> = () => {
  const { isFullscreen, setIsFullscreen } = useContext(VideoContext);

  const handleEsc = (e: any) => {
    if (e.keyCode === 27) {
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return isFullscreen
    ? createPortal(
        <Box {...videoFullscreen} layoutId="videoPlayer">
          <Suspense fallback={null}>
            <VideoPlayer isInline={false} />
          </Suspense>
        </Box>,
        document.body,
      )
    : null;
};

export default VideoFullscreen;
