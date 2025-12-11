import React from "react";
import { SectionContent, ModuleBase, ResponsiveImage, Media } from "components";

const HeroWithTwoMediaModule = ({ data }) => {
  return (
    <ModuleBase data={data}>
      <div className="container flex flex-col  lg:flex-row-reverse lg:gap-[10.46%]  justify-center items-center  max-w-[1224px] mx-auto min-h-screen pt-6 md:pt-0">
        <div className="image-container py-18 mx-auto lg:w-[49.02%] md:w-[333px] w-[327px] mb-10">
          <div className=" w-full h-full relative grid grid-cols-10 grid-rows-12">
            <div
              className="image-bottom aspect-3/4 w-[218px] lg:w-full xl:w-[392px] justify-self-end"
              style={{ gridArea: "1 / 4 / 9 / -1" }}
            >
              <ResponsiveImage
                image={data.backgroundMedia}
                widths={{
                  xs: 392,
                  sm: 392,
                  md: 392,
                  lg: 392,
                  xl: 392,
                  xxl: 392,
                }}
                heights={{
                  xs: 523,
                  sm: 523,
                  md: 523,
                  lg: 523,
                  xl: 523,
                  xxl: 523,
                }}
                className="h-full w-full object-cover"
                dataNotLazy
              />
            </div>
            <div
              className="image-top aspect-3/4 w-[157px] md:w-[159px] lg:w-full xl:w-[288px] z-[1] justify-self-start "
              style={{ gridArea: "5 / 1 / 12 / 5" }}
            >
              <Media
                media={data.foregroundMedia}
                widths={{
                  xs: 157,
                  sm: 157,
                  md: 157,
                  lg: 288,
                  xl: 288,
                  xxl: 288,
                }}
                heights={{
                  xs: 210,
                  sm: 210,
                  md: 210,
                  lg: 384,
                  xl: 384,
                  xxl: 384,
                }}
                className="h-full w-full object-cover"
                dataNotLazy
              />
            </div>
          </div>
        </div>
        <div className="text-container mx-auto  w-[326px] md:w-[450px] lg:w-[40.52%]">
          <SectionContent
            data={data}
            //headingClassName="text-h1"
            //descriptionClassName="text-h6 font-[300]"
          />
        </div>
      </div>
    </ModuleBase>
  );
};

export default HeroWithTwoMediaModule;
