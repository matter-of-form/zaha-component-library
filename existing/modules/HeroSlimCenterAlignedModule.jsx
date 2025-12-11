import { ModuleBase, SectionContent, Media } from "components";

const HeroCenterAlignedModule = ({ data }) => {
  return (
    <ModuleBase data={data} className="relative md:py-4">
      <div className="h-[400px] sm:h-full sm:absolute top-0 left-0 right-0  w-ful">
        <Media
          media={data.backgroundMedia}
          widths={{ xs: 425, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 2560 }}
          heights={{ xs: 400, sm: 460, md: 585, lg: 780, xl: 975, xxl: 1950 }}
          className="h-full w-full object-cover"
          dataNotLazy
        />
      </div>
      <div className="sm:absolute top-0 left-0 right-0 h-full w-full gradient-center" />
      <div className="container relative lg:w-3/5 h-full flex justify-center items-center lg:pt-32 lg:pb-28  ">
        <SectionContent
          data={data}
          className="[&_.button-wrapper]:justify-center mt-6 sm:mt-0"
          //preHeadingClassName="text-center text-base"
          //headingClassName="text-center text-h1"
          //descriptionClassName="text-h6 font-light text-center mt-5"
        />
      </div>
    </ModuleBase>
  );
};

export default HeroCenterAlignedModule;
