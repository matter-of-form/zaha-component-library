import classNames from "classnames";

export const videoWrapper = (
  isPlaying: boolean,
  isAutoPlay: boolean,
  allowFullscreen: boolean,
  isFullscreen: boolean,
  init: boolean,
) => ({
  className: classNames(
    "video-wrapper",
    { playing: isPlaying },
    { autoplay: isAutoPlay && !allowFullscreen },
    { "fullscreen-enabled": allowFullscreen },
    { "fullscreen-active": isFullscreen },
    { started: !init },
  ),
  style: {
    width: "100%",
    height: "100%",
  },
});

export const videoContainer = {
  style: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
};

export const videoControls = (isPlaying: boolean, hasStarted: boolean) => ({
  className: classNames(
    "video-controls",
    { playing: isPlaying },
    { started: hasStarted },
  ),
});

export const videoControlsToolbar = {
  className: classNames("video-controls-toolbar"),
};

export const videoControlsToolbarButtons = {
  className: classNames("video-controls-toolbar-buttons"),
};

export const videoTimeline = {
  className: classNames("video-timeline"),
};

export const videoProgress = (progress: number) => ({
  className: classNames("video-timeline-progress"),
  style: {
    width: `${progress * 100}%`,
  },
  // layoutId: 'video-timeline-progress',
  // transition: {
  //   type: 'spring',
  //   stiffness: 500,
  //   damping: 50,
  // },
});

export const videoLoadedProgress = (progress: number) => ({
  className: classNames("video-timeline-loaded"),

  style: {
    width: `${progress * 100}%`,
  },
  // layoutId: 'video-timeline-loaded',
  // transition: {
  //   type: 'spring',
  //   stiffness: 500,
  //   damping: 50,
  // },
});

export const videoTimer = {
  className: classNames("video-timer"),
};
