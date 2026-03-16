import { FC } from "react";
import { Card, ModuleBase } from "../../components";
import { ArticleHeroModuleProps } from "./ArticleHeroModule.types";
import { articleHero } from "./ArticleHeroModule.styles";

const ArticleHeroModule: FC<ArticleHeroModuleProps> = ({
  data,
  moduleAnims,
  backgroundImageSizes,
  backgroundImageQuality,
  imagePriority,
  variant = "articleHero",
  children,
  ...props
}) => {
  const newData = Object.assign(data, {
    headingTitle: data.heading || data.headingTitle,
    primaryCta: data.cta || data.primaryCta,
  });

  const colourString = data?.colourCodes && data?.colourCodes.join("-");

  return (
    <ModuleBase
      {...articleHero(props, data?.backgroundImage, colourString)}
      data={newData}
      {...moduleAnims?.module}
    >
      <Card
        data={data}
        variant={variant}
        backgroundImageSizes={backgroundImageSizes}
        backgroundImageQuality={backgroundImageQuality}
        priority={imagePriority}
        childAnims={moduleAnims?.card}
        richText
      >
        {children}
      </Card>
    </ModuleBase>
  );
};

export default ArticleHeroModule;
