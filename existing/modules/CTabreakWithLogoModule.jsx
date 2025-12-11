import {
  ModuleBase,
  PreHeading,
  Link,
  HeadingTag,
  ResponsiveImage,
} from "components";

const CTabreakWithLogoModule = ({ data }) => {
  return (
    <ModuleBase data={data} className="font-primary">
      <div className="container main-wrapper flex flex-col items-center gap-6 lg:gap-10 md:flex-row md:justify-between">
        <div className="logo w-full md:w-[20%]  max-w-[99px] h-[99px] md:max-w-[120px] md:h-[120px]">
          <ResponsiveImage
            image={data.image}
            widths={{ xs: 99, sm: 99, md: 120, lg: 120, xl: 120, xxl: 120 }}
            image-class="h-full w-full object-cover "
            className=" h-full w-full object-cover"
          />
        </div>

        <div className="w-full md:w-full flex flex-col lg:flex-row lg:justify-between">
          <div
            className={`flex flex-col gap-4 lg:w-[65%] ${
              data.primaryCTA || data.secondaryCTA ? "mb-10 lg:mb-0" : "mb-0"
            }`}
          >
            {data.preHeading && (
              <PreHeading className="uppercase  text-subheading text-grey3 md:text-paragraph">
                {data.preHeading}
              </PreHeading>
            )}

            {data.headingTitle && (
              <HeadingTag
                data={data.headingTitle}
                className="text-h2"
              ></HeadingTag>
            )}

            {data.text && (
              <div
                dangerouslySetInnerHTML={{ __html: data.text }}
                className=" text-paragraph"
              ></div>
            )}
          </div>

          {(data.primaryCTA || data.secondaryCTA) && (
            <div className="button-wrapper flex flex-row gap-4 justify-end lg:items-center">
              <Link className="btn primary" link={data.primaryCTA} />
              <Link className="btn secondary" link={data.secondaryCTA} />
            </div>
          )}
        </div>
      </div>
    </ModuleBase>
  );
};

export default CTabreakWithLogoModule;
