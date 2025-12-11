import { ModuleBase, SectionContent, Media } from "components";

const HeroLeftAlignedModule = ({ data }) => {
  return (
    <ModuleBase data={data} className="relative ">
      <div className="h-[400px] sm:h-full sm:absolute top-0 left-0 right-0  w-full">
        <Media
          media={data.backgroundMedia}
          widths={{ xs: 425, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 2560 }}
          heights={{ xs: 400, sm: 460, md: 585, lg: 780, xl: 975, xxl: 1950 }}
          className="h-full w-full object-cover"
          dataNotLazy
        />
      </div>
      <div className="sm:absolute top-0 left-0 right-0 h-full w-full gradient-left-to-right" />
      <div className="container relative h-full pt-6 sm:pt-32 sm:pb-6 lg:pb-28">
        <div className="md:w-[600px] h-full flex items-end">
          <SectionContent
            data={data}
            //headingClassName="text-h1"
            //descriptionClassName="text-h6 font-light"
          />
        </div>
      </div>
    </ModuleBase>
  );
};

export default HeroLeftAlignedModule;
