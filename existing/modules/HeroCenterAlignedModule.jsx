import React, { useRef } from "react";
import { ModuleBase, SectionContent, Media } from "components";

const HeroCenterAlignedModule = ({ data }) => {
  const media = useRef();

  const openFullscreen = () => {
    media?.current?.openFullscreen();
  };

  return (
    <ModuleBase data={data} className="relative h-screen overflow-hidden">
      {data.backgroundMedia && (
        <div className="absolute top-0 left-0 right-0 h-full w-full">
          <Media
            ref={media}
            media={data.backgroundMedia}
            widths={{
              xs: 425,
              sm: 640,
              md: 768,
              lg: 1024,
              xl: 1280,
              xxl: 2560,
            }}
            className="h-full w-full object-cover"
            cover
            dataNotLazy
          />
        </div>
      )}
      <div className="absolute top-0 left-0 right-0 h-full w-full gradient-center" />
      <div
        className="container relative md:w-4/5 lg:w-3/5 h-full flex items-center justify-center"
        onClick={openFullscreen}
      >
        <SectionContent
          data={data}
          className="[&_.button-wrapper]:justify-center"
          //preHeadingClassName="text-center text-base"
          //headingClassName="text-center text-h1"
          //descriptionClassName="text-h6 font-light text-center lg:mt-5"
        />
      </div>
    </ModuleBase>
  );
};

export default HeroCenterAlignedModule;
