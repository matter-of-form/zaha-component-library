"use client";
import Player from "@vimeo/player";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Box } from "../../../";
import { videoFullscreen } from "../Video.styles";
import { VideoContext, VideoPlayer } from "./";

const VideoFullscreen: FC<any> = () => {
  const bodyRef = useRef<HTMLBodyElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const fullPlayer = useRef<Player | null>(null);
  const { isFullscreen, setIsFullscreen, setIsPlaying, setIsMuted, data } =
    useContext(VideoContext);

  const { allowFullscreen } = data;

  useEffect(() => {
    bodyRef.current = document.querySelector("body");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!fullPlayer.current) return;

    if (isFullscreen) {
      fullPlayer.current?.play().catch(console.warn);
      setIsPlaying(true);
      fullPlayer.current?.setMuted(false).catch(console.warn);
      setIsMuted(false);
    } else {
      fullPlayer.current
        ?.getPaused()
        .then((paused) => {
          if (!paused) {
            fullPlayer.current?.pause().catch(console.warn);
            setIsPlaying(false);
            fullPlayer.current?.setMuted(true).catch(console.warn);
            setIsMuted(true);
          }
        })
        .catch(console.warn);
    }
  }, [isFullscreen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return allowFullscreen && mounted && bodyRef.current
    ? createPortal(
        <Box {...videoFullscreen(isFullscreen)} layoutId="videoPlayer">
          <VideoPlayer ref={fullPlayer} isInline={false} />
        </Box>,
        bodyRef.current,
      )
    : null;
};

export default VideoFullscreen;
