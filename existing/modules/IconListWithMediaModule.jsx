import { ModuleBase, ResponsiveImage, Media } from "components";
const IconListWithMediaModule = ({ data }) => {
  return (
    <ModuleBase data={data} className="container">
      <div
        className={`main-wrapper lg:hidden flex lg:gap-[9%] lg:items-center ${
          data.mobileLayoutAlignment === "Top"
            ? "flex-col lg:flex-row"
            : "flex-col-reverse lg:flex-row-reverse"
        }`}
      >
        <div
          className={`img-wrapper my-auto h-fit w-full md:max-w-[450px]   lg:max-w-[496px]  aspect-3/4
        ${data.mobileLayoutAlignment === "Top" ? "mb-10 md:mb-20 lg:mb-0" : "mt-4 md:mt-14 lg:mt-0"}   `}
        >
          {data.media && (
            <Media
              media={data.media}
              widths={{ xs: 327, sm: 327, md: 450, lg: 496, xl: 496, xxl: 496 }}
              heights={{
                xs: 435,
                sm: 435,
                md: 597,
                lg: 660,
                xl: 660,
                xxl: 660,
              }}
              image-class="h-full w-full object-cover "
              className=" h-full w-full object-cover"
            />
          )}
        </div>

        <div
          className={`icon-wrapper w-full lg:w-[46%] h-fit flex flex-wrap gap-x-[19px] md:gap-x-[24px]`}
        >
          {data.iconListElements.map((iconItem, iconIndex) => (
            <div
              key={iconIndex}
              className={`icon-item w-[45%] h-fit  mb-6 flex items-center `}
            >
              <div
                className={`icon mr-[15px] w-[18px] h-[18px] 
        `}
              >
                <ResponsiveImage
                  image={iconItem.logo}
                  widths={{ xs: 18, sm: 18, md: 18, lg: 18, xl: 18, xxl: 18 }}
                  heights={{ xs: 18, sm: 18, md: 18, lg: 18, xl: 18, xxl: 18 }}
                  image-class="h-full w-full object-cover"
                  className=" h-full w-full object-cover"
                />
              </div>

              <div className="text w-[75%]">
                <p
                  className="text-paragraph font-primary font-normal
                "
                >
                  {iconItem.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`main-wrapper hidden lg:flex lg:gap-[9%] lg:items-center ${
          data.desktopLayoutAlignment === "Left"
            ? "lg:flex-row"
            : "lg:flex-row-reverse"
        }`}
      >
        <div
          className={`img-wrapper my-auto h-fit w-full md:w-[70%] lg:w-[45%] lg:max-w-[496px]  aspect-3/4
       `}
        >
          {data.media && (
            <Media
              media={data.media}
              widths={{ xs: 327, sm: 327, md: 450, lg: 496, xl: 496, xxl: 496 }}
              heights={{
                xs: 435,
                sm: 435,
                md: 597,
                lg: 660,
                xl: 660,
                xxl: 660,
              }}
              image-class="h-full w-full object-cover "
              className=" h-full w-full object-cover"
            />
          )}
        </div>

        <div
          className={`icon-wrapper w-full lg:w-[46%] h-fit flex flex-wrap gap-x-[24px]`}
        >
          {data.iconListElements.map((iconItem, iconIndex) => (
            <div
              key={iconIndex}
              className={`icon-item w-[45%] h-fit  mb-6 flex items-center `}
            >
              <div
                className={`icon mr-[15px] w-[18px] h-[18px] 
        `}
              >
                <ResponsiveImage
                  image={iconItem.logo}
                  widths={{ xs: 18, sm: 18, md: 18, lg: 18, xl: 18, xxl: 18 }}
                  heights={{ xs: 18, sm: 18, md: 18, lg: 18, xl: 18, xxl: 18 }}
                  image-class="h-full w-full object-cover"
                  className=" h-full w-full object-cover"
                />
              </div>

              <div className="text  w-[75%]">
                <p
                  className="text-paragraph font-primary font-normal
                "
                >
                  {iconItem.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ModuleBase>
  );
};

export default IconListWithMediaModule;
