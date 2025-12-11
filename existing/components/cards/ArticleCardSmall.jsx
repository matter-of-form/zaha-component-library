import PropTypes from "prop-types";
import { ResponsiveImage, PreHeading, Link } from "..";
import classNames from "classnames";
import { useTranslation } from "next-i18next";

const ArticleCardSmall = ({ data, className, ...props }) => {
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
        "main-wrapper bg-white flex flex-col p-4 md:p-6 font-primary",
        className,
      )}
    >
      <div className="img-wrapper aspect-[3/2] w-full">
        <ResponsiveImage
          image={data.image}
          widths={{ xs: 238, md: 402, lg: 344 }}
          heights={{ xs: 158, md: 268, lg: 229 }}
        />
      </div>
      <div className="content-wrapper mt-6 md:mt-4 lg:mt-6 flex flex-col justify-between grow">
        <div className="text-wrapper">
          {data.preHeading && (
            <PreHeading className="font-semibold text-grey3 text-small-paragraph mb-2 md:mb-4">
              {data.preHeading}
            </PreHeading>
          )}
          {data.headingTitle && (
            <p className="font-semibold text-[22px] leading-[30px] md:text-[26px] md:leading-[40px] lg:text-[22px] lg:leading-[32px]">
              {data.headingTitle}
            </p>
          )}
          <div className="date-wrapper my-4 font-semibold text-small-paragraph text-grey3">
            {formatedDate} <span className="mx-6">|</span> {data.readTime}
          </div>
          {data.description && (
            <div
              className="text-small-paragraph md:text-paragraph font-[400]"
              dangerouslySetInnerHTML={{ __html: data.description }}
            ></div>
          )}
        </div>
        {(data.primaryCta || data.secondaryCta) && (
          <div className="button-wrapper mt-6 lg:mt-10 inline-flex gap-4 justify-between">
            <Link className="btn primary" link={data.primaryCta}>
              {t("cards.$viewArticle")}
            </Link>
            <Link className="btn secondary" link={data.secondaryCta} />
          </div>
        )}
      </div>
    </div>
  );
};

ArticleCardSmall.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ArticleCardSmall;
