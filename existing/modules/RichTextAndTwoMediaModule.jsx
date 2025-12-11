import { ModuleBase, ResponsiveImage, Media } from "components";
import SectionContent from "components/cards/SectionContent.jsx";

const RichTextAndTwoMediaModule = ({ data }) => {
  const layoutAlignment = () => {
    if (data.mediaAlignment === "Left") {
      if (
        data.mediaOrientation === "Portrait" ||
        data.mediaOrientation === "" ||
        data.mediaOrientation !== "Landscape"
      ) {
        return "mr-auto lg:mr-0";
      } else {
        return "ml-auto lg:ml-0";
      }
    } else {
      if (
        data.mediaOrientation === "Portrait" ||
        data.mediaOrientation === "" ||
        data.mediaOrientation !== "Landscape"
      ) {
        return "ml-auto lg:ml-0";
      } else {
        return "mr-auto lg:mr-0";
      }
    }
  };

  // regarding the small picture, module needs a custom padding bottom
  const customPaddingBottom = () => {
    if (data.paddingBottom.toLowerCase() === "medium") {
      return `pb-10 lg:pb-[116px]`;
    } else if (data.paddingBottom.toLowerCase() === "large") {
      return "pb-16 lg:pb-[164px]";
    } else {
      return "pb-[72px]";
    }
  };

  return (
    <ModuleBase data={data} className={` ${customPaddingBottom()}`}>
      <div
        className={`container main-data flex pb-0   flex-col-reverse lg:justify-between ${
          data.mediaAlignment === "Left"
            ? " lg:flex-row-reverse"
            : " lg:flex-row"
        } `}
      >
        <div
          className={`text-wrapper md:w-[70%] lg:my-auto lg:w-[496px]  
         ${layoutAlignment()}
         `}
        >
          <SectionContent
            data={data}
            //preHeadingClassName="text-small-paragraph lg:text-paragraph"
            //headingClassName="font-primary text-h2 font-[300]"
            //descriptionClassName="font-[300] font-primary text-small-paragraph md:text-paragraph"
            //className="[&_.title]:mt-0"
          />
        </div>

        {data.mediaOrientation === "Portrait" ||
        data.mediaOrientation === "" ? (
          <div
            className={`img-wrapper my-auto h-fit w-full max-w-[213px] md:max-w-[332px] lg:max-w-[392px] relative aspect-3/4   ${
              data.mediaAlignment === "Left"
                ? "mb-[97px] md:mb-[40px] lg:my-auto self-end lg:self-start"
                : "mb-[97px] md:mb-[40px] mt-0 lg:my-auto self-start lg:self-end"
            }`}
          >
            <ResponsiveImage
              image={data.largeMedia}
              widths={{ xs: 213, sm: 213, md: 332, lg: 392, xl: 392, xxl: 392 }}
              heights={{
                xs: 284,
                sm: 284,
                md: 442,
                lg: 522,
                xl: 522,
                xxl: 522,
              }}
              className="absolute h-full w-full object-cover"
            />

            <div
              className={`secondary-img-wrapper h-fit w-full max-w-[156px] md:max-w-[214px] lg:max-w-[288px] absolute aspect-3/4
            ${
              data.mediaAlignment === "Left"
                ? " bottom-[-22%] md:bottom-[-5%] left-[-53%] lg:bottom-[-10%] lg:left-[90%] "
                : " bottom-[-22%] md:bottom-[-5%] right-[-53%] lg:bottom-[-10%] lg:right-[90%] "
            }`}
            >
              <Media
                media={data.smallMedia}
                widths={{
                  xs: 156,
                  sm: 214,
                  md: 214,
                  lg: 288,
                  xl: 288,
                  xxl: 288,
                }}
                heights={{
                  xs: 208,
                  sm: 284,
                  md: 285,
                  lg: 384,
                  xl: 384,
                  xxl: 384,
                }}
                className=" h-full w-full object-cover"
              />
            </div>
          </div>
        ) : (
          <div
            className={`img-wrapper my-auto h-fit w-full max-w-[269px] md:max-w-[569px] lg:max-w-[495px] aspect-8/5 lg:w-[40%] relative 
          ${
            data.mediaAlignment === "Left"
              ? "mb-[90px] md:mb-[135px] self-end lg:self-start"
              : "mt-[40px] mb-[60px] md:mb-[135px] self-start lg:self-end"
          }
          `}
          >
            <ResponsiveImage
              image={data.largeMedia}
              widths={{ xs: 327, md: 688, lg: 600, xl: 600, xxl: 600 }}
              className=" h-full w-full object-cover"
            />

            <div
              className={`secondary-img-wrapper h-fit w-full max-w-[155px] md:max-w-[332px] lg:max-w-[392px] 
              absolute aspect-8/5 
            ${
              data.mediaAlignment === "Left"
                ? " bottom-[-25%] left-[-22%] md:left-[-25%] lg:-bottom-[60%] lg:left-[40%]"
                : " bottom-[-25%] right-[-22%] md:right-[-25%] lg:-bottom-[60%] lg:right-[40%]"
            }`}
            >
              <Media
                media={data.smallMedia}
                widths={{
                  xs: 155,
                  sm: 155,
                  md: 332,
                  lg: 495,
                  xl: 495,
                  xxl: 495,
                }}
                className=" h-full w-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </ModuleBase>
  );
};

export default RichTextAndTwoMediaModule;
