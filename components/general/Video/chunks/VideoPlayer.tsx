"use client";
import Player from "@vimeo/player";
import { useInView } from "framer-motion";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { useDimensions } from "../../../../hooks";
import { videoContainer } from "../Video.styles";
import { VideoContext, VideoControls } from "./";

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

  const { width, height } = useDimensions(wrapper);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const player = useRef<Player>();
  // const fullscreen = useRef<boolean>(false);
  const [playerDimensions, setPlayerDimensions] = useState<{
    width: string;
    height: string;
  }>({
    width: "100%",
    height: "100%",
  });
  const [progress, setProgress] = useState<{
    played: number | undefined;
    loaded: number | undefined;
  }>({
    played: 0,
    loaded: 0,
  });
  const [duration, setDuration] = useState<number>(0);

  function getCurrentTime() {
    Promise.all([
      player.current?.getCurrentTime(),
      player.current?.getBuffered(),
    ]).then(([currentTime, buffered]) => {
      if (currentTime !== undefined && buffered !== undefined) {
        if (buffered[0]) {
          setProgress({ played: currentTime, loaded: buffered[0][1] });
        }
        // console.log(buffered[0][1]);
      }
    });
  }

  useEffect(() => {
    if (!isNaN(data?.src)) {
      player.current = new Player(containerRef?.current!, {
        id: data?.src,
        autoplay: data.autoPlay,
        background: isInline && isMuted,
        loop: data.loop,
        controls: false,
        muted: true,
        playsinline: isInline,
        dnt: true,
        pip: false,
      });

      player.current.ready().then(() => {
        onPlayerReady && onPlayerReady();

        if (containerRef.current && isInline) {
          const iframe: HTMLIFrameElement =
            containerRef.current.getElementsByTagName("iframe")[0];

          handleResize();

          if (iframe) {
            setInlineViewer(iframe);

            iframe.style.width = "100%";
            iframe.style.height = "100%";
          }
        } else {
          const fullPlayer = document.getElementById("fullPlayer");
          const iframe = fullPlayer?.getElementsByTagName("iframe")[0];

          if (iframe) {
            setFullViewer(iframe);

            iframe.style.width = "100%";
            iframe.style.height = "100%";
          }
        }
      });

      if (data.autoPlay) {
        player.current
          .play()
          .then(() => {
            onAutoPlayStarted && onAutoPlayStarted();
            setInit(false);
            setIsPlaying(true);
          })
          .catch((e) => console.error(e));
      }

      player.current.getDuration().then((duration) => setDuration(duration));
    } else {
      console.error(`'${data?.src}' is not a valid vimeo ID`);
    }
  }, [
    onPlayerReady,
    onAutoPlayStarted,
    data,
    isMuted,
    isInline,
    containerRef,
    wrapper,
  ]);

  useEffect(() => {
    handleResize();
  }, [wrapper.current, width, height, inlineViewer]);

  const handleResize = async () => {
    if (!player.current) return;

    const w = await player.current.getVideoWidth();
    const h = await player.current.getVideoHeight();

    const videoAspect = h / w;
    const parentAspect =
      wrapper.current.parentElement.offsetHeight /
      wrapper.current.parentElement.offsetWidth;

    if (parentAspect > videoAspect) {
      setPlayerDimensions({
        width: (parentAspect / videoAspect) * 100 + "%",
        height: "100%",
      });
    } else {
      setPlayerDimensions({
        width: "100%",
        height: (videoAspect / parentAspect) * 100 + "%",
      });
    }
  };

  useEffect(() => {
    if (isInline) return;

    getCurrentTime();
    const progressInterval = setInterval(getCurrentTime, 1000);

    return () => {
      clearInterval(progressInterval);
    };
  }, [player]);
  // const monitorFullScreen = () => {
  //   if (
  //     document.fullscreen ||
  //     document.mozFullScreen ||
  //     document.webkitIsFullScreen
  //   ) {
  //     setTimeout(() => {
  //       monitorFullScreen();
  //     }, 100);
  //   } else {
  //     if (fullscreen.current) {
  //       fullscreen.current = false;
  //     }
  //   }
  // };

  // function openFullscreen() {
  //   if (
  //     (data.allowFullScreen === undefined || data.allowFullScreen === true) &&
  //     !fullscreen.current &&
  //     player.current
  //   ) {
  //     fullscreen.current = true;
  //     player.current.requestFullscreen();
  //     player.current.play();
  //     setIsPlaying(true);
  //     setTimeout(() => {
  //       monitorFullScreen();
  //     }, 1000);
  //   }
  // }
  function togglePlay(e: any) {
    e.stopPropagation();

    isInline
      ? (inlineViewer.playing = !isPlaying)
      : (fullViewer.playing = !isPlaying);

    if (isPlaying) {
      setIsPlaying(false);
      player.current?.pause().catch((e) => console.warn(e));
    } else {
      setIsPlaying(true);
      player.current?.play().catch((e) => console.warn(e));
    }
  }

  function toggleMute(e: any) {
    e.stopPropagation();

    player.current?.getMuted().then((muted) => {
      if (muted) {
        setIsMuted(false);
        player.current?.setMuted(false);
      } else {
        setIsMuted(true);
        player.current?.setMuted(true);
      }
    });
  }

  return (
    <>
      <div
        id={isInline ? "backgroundPlayer" : "fullPlayer"}
        style={{ ...playerDimensions }}
      >
        <div ref={containerRef} {...videoContainer} />
      </div>
      <VideoControls
        {...{ togglePlay, toggleMute, progress, duration, playerRef: player }}
      />
    </>
  );
};

export default VideoPlayer;
