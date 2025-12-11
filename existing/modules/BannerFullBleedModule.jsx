import { ModuleBase, Media } from "components";
import SectionContent from "components/cards/SectionContent.jsx";
const BannerFullBleedModule = ({ data }) => {
  return (
    <ModuleBase data={data} className="font-primary">
      <div className="main-wrapper h-screen relative overflow-hidden">
        <div className="sm:absolute top-0 left-0 right-0 h-full w-full  gradient-left-to-right" />
        <Media
          media={data.backgroundMedia}
          widths={{ xs: 327, md: 1024, lg: 1440, xl: 1900 }}
          image-class="h-full w-full object-cover "
          className=" h-full w-full object-cover"
          cover
        />

        <div className="title-wrapper container px-0">
          <SectionContent
            data={data}
            //preHeadingClassName="text-paragraph mb-4"
            //headingClassName="font-primary mb-4 text-h2 color-from-bg "
            //descriptionClassName="font-[300] font-primary text-paragraph "
            className="container w-full md:w-[451px] lg:w-[660px] absolute bottom-10 lg:bottom-20 [&_.description-wrapper]:my-0 [&_.primary]:mr-4 [&_.subHeading]:font-[600]"
          />
        </div>
      </div>
    </ModuleBase>
  );
};

export default BannerFullBleedModule;
