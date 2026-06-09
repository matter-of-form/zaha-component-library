"use client";
import Player from "@vimeo/player";
import {
  FC,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useDimensions } from "../../../../hooks";
import { videoContainer } from "../Video.styles";
import { VideoContext, VideoControls } from "./";

const MAX_INIT_ATTEMPTS = 3;

const VideoPlayer: FC<any> = forwardRef(({ isInline = true }: any, ref) => {
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
  const initAttempts = useRef(0);
  const onPlayerReadyRef = useRef(onPlayerReady);
  const onAutoPlayStartedRef = useRef(onAutoPlayStarted);
  useImperativeHandle(ref, () => player.current!);

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

  // Keep callback refs up to date without triggering player recreation
  useEffect(() => {
    onPlayerReadyRef.current = onPlayerReady;
    onAutoPlayStartedRef.current = onAutoPlayStarted;
  }, [onPlayerReady, onAutoPlayStarted]);

  function getCurrentTime() {
    Promise.all([
      player.current?.getCurrentTime(),
      player.current?.getBuffered(),
    ]).then(([currentTime, buffered]) => {
      if (currentTime !== undefined && buffered !== undefined) {
        if (buffered[0]) {
          setProgress({ played: currentTime, loaded: buffered[0][1] });
        }
      }
    });
  }

  // Player creation — only re-run when src or inline mode changes, not on mute/callback changes
  useEffect(() => {
    if (isNaN(data?.src)) {
      console.error(`'${data?.src}' is not a valid vimeo ID`);
      return;
    }

    if (initAttempts.current >= MAX_INIT_ATTEMPTS) {
      console.warn(`Vimeo player for ID ${data?.src} failed after ${MAX_INIT_ATTEMPTS} attempts, giving up.`);
      return;
    }

    initAttempts.current += 1;

    player.current = new Player(containerRef?.current!, {
      id: data?.src,
      autoplay: data.autoPlay,
      background: isInline && isMuted,
      loop: data.loop,
      controls: false,
      muted: true,
      playsinline: isInline || isFullscreen,
      dnt: true,
      pip: false,
    });

    player.current.ready().then(() => {
      initAttempts.current = 0; // reset on success
      onPlayerReadyRef.current && onPlayerReadyRef.current();

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
    }).catch((e) => {
      console.error(`Vimeo player ready failed for ID ${data?.src}:`, e);
    });

    if (data.autoPlay) {
      player.current
        .play()
        .then(() => {
          onAutoPlayStartedRef.current && onAutoPlayStartedRef.current();
          setInit(false);
          setIsPlaying(true);
        })
        .catch((e) => console.error(e));
    }

    player.current.getDuration().then((duration) => setDuration(duration));

    return () => {
      player.current?.destroy();
      player.current = undefined;
    };
  }, [data?.src, isInline]); // Only recreate player when video source or inline mode changes

  // Handle mute changes without recreating the player
  useEffect(() => {
    player.current?.setMuted(isMuted);
  }, [isMuted]);

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
});

VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;
