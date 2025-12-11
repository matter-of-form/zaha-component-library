import { ModuleBase, Media } from "components";
import SectionContent from "components/cards/SectionContent.jsx";

const RichTextAndOneMediaModule = ({ data }) => {
  return (
    <ModuleBase data={data}>
      <div
        className={`container main-data flex lg:justify-between ${
          data.mediaAlignment === "Left"
            ? "flex-col-reverse lg:flex-row-reverse"
            : "flex-col lg:flex-row"
        }`}
      >
        <div className="text-wrapper lg:my-auto md:w-[73%] lg:w-[48%] color-from-bg">
          <SectionContent
            data={data}
            //preHeadingClassName="text-small-paragraph lg:text-paragraph"
            //headingClassName="font-primary text-h2 font-[300]"
            //descriptionClassName="font-[300] font-primary text-small-paragraph md:text-paragraph"
          />
        </div>

        {data.mediaOrientation === "Portrait" ||
        data.mediaOrientation === "" ? (
          <div
            className={`img-wrapper aspect-3/4 mx-auto md:mx-0 my-auto h-fit md:w-[75%] lg:w-[49%]
             max-w-[327px] md:max-w-[451px] lg:max-w-[496px] relative 
            ${
              data.mediaAlignment === "Left"
                ? "mb-14 md:mb-10 lg:mb-auto md:self-start"
                : "mt-14 md:mt-10 lg:mt-auto md:self-end"
            }`}
          >
            <Media
              media={data.media}
              widths={{ xs: 490, sm: 490, md: 451, lg: 496, xl: 496, xxl: 496 }}
              heights={{
                xs: 652,
                sm: 652,
                md: 597,
                lg: 660,
                xl: 660,
                xxl: 660,
              }}
              className=" h-full w-full object-cover"
            />
          </div>
        ) : (
          <div
            className={`img-wrapper aspect-8/5 w-full md:mx-auto  my-auto h-fit lg:w-[49%] max-w-[688px] lg:max-w-[600px] relative 
            ${data.mediaAlignment === "Left" ? "mb-10 lg:ml-0  lg:mb-auto" : "mt-14 md:mt-10 lg:mr-0 lg:mt-auto "}
            `}
          >
            <Media
              media={data.media}
              widths={{ xs: 327, sm: 327, md: 688, lg: 600, xl: 600, xxl: 600 }}
              className="absolute h-full w-full object-cover"
            />
          </div>
        )}
      </div>
    </ModuleBase>
  );
};

export default RichTextAndOneMediaModule;
