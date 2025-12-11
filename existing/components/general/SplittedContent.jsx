/* eslint-disable @next/next/no-img-element */
import { HeadingTag, Link, PreHeading } from "..";

function SplittedContent({ leftContent, rightContent }) {
  return (
    <div className="oblique">
      <div className="flex flex-col items-center absolute w-full z-10 top-80 sm:top-60 lg:top-60 md:top-80 justify-center text-lighterColor">
        <PreHeading className="pre-heading uppercase font-primary text-base font-semibold text-subheading">
          MATTER OF FORM
        </PreHeading>
        <HeadingTag
          data={{
            htag: "h1",
            heading: "Welcome to the MOF BASE BUILD MODULES",
          }}
          className="text-center w-3/4 text-h1 text-lighterColor"
        />
      </div>
      <div className="main-block-oblique skew-block">
        <div className="skew-block-repeat">
          <div className="oblique-inner">
            <div className="image-wrapper">
              <div className="main-image">
                <img
                  className="image-img"
                  src="https://picsum.photos/id/885/1700/1200"
                  alt=""
                ></img>
              </div>
            </div>
          </div>
          <div className="oblique-caption caption-top">
            <Link
              link={{ href: leftContent.link }}
              className="btn primary cursor-pointer rounded-full px-10"
            >
              <span>{leftContent.heading}</span>
            </Link>
          </div>
        </div>
        <div className="skew-block-repeat">
          <div className="oblique-inner">
            <div className="image-wrapper">
              <div className="main-image">
                <img
                  className="image-img"
                  src="https://picsum.photos/id/127/2400/1300"
                  alt=""
                ></img>
              </div>
            </div>
          </div>
          <div className="oblique-caption caption-bottom">
            <Link
              link={{ href: rightContent.link }}
              className="btn primary cursor-pointer rounded-full px-10"
            >
              <span>{rightContent.heading}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplittedContent;
