import { ModuleBase, ResponsiveImage, Media } from "components";
import SectionContent from "components/cards/SectionContent.jsx";

const RichTextAndTwoPortraitStackedModule = ({ data }) => {
  return (
    <ModuleBase data={data}>
      <div
        className={`container main-data flex lg:justify-between lg:px-24 ${
          data.mediaAlignment === "Left"
            ? "flex-col-reverse lg:flex-row-reverse"
            : "flex-col lg:flex-row"
        }`}
      >
        <div className="text-wrapper lg:my-auto w-full md:w-[65%] lg:w-[45%]">
          <SectionContent
            data={data}
            //preHeadingClassName="text-small-paragraph lg:text-paragraph"
            //headingClassName="font-primary text-h2 font-[300]"
            //descriptionClassName="font-[300] font-primary text-small-paragraph md:text-paragraph"
          />
        </div>

        <div
          className={`img-wrapper my-auto h-fit w-full lg:w-[45%] relative aspect-3/4 ${
            data.mediaAlignment === "Left"
              ? "mb-14 md:mb-10 lg:mb-0 self-start"
              : "mt-10 md:mt-10 lg:mt-0 lg:mb-0 self-end"
          }`}
        >
          <ResponsiveImage
            image={data.backgroundImage}
            widths={{ xs: 327, md: 688, lg: 600 }}
            className="absolute h-full w-full object-cover"
          />

          <div className="secondary-img-wrapper h-fit w-[70%] top-1/2 left-1/2 -translate-x-2/4 -translate-y-1/2 absolute aspect-3/4">
            <Media
              media={data.foregroundMedia}
              widths={{ xs: 156, md: 332, lg: 392 }}
              className="absolute h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </ModuleBase>
  );
};

export default RichTextAndTwoPortraitStackedModule;
