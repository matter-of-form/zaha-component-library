"use client";
import { FC, useContext, useRef } from "react";
import { Box, Button, Stack, Text } from "../../../";
import { VideoContext } from "./";
import { secondsToHMS } from "../../../../utils";
import { useDimensions } from "../../../../hooks";
import {
  videoControls,
  videoControlsToolbar,
  videoControlsToolbarButtons,
  videoLoadedProgress,
  videoProgress,
  videoTimeline,
  videoTimer,
} from "../Video.styles";
import { isMobile } from "react-device-detect";

const VideoControls: FC<any> = ({
  toggleMute,
  togglePlay,
  progress,
  duration,
  playerRef,
}) => {
  const {
    data,
    handleFullscreen,
    init,
    isFullscreen,
    isMuted,
    isPlaying,
    setIsFullscreen,
    setIsMuted,
    setIsPlaying,
  } = useContext(VideoContext);
  const timelineRef = useRef(null);
  const { x, width } = useDimensions(timelineRef);

  if (!data?.allowControls) return null;

  const handleClose = () => {
    setIsFullscreen(false);
    setIsMuted(true);
    setIsPlaying(false);
  };

  const handleSeek = ({ target: { value: pos } }: any) => {
    const player: any = playerRef.current;
    if (player) {
      const scrubPos = (pos * duration) / 100;
      player.setCurrentTime(scrubPos);
    }
  };

  if (isFullscreen) {
    return (
      <Box {...videoControls(isPlaying, !init)}>
        <Button onClick={handleClose} variant="videoClose" />
        <Stack direction="column" {...videoControlsToolbar}>
          <Box ref={timelineRef} {...videoTimeline}>
            <input type="range" onInput={(e) => handleSeek(e)} />
            <Box {...videoProgress(progress?.played / duration)} />
            <Box {...videoLoadedProgress(progress?.loaded / duration)} />
          </Box>
          <Stack {...videoControlsToolbarButtons}>
            <Button
              onClick={togglePlay}
              variant={
                isMobile
                  ? "videoFullscreenPlay"
                  : isPlaying
                    ? "videoFullscreenPause"
                    : "videoFullscreenPlay"
              }
            />
            <Button
              onClick={toggleMute}
              variant={
                isMuted ? "videoFullscreenMute" : "videoFullscreenUnMute"
              }
            />
            <Text
              text={`<span class="timer-elapsed">${secondsToHMS(
                progress?.played,
              )}</span> / <span class="timer-duration">${secondsToHMS(
                duration,
              )}</span>`}
              {...videoTimer}
            />
          </Stack>
        </Stack>
      </Box>
    );
  }

  return (
    <Box {...videoControls(isPlaying, !init)}>
      <Button
        onClick={toggleMute}
        variant={isMuted ? "videoUnMute" : "videoMute"}
      />
      <Button
        onClick={togglePlay}
        variant={isPlaying ? "videoPause" : "videoPlay"}
      />
      <Button onClick={handleFullscreen} variant="videoFullscreen" />
    </Box>
  );
};

export default VideoControls;
