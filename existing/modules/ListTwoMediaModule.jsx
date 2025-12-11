import { ModuleBase, ResponsiveImage, Media } from "components";
const ListTwoMediaModule = ({ data }) => {
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
        className={`container  main-data flex lg:justify-between md:px-10  ${
          data.mediaAlignment === "Left"
            ? "flex-col lg:flex-row"
            : "flex-col lg:flex-row-reverse"
        }`}
      >
        {data.mediaOrientation === "Portrait" ||
        data.mediaOrientation === "" ? (
          <div
            className={`img-wrapper mx-auto md:mx-0 h-fit w-full max-w-[325px] 
            md:max-w-[332px] lg:max-w-[392px] relative aspect-3/4   ${
              data.mediaAlignment === "Left"
                ? "mb-[56px] md:mb-[60px]  self-end lg:self-center"
                : "mb-[56px] md:mb-[60px]   self-start lg:self-center"
            }`}
          >
            <ResponsiveImage
              image={data.largeMedia}
              widths={{ xs: 320, sm: 320, md: 332, lg: 392, xl: 392, xxl: 392 }}
              heights={{
                xs: 426,
                sm: 426,
                md: 442,
                lg: 522,
                xl: 522,
                xxl: 522,
              }}
              className="absolute h-full w-full object-cover"
            />

            <div
              className={`secondary-img-wrapper hidden md:block  h-fit w-full max-w-[156px] md:max-w-[214px] lg:max-w-[288px] absolute aspect-3/4
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
            className={`img-wrapper  h-fit w-full max-w-[269px] md:max-w-[569px] lg:max-w-[495px] aspect-8/5 lg:w-[40%] lg:items-center relative 
          ${
            data.mediaAlignment === "Left"
              ? "mb-[90px] md:mb-[135px] self-end lg:self-center"
              : "mt-[40px] mb-[60px] md:mb-[135px] self-start lg:self-center"
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
                ? " bottom-[-25%] left-[-22%] md:left-[-21%] lg:-bottom-[60%] lg:left-[40%]"
                : " bottom-[-25%] right-[-22%] md:right-[-21%] lg:-bottom-[60%] lg:right-[40%]"
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
        <div
          className={`stats-wrapper flex flex-col md:items-center w-full md:mx-0 md:w-[214px]  lg:my-auto lg:w-[63%] color-from-bg
          ${data.mediaAlignment === "Left" ? "md:ml-[25%] lg:ml-0" : "md:ml-[42%] lg:ml-0"}
          `}
        >
          {data.statElements.map((statItem, statIndex) => (
            <div
              key={statIndex}
              className="stats mb-10 last:mb-0 md:w-[195px] lg:w-[40%]"
            >
              <p className="font-primary font-normal mb-2 text-[16px] leading-[24px] lg:text-[14px] lg:leading-[20px]">
                {statItem.statisticsLabel}
              </p>

              <p className="font-primary text-h4 color-from-bg">
                {statItem.statistics}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ModuleBase>
  );
};
export default ListTwoMediaModule;
