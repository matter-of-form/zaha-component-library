import {
  Link,
  ResponsiveImage,
  ModuleBase,
  HeadingTag,
  Media,
} from "components";

const RichTextAndMediaOnFullBleedModule = ({ data }) => {
  return (
    <ModuleBase data={data}>
      <div className="main-data w-full flex flex-col lg:flex-row lg:justify-between  relative">
        <div className="img-wrapper  lg:mb-0 my-auto h-fit w-full md:h-[511px] lg:h-[800px] lg:max-h-screen  relative aspect-3/4">
          <ResponsiveImage
            image={data.backgroundImage}
            widths={{ xs: 1024, sm: 1024, md: 1024, lg: 1440, xl: 1900 }}
            className="absolute h-full w-full object-cover"
          />
          <div className="sm:absolute top-0 left-0 right-0 h-full w-full  gradient-left-and-right" />

          <div className="secondary-img-wrapper   max-w-[156px]  md:max-w-[214px] lg:max-w-[392px] md:h-[285px] lg:h-[521px] top-1/2 left-1/2 -translate-x-2/4 -translate-y-1/2  relative aspect-3/4">
            <Media
              media={data.smallMedia}
              widths={{ xs: 234, md: 332, lg: 392 }}
              className=" h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="text-wrapper pt-14 pb-[21px] md:px-10 lg:px-[20px] md:pt-10 md:pb-4 container ml-0 lg:h-[800px] lg:max-h-screen w-full md:w-[65%] lg:w-full h-full lg:absolute lg:top-0 lg:left-1/2 lg:-translate-x-2/4 lg:flex lg:justify-between lg:items-center color-from-bg">
          <div className="title-wrapper lg:w-[35%]">
            <p className="pre-heading uppercase font-primary font-semibold text-subheading ">
              {data.preHeading}
            </p>

            <HeadingTag
              data={data.headingTitle}
              className="font-primary font-[300] text-h2 my-4 lg:pr-6"
            />
          </div>

          <div className="description-wrapper lg:w-[30%]">
            <div
              dangerouslySetInnerHTML={{ __html: data.description }}
              className="font-primary text-small-paragraph md:text-paragraph md:max-w-lg
              "
            ></div>

            {data.primaryCTA && (
              <Link className="btn primary mr-4 mt-10" link={data.primaryCTA} />
            )}

            {data.secondaryCTA && (
              <Link
                className="btn secondary mr-2 mt-10"
                link={data.secondaryCTA}
              />
            )}
          </div>
        </div>
      </div>
    </ModuleBase>
  );
};

export default RichTextAndMediaOnFullBleedModule;
