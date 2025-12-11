"use client";
import { FC, Suspense, useContext, useEffect, useRef } from "react";
import { Box } from "../../../";
import { VideoContext, VideoPlayer } from "./";
import { videoFullscreen } from "../Video.styles";
import { createPortal } from "react-dom";
import Player from "@vimeo/player";

const VideoFullscreen: FC<any> = () => {
  const fullPlayer = useRef<Player | null>(null);
  const { isFullscreen, setIsFullscreen, setIsPlaying, setIsMuted, data } =
    useContext(VideoContext);

  const { allowFullscreen } = data;

  useEffect(() => {
    if (!fullPlayer.current) return;

    if (isFullscreen) {
      fullPlayer.current?.play().catch(console.warn);
      setIsPlaying(true);
      fullPlayer.current?.setMuted(false).catch(console.warn);
      setIsMuted(false);
    } else {
      fullPlayer.current?.pause().catch(console.warn);
      setIsPlaying(false);
      fullPlayer.current?.setMuted(true).catch(console.warn);
      setIsMuted(true);
    }
  }, [isFullscreen]);

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

  return allowFullscreen
    ? createPortal(
        <Box {...videoFullscreen(isFullscreen)} layoutId="videoPlayer">
          <VideoPlayer ref={fullPlayer} isInline={false} />
        </Box>,
        document.body,
      )
    : null;
};

export default VideoFullscreen;
