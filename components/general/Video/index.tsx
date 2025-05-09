"use client";
import { useRef, FC, Suspense, useState } from "react";
import { Box } from "../../";
import { videoWrapper } from "./Video.styles";
import {
  VideoContext,
  VideoCoverImage,
  VideoFullscreen,
  VideoPlayer,
} from "./chunks";
import "./Video.css";

type VideoProps = {
  data: {
    image: {
      src: string;
      alt?: string;
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

const Video: FC<VideoProps> = ({
  data,
  imageSizes,
  priority = "false",
  onPlayerReady,
  onAutoPlayStarted,
  imageQuality,
}: VideoProps) => {
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [inlineViewer, setInlineViewer] = useState<any>(null);
  const [fullViewer, setFullViewer] = useState<any>(null);
  const [init, setInit] = useState(true);
  const { image: cover, video } = data;

  const handleFullscreen = (e?: any) => {
    if (!video?.allowFullscreen) return;

    setIsMuted(false);
    setIsFullscreen(true);
    setTimeout(() => setIsPlaying(true), 250);

    e && e.stopPropagation();
  };

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
          fullViewer,
          handleFullscreen,
          isMuted,
          isFullscreen,
          isPlaying,
          inlineViewer,
          onAutoPlayStarted,
          onPlayerReady,
          setFullViewer,
          setInit,
          setIsFullscreen,
          setIsMuted,
          setIsPlaying,
          setInlineViewer,
          wrapper: videoWrapperRef,
        }}
      >
        <VideoPlayer />
        {!isPlaying && (
          <VideoCoverImage
            data={cover}
            sizes={imageSizes}
            priority={priority}
            quality={imageQuality}
          />
        )}
        <VideoFullscreen isFullscreen={isFullscreen} />
      </VideoContext.Provider>
    </Box>
  ) : null;
};

export default Video;
