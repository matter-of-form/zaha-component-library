import { TextProps } from "../../../components";
export interface MediaProps {
  data: any;
  imageSizes?: string;
  responsive?: boolean;
  priority?: boolean;
  align?: "left" | "right" | "center" | null;
  orientation?: "portrait" | "landscape" | null;
  size?: "sm" | "md" | "lg" | "full" | null;
  captionTextStyle?: TextProps["textStyle"];
  cardVariant?: any;
  onAutoPlayStarted?: any;
  onPlayerReady?: any;
  imageQuality?: any;
  className?: string;
  disablePlaceholder?: boolean;
  usePhotographerAsCredit?: boolean;
}
