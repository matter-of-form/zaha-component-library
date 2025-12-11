import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import Player from "@vimeo/player";
import { useLayoutEffect } from "utils";

const VimeoPlayer = forwardRef(function VimeoPlayer(
  { media, cover, controls, onPayerReady, onAutoPlayStarted, ...props },
  ref,
) {
  const root = useRef();
  const container = useRef();

  let player = useRef();
  let fullscreen = useRef();
  const [vimeoReady, setVimeoReady] = useState(false);

  const [videobgWidth, setVideobgWidth] = useState("100%");
  const [videobgHeight, setVideobgHeight] = useState("100%");

  useEffect(() => {
    if (!isNaN(media.vimeoId)) {
      player.current = new Player(container.current, {
        id: media.vimeoId,
        autoplay: media.autoPlay,
        background: media.autoPlay,
        loop: media.loop,
        controls: controls,
        dnt: true,
      });

      if (media.autoPlay && onAutoPlayStarted) {
        player.current.play().then(() => {
          onAutoPlayStarted();
        });
      }

      player.current.ready().then(() => {
        setVimeoReady(true);
        if (onPayerReady) {
          onPayerReady();
        }
      });
    } else {
      console.error(`'${media.vimeoId}' is not a valid vimeo ID`);
    }
  }, [onPayerReady, onAutoPlayStarted, media, controls]);

  useImperativeHandle(ref, () => {
    const monitorFullScreen = () => {
      if (
        document.fullScreen ||
        document.mozFullScreen ||
        document.webkitIsFullScreen
      ) {
        setTimeout(() => {
          monitorFullScreen();
        }, 100);
      } else {
        if (fullscreen.current) {
          fullscreen.current = false;
        }
      }
    };

    return {
      openFullscreen() {
        if (
          (media.allowFullScreen === undefined ||
            media.allowFullScreen === true) &&
          !fullscreen.current &&
          player.current
        ) {
          fullscreen.current = true;
          player.current.requestFullscreen();
          player.current.play();
          setTimeout(() => {
            monitorFullScreen();
          }, 1000);
        }
      },
    };
  }, [media]);

  useLayoutEffect(() => {
    if (vimeoReady && cover) {
      videobgEnlarge();
      window.addEventListener("resize", videobgEnlarge);
      return () => window.removeEventListener("resize", videobgEnlarge);
    }
  }, [vimeoReady, cover]);

  const videobgEnlarge = () => {
    if (
      root.current.getElementsByTagName("iframe") &&
      root.current.getElementsByTagName("iframe")[0]
    ) {
      const iframe = root.current.getElementsByTagName("iframe")[0];
      const videoAspect = iframe.height / iframe.width;
      const parentAspect =
        root.current.parentElement.offsetHeight /
        root.current.parentElement.offsetWidth;

      if (parentAspect > videoAspect) {
        setVideobgWidth((parentAspect / videoAspect) * 100 + "%");
        setVideobgHeight("100%");
      } else {
        setVideobgWidth("100%");
        setVideobgHeight((videoAspect / parentAspect) * 100 + "%");
      }
    }
  };

  if (!media) {
    return null;
  }

  return (
    <div
      ref={root}
      className="absolute w-full h-full top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4"
      style={{ width: videobgWidth, height: videobgHeight }}
    >
      <div
        className="vimeo w-full h-full [&_iframe]:w-full [&_iframe]:h-full"
        ref={container}
        {...props}
      />
    </div>
  );
});

VimeoPlayer.propTypes = {
  media: PropTypes.object.isRequired,
  cover: PropTypes.bool,
  controls: PropTypes.bool,
};

export default VimeoPlayer;
