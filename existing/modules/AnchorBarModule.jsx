import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { ModuleBase, Link, PopoverMenu } from "components";
import ArrowUp from "assets/arrowUp.svg";
import { useTranslation } from "next-i18next";

const AnchorBarModule = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [activeModule, setActiveModule] = useState();
  const { t } = useTranslation("common");

  const goto = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
    setOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveModule(entry.target.id ? "#" + entry.target.id : null);
          }
        });
      },
      {
        rootMargin: "0px 0px -30% 0px",
        threshold: 0.5,
      },
    );
    document
      .querySelectorAll(".page-container > .module")
      .forEach((el) => observer.observe(el));
  }, []);

  const links =
    data.anchorLinkItems &&
    data.anchorLinkItems.map(
      (element, index) =>
        element.text && (
          <div key={index} className="flex grow">
            <button
              className={classnames(
                "anchor-link duration-200 w-full whitespace-nowrap",
                {
                  active: activeModule === element.href,
                },
              )}
              onClick={() => goto(element.href)}
            >
              {element.text}
            </button>
          </div>
        ),
    );

  return (
    <ModuleBase
      data={{
        ...data,
        backgroundColour: data.backgroundColour || "#fff",
        paddingBottom: null,
        paddingTop: null,
      }}
      className="fixed bottom-0 w-full z-50 md:border-t border-grey5"
    >
      <div className="sm:container sm:h-20">
        <div className="flex items-center h-full">
          <div className="hidden lg:flex grow h-full text-h6 text-grey4 text-center [&_.anchor-link.active]:text-black">
            {links}
          </div>

          <div className="flex grow lg:hidden">
            <PopoverMenu
              open={open}
              onOpen={() => setOpen(true)}
              title={t("anchor.$tableOfContents")}
              placement="Top"
              className="w-full [&_.anchor-link]:text-left text-grey1 [&_.anchor-link]:p-4 [&_.main-button]:border-grey5 [&_.main-button]:sm:py-2.5 [&_.anchor-link.active]:font-bold"
            >
              {links}
              <div className="md:hidden border-t border-grey5 flex justify-between p-4">
                <Link className="btn primary" link={data.cta} />
                <button className="btn text" onClick={() => goto("#__next")}>
                  <ArrowUp role="presentation" className="stroke-black" />
                  <span className="normal-case">{t("anchor.$backToTop")}</span>
                </button>
              </div>
            </PopoverMenu>
          </div>

          <div className="hidden sm:flex ml-10">
            <Link className="btn primary" link={data.cta} />

            <button className="btn" onClick={() => goto("#__next")}>
              <ArrowUp role="presentation" className="stroke-black" />
            </button>
          </div>
        </div>
      </div>
    </ModuleBase>
  );
};

export default AnchorBarModule;
