import PropTypes from "prop-types";
import { ResponsiveImage, Link, PreHeading, Skeleton } from "..";
import classNames from "classnames";
import { useTranslation } from "next-i18next";

const ArticleCardLarge = ({ data, loading, className, ...props }) => {
  const lDate = new Date(data.date);
  let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(lDate);
  let mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(lDate);
  let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(lDate);
  const formatedDate = `${da}.${mo}.${ye}`;

  const { t } = useTranslation("common");

  return (
    <div
      {...props}
      className={classNames(
        "main-wrapper bg-white flex flex-col lg:flex-row gap-6 lg:gap-14 p-4 md:p-6 font-primary",
        className,
      )}
    >
      <div className="img-wrapper aspect-[3/2] h-[464px]">
        {!loading && (
          <ResponsiveImage
            image={data.image}
            widths={{ xs: 295, md: 640, lg: 661 }}
            heights={{ xs: 196, md: 427, lg: 441 }}
          />
        )}
        {loading && <Skeleton image className="w-full h-full" />}
      </div>
      <div className="content-wrapper flex flex-col lg:justify-between lg:w-[400px]">
        <div className="text-wrapper">
          <div className="mb-2 md:mb-4 lg:mb-6">
            {!loading && data.preHeading && (
              <PreHeading className="font-semibold text-grey3 text-small-paragraph ">
                {data.preHeading}
              </PreHeading>
            )}
            {loading && <Skeleton className="h-5 w-1/3" />}
          </div>
          {!loading && data.headingTitle && (
            <p className="text-h5">{data.headingTitle}</p>
          )}
          {loading && <Skeleton className="h-10 w-2/3" />}
          <div className="date-wrapper my-4 md:my-6 font-semibold text-small-paragraph text-grey3">
            {!loading && (
              <>
                {formatedDate} <span className="mx-6">|</span> {data.readTime}
              </>
            )}
            {loading && <Skeleton className="h-5 w-1/2" />}
          </div>
          {!loading && data.description && (
            <div
              className="text-small-paragraph md:text-paragraph"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          )}
          {loading && <Skeleton className="h-24 w-full" />}
        </div>
        {(data.primaryCta || data.secondaryCta) && (
          <div className="button-wrapper mt-6 lg:mt-10 inline-flex gap-4 justify-between">
            {!loading && (
              <Link className="btn primary" link={data.primaryCta}>
                {t("cards.$viewArticle")}
              </Link>
            )}
            {!loading && (
              <Link className="btn secondary" link={data.secondaryCta} />
            )}
            {loading && <Skeleton className="h-11 w-40" />}
          </div>
        )}
      </div>
    </div>
  );
};

ArticleCardLarge.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ArticleCardLarge;
