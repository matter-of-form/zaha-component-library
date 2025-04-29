"use client";
import { FC, useEffect, useContext, useRef, useState } from "react";
import { VideoContext, VideoControls } from "./";
import { useDimensions } from "../../../../hooks";
import ReactPlayer from "react-player/lazy";
import { useInView } from "framer-motion";

const VideoPlayer: FC<any> = ({ isInline = true }: any) => {
  const {
    data,
    fullViewer,
    inlineViewer,
    isFullscreen,
    isMuted,
    isPlaying,
    onAutoPlayStarted,
    onPlayerReady,
    setFullViewer,
    setIsMuted,
    setIsPlaying,
    setInit,
    setInlineViewer,
    wrapper,
  } = useContext(VideoContext);
  const inView = useInView(wrapper);
  const { width, height } = useDimensions(wrapper);
  const [progress, setProgress] = useState(null);
  const [duration, setDuration] = useState(null);
  const [playerDimensions, setPlayerDimensions] = useState({
    vidWidth: 640,
    vidHeight: 390,
    aspect: 1,
    container: null,
  });
  const vidWrapper = wrapper.current;
  const playerRef = useRef(null);

  let vidSrc = data?.src;
  const vidType = data?.type;
  if (vidType === "vimeo") vidSrc = `https://vimeo.com/${vidSrc}`;
  if (vidType === "youtube")
    vidSrc = `https://www.youtube.com/watch?v=${data?.vidSrc}`;

  useEffect(() => {
    handleResize();
  }, [vidWrapper, width, height, inlineViewer]);

  const handleResize = () => {
    if (vidWrapper) {
      const { aspect } = playerDimensions;
      const vidHolder = vidWrapper.querySelector("#backgroundPlayer");

      let containerWidth = width;
      let containerHeight = width * 10;

      if (height * aspect > width) {
        containerWidth = height * 10;
        containerHeight = height;
      }

      if (vidHolder) {
        // + 2 gives a pixel grace either side.
        vidHolder.style.width = `${Math.ceil(containerWidth + 2)}px`;
        vidHolder.style.height = `${Math.ceil(containerHeight + 2)}px`;
      }
    }
  };

  useEffect(() => {
    if (data?.autoPlay) {
      if (inView) {
        setInit(false);
        setTimeout(() => setIsPlaying(true), 500);
        onAutoPlayStarted && onAutoPlayStarted();
      }
    }
  }, [data?.autoPlay, inView, onAutoPlayStarted]);

  const handleReady = () => {
    onPlayerReady && onPlayerReady();

    if (vidWrapper && isInline) {
      const container: any = vidWrapper.getElementsByTagName("iframe")[0];
      const vidWidth = container?.width;
      const vidHeight = container?.height;

      setPlayerDimensions({
        vidWidth,
        vidHeight,
        aspect: vidWidth / vidHeight,
        container,
      });

      if (container) {
        setInlineViewer(container);
      }
    } else {
      const fullPlayer = document.getElementById("fullPlayer");
      const container = fullPlayer?.getElementsByTagName("iframe")[0];
      setFullViewer(container);
    }
  };

  const updateProgress = (progress: any) => {
    if (!isInline) {
      setProgress(progress);
    }
  };

  const getDuration = (duration: any) => {
    if (!isInline) {
      setDuration(duration);
    }
  };

  const togglePlay = (e: any) => {
    e.stopPropagation();

    isInline
      ? (inlineViewer.playing = !isPlaying)
      : (fullViewer.playing = !isPlaying);
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e: any) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const skipRender = !vidSrc || (isFullscreen && isInline);

  return skipRender ? null : (
    <>
      <ReactPlayer
        ref={playerRef}
        id={isInline ? "backgroundPlayer" : "fullPlayer"}
        url={vidSrc}
        playing={isPlaying}
        onReady={handleReady}
        controls={false}
        muted={isMuted}
        onProgress={updateProgress}
        onDuration={getDuration}
        // autoPlay={data?.autoPlay && isInline}
        playsinline={isInline}
        progressInterval={isInline ? 2000 : 100}
        loop={data?.loop}
        volume={isMuted ? 0 : 1}
        width="100%"
        height="100%"
        config={{
          vimeo: {
            playerOptions: {
              background: isInline && isMuted,
            },
          },
        }}
      />
      <VideoControls
        {...{ togglePlay, toggleMute, progress, duration, playerRef }}
      />
    </>
  );
};

export default VideoPlayer;
