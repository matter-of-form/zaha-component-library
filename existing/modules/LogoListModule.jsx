import { ModuleBase, SectionContent, ResponsiveImage, Link } from "components";

const LogoListModule = ({ data }) => {
  const threeCase = () => {
    if (data.logoListingSection.length === 3) {
      return "flex justify-between";
    } else {
      return "flex flex-wrap justify-center px-12 md:px-0";
    }
  };

  return (
    <ModuleBase data={data} className="font-primary text-black ">
      <div className="main-wrapper container lg:px-[108px]">
        <SectionContent
          data={data}
          //preHeadingClassName="text-paragraph md:mb-2"
          //headingClassName="font-primary text-h2 mb-4"
          //descriptionClassName="font-[300] font-primary paragraph"
          className="mb-10 md:mb-16 md:w-[75%] lg:w-[45%] [&_.button-wrapper]:hidden [&_.pre-heading]:text-small-paragraph [&_.description-wrapper]:mb-0 [&_.pre-heading]:md:text-paragraph"
        />
        <div
          className={`icon-wrapper ${threeCase()} md:justify-start gap-x-10 gap-y-4 md:gap-x-16 md:gap-y-6 lg:gap-x-20 lg:justify-center lg:px-[208px]`}
        >
          {data.logoListingSection.map((iconItem, iconIndex) => (
            <div
              className={`icon pointer-events-none select-none  aspect-square  max-w-[86px] md:max-w-[124px] lg:max-w-[142px]`}
              key={iconIndex}
            >
              <ResponsiveImage
                image={iconItem}
                widths={{ xs: 129, md: 186, lg: 213 }}
                className=" h-full w-full object-cover "
              />
            </div>
          ))}
        </div>
        {(data.primaryCTA || data.secondaryCTA) && (
          <div className="button-wrapper flex justify-center">
            <Link
              className="btn primary self-end mt-10 md:mt-16 first:mr-4 only:mr-0"
              link={data.primaryCTA}
            />
            <Link
              className="btn secondary self-end mt-10 md:mt-16"
              link={data.secondaryCTA}
            />
          </div>
        )}
      </div>
    </ModuleBase>
  );
};

export default LogoListModule;
