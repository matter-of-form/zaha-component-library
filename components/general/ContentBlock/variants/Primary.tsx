import { FC } from "react";
import {
  contentBlockVars,
  renderButton,
  renderText,
  contentInfoTags,
  preContent,
} from "../ContentBlock.styles";
import { ContentBlockContentProps } from "../ContentBlock.types";
import { ButtonGroup, Stack, Text } from "../../../../components";
import { emptyContentBlockAnim } from "../../../../theme/animations";

const PrimaryContentBlock: FC<ContentBlockContentProps> = ({
  variant,
  className,
  data,
  childAnims = emptyContentBlockAnim,
  richText = false,
  ...props
}) => {
  const allProps = {
    ...contentBlockVars(variant, childAnims, className),
    ...props,
  };

  const infoTags =
    data?.infoTags && Array.isArray(data?.infoTags) ? data?.infoTags : [];

  const renderTags = infoTags.map((val, i: number) => {
    return <Text key={`infotag${i}`} text={val} {...renderText("infoTag")} />;
  });

  const heading =
    data?.title || data?.headingTitle?.heading || data?.headingTitle || "";
  const htag = data?.headingTitle?.htag
    ? { htag: data?.headingTitle?.htag }
    : {};

  const hasButtons = data?.primaryCta || data?.secondaryCta || data?.cta;
  const primaryCta = data?.primaryCta || data?.cta || {};

  return (
    <Stack direction="column" {...allProps}>
      <Stack direction="row" {...preContent(childAnims?.preContent)}>
        <Text text={data?.tag} {...renderText("tag")} />
        <Text text={data?.preHeading} {...renderText("preHeading")} />
        <Stack {...contentInfoTags(childAnims?.infoTags)}>{renderTags}</Stack>
      </Stack>
      <Text text={heading} {...htag} {...renderText("headingTitle")} />
      <Text
        text={data?.subHeading || data?.subheading}
        {...renderText("subHeading")}
      />
      <Text
        text={data?.description || data?.content}
        rich={richText}
        {...renderText("description")}
      />
      {hasButtons && (
        <ButtonGroup
          primaryProps={{
            ...renderButton("primaryCta"),
            ...primaryCta,
          }}
          secondaryProps={{
            ...renderButton("secondaryCta"),
            ...data?.secondaryCta,
          }}
        />
      )}
    </Stack>
  );
};

export default PrimaryContentBlock;
