import { BoxProps } from "../../components";

export interface BannerFullBleedModuleProps extends BoxProps {
  data: any;
  moduleAnims?: any;
  backgroundImageSizes?: any;
  backgroundImageQuality?: number;
  imagePriority?: boolean;
  cardVariant?: string;
}
