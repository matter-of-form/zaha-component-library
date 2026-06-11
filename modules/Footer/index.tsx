import { FC } from "react";
import { Media, ModuleBase, Stack, Text } from "../../components";
import { FooterProps } from "./Footer.types";
import { FooterBottomLinks, FooterSocialLinks, FooterTopLinks } from "./chunks";
import {
  backgroundHolder,
  bottomWrapper,
  copyright,
  disclaimer,
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
  // The Text sanitizer strips inline `style`, which would drop the disclaimer's
  // intended alignment. Pull just `text-align` back out of the raw HTML and
  // re-apply it as a safe inline style on the wrapper.
  const infoTextAlign = data?.infoText?.match(
    /text-align:\s*(left|center|right|justify)/i,
  )?.[1] as "left" | "center" | "right" | "justify" | undefined;

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
        {data?.infoText && (
          <Text
            text={data?.infoText}
            {...disclaimer(moduleAnims?.disclaimer, textStyles?.disclaimer)}
            style={infoTextAlign ? { textAlign: infoTextAlign } : undefined}
            rich
          />
        )}

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
