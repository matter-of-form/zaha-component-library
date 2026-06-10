import { FC } from "react";
import { Card, ModuleBase } from "../../components";
import { RichTextAndTwoMediaStackedModuleProps } from "./RichTextAndTwoMediaStackedModule.types";
import { richTextAndTwoMedia } from "./RichTextAndTwoMediaStackedModule.styles";

const RichTextAndTwoMediaStackedModule: FC<
  RichTextAndTwoMediaStackedModuleProps
> = ({
  data,
  moduleAnims,
  imageSizes,
  imageQuality,
  backgroundImageSizes,
  backgroundImageQuality,
  imagePriority = false,
  smallImageSizes,
  ...props
}) => {
  return (
    <ModuleBase
      {...richTextAndTwoMedia(data, props)}
      data={data}
      {...moduleAnims?.module}
    >
      <Card
        data={data}
        variant="richTextAndTwoMediaStacked"
        childAnims={moduleAnims}
        imageQuality={imageQuality}
        imageSizes={imageSizes}
        backgroundImageQuality={backgroundImageQuality}
        backgroundImageSizes={backgroundImageSizes}
        priority={imagePriority}
        richText
      />
    </ModuleBase>
  );
};

export default RichTextAndTwoMediaStackedModule;
