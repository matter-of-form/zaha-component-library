import { createContext } from "react";

export const CarouselContext = createContext({} as any);

export { default as CarouselControls } from "./CarouselControls";
export { default as CarouselItem } from "./CarouselItem";
export { default as CarouselPagination } from "./CarouselPagination";
export { default as CarouselWrapper } from "./CarouselWrapper";
