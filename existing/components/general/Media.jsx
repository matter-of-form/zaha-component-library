import React, { useRef, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { ResponsiveImage, VimeoPlayer } from "components";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { selectIsRobot } from "store/index";

const Media = forwardRef(function Media(
  {
    media,
    widths,
    heights,
    preload,
    cdnProps,
    dataNotLazy,
    imgProps,
    cover,
    controls,
    muted,
    className,
    onPayerReady,
    onAutoPlayStarted,
    ...props
  },
  ref,
) {
  const isRobot = useSelector(selectIsRobot);

  const vimeo = useRef();

  useImperativeHandle(ref, () => {
    return {
      openFullscreen() {
        if (media.vimeoId) {
          vimeo?.current?.openFullscreen();
        }
      },
      play() {
        if (media.vimeoId) {
          vimeo?.current?.play();
        }
      },
      pause() {
        if (media.vimeoId) {
          vimeo?.current?.pause();
        }
      },
    };
  }, [media]);

  if (!media) {
    return null;
  }

  return (
    <div
      className={classNames(
        "w-full h-full relative overflow-hidden",
        className,
      )}
      {...props}
    >
      {media.coverImage && (
        <ResponsiveImage
          image={media.coverImage}
          widths={widths}
          heights={heights}
          preload={preload}
          cdnProps={cdnProps}
          dataNotLazy={dataNotLazy}
          imgProps={imgProps}
          className="object-cover"
        />
      )}
      {!isRobot &&
        (media.videoFromGallery || media.vimeoId || media.youtubeId) &&
        (media.vimeoId ? (
          <VimeoPlayer
            ref={vimeo}
            media={media}
            cover={cover}
            controls={controls}
            onPayerReady={onPayerReady}
            onAutoPlayStarted={onAutoPlayStarted}
            muted={muted}
          />
        ) : null)}
    </div>
  );
});

Media.propTypes = {
  media: PropTypes.object.isRequired,
  widths: PropTypes.object,
  heights: PropTypes.object,
  preload: PropTypes.bool,
  cdnProps: PropTypes.object,
  dataNotLazy: PropTypes.bool,
  imgProps: PropTypes.object,
  cover: PropTypes.bool,
  controls: PropTypes.bool,
};

export default Media;
