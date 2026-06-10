import { FC } from "react";
import { Box, ModuleBase, Card } from "../../components";
import { RichTextAndTwoMediaModuleProps } from "./RichTextAndTwoMediaModule.types";
import { richTextWithMedia } from "./RichTextAndTwoMediaModule.styles";

const RichTextAndTwoMediaModule: FC<RichTextAndTwoMediaModuleProps> = ({
  data,
  imageSizes,
  imageQuality,
  backgroundImageSizes,
  backgroundImageQuality,
  imagePriority = false,
  moduleAnims,
  variant = "richTextAndTwoMedia",
  ...props
}) => {
  const newData = Object.assign(data, {
    image: data.smallMedia,
    backgroundImage: data.largeMedia,
  });

  return (
    <ModuleBase
      data={newData}
      {...richTextWithMedia(props)}
      {...moduleAnims?.module}
    >
      <Box>
        <Card
          variant={variant}
          data={data}
          childAnims={moduleAnims}
          imageSizes={imageSizes}
          imageQuality={imageQuality}
          backgroundImageSizes={backgroundImageSizes}
          backgroundImageQuality={backgroundImageQuality}
          priority={imagePriority}
          richText
        />
      </Box>
    </ModuleBase>
  );
};

export default RichTextAndTwoMediaModule;
