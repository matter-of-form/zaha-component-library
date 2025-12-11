import React, { useState, useEffect } from "react";
import { ModuleBase, PreHeading, HeadingTag } from "components";
import classnames from "classnames";
import { useTranslation } from "next-i18next";
import Facebook from "assets/facebook.svg";
import Linkedin from "assets/linkedin.svg";
import Twitter from "assets/twitter.svg";
import Mail from "assets/mail.svg";

import { isColorDark } from "utils";

const HeroArticleModule = ({ data }) => {
  const { title, authorName, date, label, readTime } = data;
  const [shareURL, setShareURL] = useState();
  const { t } = useTranslation("common");

  useEffect(() => {
    setShareURL(encodeURIComponent(window.location.href));
  }, []);

  const lDate = new Date(date);
  let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(lDate);
  let mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(lDate);
  let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(lDate);
  const formatedDate = `${da}.${mo}.${ye}`;

  return (
    <ModuleBase
      data={data}
      className=" font-primary text-black my-10 hero-article-module"
    >
      <div className="hero-article__content container color-from-bg">
        {label && (
          <PreHeading className="my-4 uppercase text-subheading">
            {label}
          </PreHeading>
        )}
        {title && (
          <HeadingTag
            data={{ htag: "h1", heading: title }}
            className="text-h3 mb-4"
          ></HeadingTag>
        )}
        {data.description && (
          <div
            className="font-[300] text-h6 lg:mt-0 mb-10 md:mb-14"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        )}

        <div
          className={classnames(
            "flex flex-col  text-paragraph md:text-large-paragraph",
            isColorDark(data.backgroundColour) ? "text-white" : "text-[#333]",
          )}
        >
          <div className="mb-6 font-semibold "> {authorName}</div>
          <div className="flex flex-col w-full lg:flex-row lg:justify-between mb-6">
            <div>
              <span className="">
                {t("general.$published")} {formatedDate}
              </span>
              <span className="mx-4">&#8226;</span>
              <span>{readTime}</span>
            </div>
            <div className="flex items-center mt-6">
              <div className="font-semibold mr-3">{t("general.$shareOn")}</div>
              <a
                href={`https://twitter.com/intent/tweet?url=${shareURL}`}
                target="_blank"
                className="m-3"
                title="Twitter"
              >
                <Twitter />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareURL}`}
                target="_blank"
                className="m-3"
                title="Facebook"
              >
                <Facebook />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareURL}`}
                target="_blank"
                className="m-3"
                title="Linkedin"
              >
                <Linkedin />
              </a>
              <a
                href={`mailto:?subject=I wanted you to see this site&amp;body=Check out this site ${shareURL}.`}
                target="_blank"
                className="m-3"
                title="Mail"
              >
                <Mail />
              </a>
            </div>
          </div>
        </div>
      </div>
    </ModuleBase>
  );
};

export default HeroArticleModule;
