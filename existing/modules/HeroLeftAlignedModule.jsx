import { ModuleBase, SectionContent, Media } from "components";

const HeroLeftAlignedModule = ({ data }) => {
  return (
    <ModuleBase data={data} className="relative h-screen overflow-hidden">
      {data.backgroundMedia && (
        <div className="absolute top-0 left-0 right-0 h-full w-full">
          <Media
            media={data.backgroundMedia}
            widths={{
              xs: 425,
              sm: 640,
              md: 768,
              lg: 1024,
              xl: 1280,
              xxl: 2560,
            }}
            cover
            dataNotLazy
          />
        </div>
      )}
      <div className="absolute top-0 left-0 right-0 h-full w-full gradient-left-to-right" />
      <div className="container relative h-full py-6 px-6 md:px-3.5 lg:py-20">
        <div className="lg:w-3/5 h-full flex items-end">
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
