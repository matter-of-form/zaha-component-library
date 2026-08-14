"use client";
import type Player from "@vimeo/player";
import { useRef, FC, useCallback, useEffect, useState } from "react";
import { Box } from "../../";
import { videoWrapper } from "./Video.styles";
import { VideoContext, VideoCoverImage, VideoPlayer } from "./chunks";
import "./Video.css";

type VideoProps = {
  data: {
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
  };
  imageSizes?: string;
  priority?: string | boolean;
  onPlayerReady?: () => void;
  onAutoPlayStarted?: () => void;
  imageQuality?: number | string;
};

// Safari on iPhone is the only target that does not expose the element-level
// Fullscreen API — there only the <video> element itself can go fullscreen,
// which means handing the video over to the native iOS player. Everywhere else
// we lift this component's own wrapper into fullscreen, so the custom control
// overlay goes with it and a single Vimeo instance serves both states.
const getFullscreenRequest = (el: any) =>
  el?.requestFullscreen || el?.webkitRequestFullscreen || null;

const getFullscreenElement = () =>
  typeof document === "undefined"
    ? null
    : document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      null;

// The webkit-prefixed variants return undefined rather than a promise.
const settle = (result: any) => Promise.resolve(result).catch(console.warn);

const Video: FC<VideoProps> = ({
  data,
  imageSizes,
  priority = "false",
  onPlayerReady,
  onAutoPlayStarted,
  imageQuality,
}: VideoProps) => {
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player>();
  // True only while the video sits in the device's own player (iPhone), where
  // no document-level fullscreen event will ever arrive.
  const usedNativeViewer = useRef(false);
  const wasFullscreen = useRef(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [inlineViewer, setInlineViewer] = useState<any>(null);
  const [init, setInit] = useState(true);
  const { image: cover, video } = data;

  // Back to the muted ambient loop the module started as.
  const leaveFullscreen = useCallback(() => {
    usedNativeViewer.current = false;
    wasFullscreen.current = false;
    setIsFullscreen(false);
    setIsMuted(true);

    if (video?.autoPlay) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      playerRef.current?.pause().catch(console.warn);
    }
  }, [video?.autoPlay]);

  const handleFullscreen = (e?: any) => {
    e && e.stopPropagation();

    if (!video?.allowFullscreen) return;

    // The ambient loop has been running since page load — start the film from
    // the top instead of wherever it happens to be.
    playerRef.current?.setCurrentTime(0).catch(console.warn);
    playerRef.current?.play().catch(console.warn);
    setIsMuted(false);
    setIsPlaying(true);

    const el = videoWrapperRef.current;
    const request = getFullscreenRequest(el);

    if (request) {
      // Issued straight out of the click so the user gesture is still valid.
      // `isFullscreen` is flipped by the fullscreenchange listener below, which
      // also covers exits the browser initiates itself (Esc, chrome buttons).
      settle(request.call(el));
      return;
    }

    usedNativeViewer.current = true;
    playerRef.current?.requestFullscreen().catch(console.warn);
  };

  const handleExitFullscreen = () => {
    if (usedNativeViewer.current) {
      playerRef.current?.exitFullscreen().catch(console.warn);
      leaveFullscreen();
      return;
    }

    const exit =
      document.exitFullscreen || (document as any).webkitExitFullscreen;

    if (getFullscreenElement() && exit) {
      settle(exit.call(document));
    } else {
      leaveFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const active = getFullscreenElement() === videoWrapperRef.current;

      // Another element on the page going fullscreen must not disturb this one.
      if (active === wasFullscreen.current) return;

      wasFullscreen.current = active;
      active ? setIsFullscreen(true) : leaveFullscreen();
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange,
      );
    };
  }, [leaveFullscreen]);

  return data ? (
    <Box
      ref={videoWrapperRef}
      {...videoWrapper(
        isPlaying,
        video?.autoPlay,
        video?.allowFullscreen,
        isFullscreen,
        init,
      )}
    >
      <VideoContext.Provider
        value={{
          data: video,
          handleExitFullscreen,
          handleFullscreen,
          init,
          isMuted,
          isFullscreen,
          isPlaying,
          inlineViewer,
          onAutoPlayStarted,
          onNativeViewerExit: leaveFullscreen,
          onPlayerReady,
          setInit,
          setIsFullscreen,
          setIsMuted,
          setIsPlaying,
          setInlineViewer,
          usedNativeViewer,
          wrapper: videoWrapperRef,
        }}
      >
        <VideoPlayer ref={playerRef} />
        {/* The cover belongs to the inline module only — in the fullscreen
            viewer it would cover the video the moment playback is paused. */}
        {!isPlaying && !isFullscreen && (
          <VideoCoverImage
            data={cover}
            sizes={imageSizes}
            priority={priority}
            quality={imageQuality}
          />
        )}
      </VideoContext.Provider>
    </Box>
  ) : null;
};

export default Video;
