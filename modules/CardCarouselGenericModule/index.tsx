import { FC } from "react";
import { ModuleBase, Carousel, Stack, Text } from "../../components";
import { HeadingSideModule } from "../../modules";
import { carouselWrapper } from "./CardCarouselGenericModule.styles";
import { CardCarouselGenericModuleProps } from "./CardCarouselGenericModule.types";

const CardCarouselGenericModule: FC<CardCarouselGenericModuleProps> = ({
  carouselProps,
  data,
  moduleAnims,
  getItems = () => ["No content found. Please connect a config."],
  textStyles,
  getColumnNumber = () => null,
  ...props
}) => {
  if (!data) return null;
  const getCards = data?.cardRow || [];

  const renderCarouselRows = getCards.map((val: any, i: number) => {
    const { cards } = val.props;

    const propOverrideColumnNumber = getColumnNumber(cards[0]?.moduleName)
      ? { columns: getColumnNumber(cards[0]?.moduleName) }
      : {};

    return (
      <Carousel
        key={`carousel${i}`}
        items={getItems(cards)}
        {...carouselProps}
        {...moduleAnims?.carousel}
        {...propOverrideColumnNumber}
      />
    );
  });

  const headingData = {
    description: data?.description,
    headingTitle: data?.headingTitle,
    tag: data?.tag,
  };

  return (
    <ModuleBase data={data} {...carouselWrapper(props, moduleAnims?.module)}>
      <HeadingSideModule
        variant="flex"
        data={headingData}
        moduleAnims={moduleAnims?.headingSide}
      />
      {renderCarouselRows}
    </ModuleBase>
  );
};

export default CardCarouselGenericModule;
