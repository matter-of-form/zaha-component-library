import { createContext } from "react";

export const VideoContext = createContext({} as any);

export { default as VideoControls } from "./VideoControls";
export { default as VideoCoverImage } from "./VideoCoverImage";
export { default as VideoPlayer } from "./VideoPlayer";
