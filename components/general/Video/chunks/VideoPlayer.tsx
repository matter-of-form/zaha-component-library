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

const VideoPlayer: FC<any> = forwardRef((_props, ref) => {
  const {
    data,
    inlineViewer,
    isFullscreen,
    isMuted,
    isPlaying,
    onAutoPlayStarted,
    onNativeViewerExit,
    onPlayerReady,
    setIsMuted,
    setIsPlaying,
    setInit,
    setInlineViewer,
    usedNativeViewer,
    wrapper,
  } = useContext(VideoContext);

  const { width, height } = useDimensions(wrapper);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const player = useRef<Player>();
  const initAttempts = useRef(0);
  const mutedRef = useRef(isMuted);
  const onPlayerReadyRef = useRef(onPlayerReady);
  const onAutoPlayStartedRef = useRef(onAutoPlayStarted);
  const onNativeViewerExitRef = useRef(onNativeViewerExit);
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
    onNativeViewerExitRef.current = onNativeViewerExit;
  }, [onPlayerReady, onAutoPlayStarted, onNativeViewerExit]);

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

  // Player creation — only re-run when the source changes, not on mute or
  // callback changes. There is exactly one instance per module: the fullscreen
  // viewer reuses it rather than spinning up a second copy of the same video.
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
      background: data.autoPlay,
      loop: data.loop,
      controls: false,
      // Always created muted so autoplay is permitted; the real audio state is
      // applied on ready and whenever `isMuted` changes.
      muted: true,
      // Required for the ambient loop to autoplay on iOS. The device's own
      // player is opened explicitly via the API where the Fullscreen API is
      // unavailable, so this never blocks the fullscreen handoff.
      playsinline: true,
      dnt: true,
      pip: false,
    });

    // Only fires for the iPhone handoff — elsewhere the wrapper goes fullscreen
    // and the document-level event does the work.
    const handleNativeViewerChange = ({ fullscreen }: any) => {
      if (fullscreen || !usedNativeViewer?.current) return;
      onNativeViewerExitRef.current && onNativeViewerExitRef.current();
    };

    player.current.on("fullscreenchange", handleNativeViewerChange);

    player.current.ready().then(() => {
      initAttempts.current = 0; // reset on success
      player.current?.setMuted(mutedRef.current).catch(console.warn);
      onPlayerReadyRef.current && onPlayerReadyRef.current();

      // Read the iframe out of this instance's own container — `backgroundPlayer`
      // is not a unique id once a page has several videos.
      const iframe = containerRef.current?.getElementsByTagName("iframe")[0];

      handleResize();

      if (iframe) {
        setInlineViewer(iframe);
        iframe.style.width = "100%";
        iframe.style.height = "100%";
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
      player.current?.off("fullscreenchange", handleNativeViewerChange);
      player.current?.destroy();
      player.current = undefined;
    };
  }, [data?.src]); // Only recreate the player when the video source changes

  // Handle mute changes without recreating the player
  useEffect(() => {
    mutedRef.current = isMuted;
    player.current?.setMuted(isMuted).catch(console.warn);
  }, [isMuted]);

  useEffect(() => {
    handleResize();
  }, [wrapper.current, width, height, inlineViewer, isFullscreen]);

  const handleResize = async () => {
    if (!player.current || !wrapper.current) return;

    const w = await player.current.getVideoWidth();
    const h = await player.current.getVideoHeight();

    if (!w || !h) return;

    // In fullscreen the wrapper is the screen-sized element itself; inline it
    // is stretched to its parent, which is the box the video has to fill.
    const container = isFullscreen
      ? wrapper.current
      : wrapper.current.parentElement || wrapper.current;

    if (!container.offsetWidth) return;

    const videoAspect = h / w;
    const parentAspect = container.offsetHeight / container.offsetWidth;

    // Inline the video covers its box (cropping the overflow); in fullscreen it
    // is letterboxed so the whole frame is visible.
    const overflowWidth = isFullscreen
      ? parentAspect <= videoAspect
      : parentAspect > videoAspect;

    if (overflowWidth) {
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

  // The scrubber only exists in the fullscreen overlay
  useEffect(() => {
    if (!isFullscreen) return;

    getCurrentTime();
    const progressInterval = setInterval(getCurrentTime, 1000);

    return () => {
      clearInterval(progressInterval);
    };
  }, [isFullscreen]);

  function togglePlay(e: any) {
    e.stopPropagation();

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
      setIsMuted(!muted);
      player.current?.setMuted(!muted).catch((e) => console.warn(e));
    });
  }

  return (
    <>
      <div id="backgroundPlayer" style={{ ...playerDimensions }}>
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
