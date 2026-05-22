import { FC } from "react";
import { Media, ModuleBase, Stack, Text } from "../../components";
import { FooterProps } from "./Footer.types";
import { FooterBottomLinks, FooterSocialLinks, FooterTopLinks } from "./chunks";
import {
  backgroundHolder,
  bottomWrapper,
  copyright,
  logoWrapper,
  topWrapper,
} from "./Footer.styles";

const Footer: FC<FooterProps> = ({
  data,
  moduleAnims,
  logoImageSizes,
  backgroundImageSizes,
  backgroundPriority = false,
  logoPriority = false,
  socialIcons,
  textStyles,
  ...props
}) => {
  return (
    <ModuleBase
      data={data}
      {...props}
      {...moduleAnims?.module}
      variant="footer"
    >
      <Stack {...topWrapper(moduleAnims?.topWrapper)}>
        <Media
          data={data?.logo}
          imageSizes={logoImageSizes}
          {...logoWrapper(moduleAnims?.logo)}
          responsive
          priority={logoPriority}
          disablePlaceholder
        />
        <FooterTopLinks
          data={data?.upperLinks}
          motion={moduleAnims?.topLinks}
          textStyle={textStyles?.topLinks}
        />
      </Stack>
      <Stack {...bottomWrapper(moduleAnims?.bottomWrapper)}>
        <FooterSocialLinks
          data={data?.socialMediaLinks}
          icons={socialIcons}
          motion={moduleAnims?.socialLinks}
        />
        <FooterBottomLinks
          data={data?.bottomLinks}
          motion={moduleAnims?.bottomLinks}
          textStyle={textStyles?.bottomLinks}
        />
        <Text
          text={data?.copyrightText}
          {...copyright(moduleAnims?.copyright, textStyles?.copyright)}
        />
      </Stack>
      <Media
        data={data?.backgroundImage}
        imageSizes={backgroundImageSizes}
        {...backgroundHolder(moduleAnims?.background)}
        responsive
        priority={backgroundPriority}
      />
    </ModuleBase>
  );
};

export default Footer;
