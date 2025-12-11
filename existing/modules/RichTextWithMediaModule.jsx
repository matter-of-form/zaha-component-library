import { ModuleBase, PreHeading, HeadingTag, Media, Link } from "components";

const RichTextWithMediaModule = ({ data }) => {
  const {
    headingTitle,
    preHeading,
    media,
    primaryCTA,
    secondaryCTA,
    mediaAlignment,
  } = data;

  return (
    <ModuleBase data={data} className="font-primary">
      <div className="container color-from-bg">
        <div className="flex flex-col">
          {preHeading && (
            <PreHeading className="my-4 uppercase text-subheading text-base text-grey3">
              {preHeading}
            </PreHeading>
          )}
          {headingTitle && (
            <HeadingTag
              data={headingTitle}
              className={"text-" + data.headingTitle.htag}
            ></HeadingTag>
          )}
        </div>
        <div
          className={`flex flex-col lg:flex-row w-full lg:gap-32 mt-16 sm:mt-20 ${
            mediaAlignment === "Right" ? "lg:flex-row-reverse" : ""
          }`}
        >
          <div className="w-full lg:w-[27.22%] max-w-[392px] mx-auto">
            <figure className="aspect-3/4 ">
              {media && (
                <Media
                  media={media}
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
                />
              )}
            </figure>
            {media?.description && (
              <figcaption className="text-caption mt-4 rtl:text-right">
                {media.description}
              </figcaption>
            )}
          </div>

          <div className="w-full lg:w-[72.88%] mt-16 sm:mt-20 lg:mt-0">
            <div
              className="richtext-content mb-10"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
            <div className="flex flex-col items-start">
              {primaryCTA && <Link className="btn primary" link={primaryCTA} />}
              {secondaryCTA && (
                <Link
                  className="btn secondary last:mt-4 only:mt-0"
                  link={secondaryCTA}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </ModuleBase>
  );
};
export default RichTextWithMediaModule;
