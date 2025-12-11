import { ModuleBase, Link, ResponsiveImage } from "components";
import PropTypes from "prop-types";
import Instagram from "assets/instagram.svg";
import Facebook from "assets/facebook.svg";
import Linkedin from "assets/linkedin.svg";
import Youtube from "assets/youtube.svg";
import Twitter from "assets/twitter.svg";

const FooterVertical = ({ data }) => {
  // const externalLink = {
  //   text: 'Open in google maps',
  //   href: 'http://basebuild.matterofform.com/',
  //   linkType: 'Content',
  //   target: '',
  // };
  return (
    <ModuleBase
      data={data}
      className="container font-primary pb-4 md:px-10"
      role="contentinfo"
      aria-label="footer"
    >
      {data.displaySocialLinks && (
        <div className="social-link-wrapper py-5 md:py-[42px] mb-10 lg:mb-16 flex justify-center border-b-[1px] border-b-solid border-b-grey4">
          {data.socialLinks.map((socialItem, socialIndex) => (
            <div
              className="social-link-item mr-[42px] last:mr-0"
              key={socialIndex}
            >
              {socialItem.socialPlatform.toLowerCase() === "facebook" ? (
                <Link link={socialItem.link}>
                  <Facebook />
                </Link>
              ) : socialItem.socialPlatform.toLowerCase() === "instagram" ? (
                <Link link={socialItem.link}>
                  <Instagram />
                </Link>
              ) : socialItem.socialPlatform.toLowerCase() === "linkedin" ? (
                <Link link={socialItem.link}>
                  <Linkedin />
                </Link>
              ) : socialItem.socialPlatform.toLowerCase() === "youtube" ? (
                <Link link={socialItem.link}>
                  <Youtube />
                </Link>
              ) : socialItem.socialPlatform.toLowerCase() === "twitter" ? (
                <Link link={socialItem.link}>
                  <Twitter />
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      )}

      <div className="main-data-wrapper flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-10 lg:mb-5">
        <div className="logo mx-auto h-fit lg:mx-0 mb-10 aspect-square max-w-[120px] md:max-w-[160px] lg:max-w-[184px]">
          <ResponsiveImage
            image={data.footerLogo}
            widths={{ xs: 120, md: 160, lg: 184, xl: 184 }}
            heights={{ xs: 120, md: 160, lg: 184, xl: 184 }}
            image-class="h-full w-full object-cover "
            className=" h-full w-full object-cover"
          />
        </div>

        {data.linkColumns && (
          <div className="center-data-wrapper w-full lg:w-[54%] mb-10 lg:ml-14 flex flex-col items-center md:flex-row md:justify-between">
            {data.linkColumns.map((columnItem, columnIndex) => (
              <div
                className="columns w-full md:w-[32%] text-center md:text-start mb-6 last:mb-0 md:mb-0"
                key={columnIndex}
              >
                <p className="font-[600] mb-4 text-paragraph">
                  {columnItem.columnHeading}
                </p>
                {columnItem.links.map((innerColumntItem, innerColumntIndex) => (
                  <div
                    className="inner-column-links mb-3 last:mb-0"
                    key={innerColumntIndex}
                  >
                    <Link
                      link={innerColumntItem}
                      className="font-[400] text-paragraph"
                    >
                      {innerColumntItem.text}
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {data.displayContactDetails && (
          <div className="contact-details w-full lg:w-[20%] mb-14 md:b-16 lg:mb-20 flex flex-col items-center justify-center md:flex-row md:justify-between lg:flex-col lg:items-start">
            <div className="inner-wrapper-first text-center md:text-start w-full md:w-1/2 lg:w-full">
              <p className="font-[600] mb-2 text-paragraph">
                {data.contactsLabel}
              </p>
              {data.displayAddress && (
                <div className="adress text-center md:text-start">
                  <p className="text-small-paragraph mb-2">
                    {data.addressStreet}
                  </p>
                  <p className="text-small-paragraph mb-2">
                    {data.addressCity}
                  </p>
                  <p className="text-small-paragraph mb-2">
                    {data.addressCountry}
                  </p>
                  <p className="text-small-paragraph mb-0">
                    {data.addressPostCode}
                  </p>
                </div>
              )}

              {data.googleMaps && (
                <div className="external-link-wrapper  mt-6 mb-7 md:mb-0 lg:mb-6">
                  <Link
                    link={data.googleMaps}
                    className="font-[600] after:content-externalLink text-small-paragraph flex justify-center md:justify-start gap-3 items-center"
                  >
                    {data.googleMaps.text}
                  </Link>
                </div>
              )}
            </div>

            <div className="phone-and-email flex flex-col items-center md:items-start  w-full md:w-[32%] lg:w-full">
              <a
                href={`tel:${data.phoneNumber}`}
                className="border-b w-fit mb-4 text-small-paragraph"
              >
                {data.phoneNumber}
              </a>
              <a
                href={`mailto:${data.emailAddress}`}
                className="border-b w-fit text-small-paragraph"
              >
                {data.emailAddress}
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="bottom-data flex flex-col lg:flex-row">
        <div className="bottom-links flex flex-col justify-center items-center md:flex-row md:justify-start md:items-start">
          {data.bottomLinks.map((bottomLinkItem, bottomLinkIndex) => (
            <div
              className="bottom-link-item text-tiny-paragraph mb-6 md:mb-0 md:mr-10 md:last:mr-0 last:mb-0"
              key={bottomLinkIndex}
            >
              <Link link={bottomLinkItem} />
            </div>
          ))}
        </div>
        <div className="copy-right text-center mt-4 lg:mt-0 lg:ml-auto md:text-start text-tiny-paragraph">
          <p>{data.copyrightText}</p>
        </div>
      </div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </ModuleBase>
  );
};

export default FooterVertical;

FooterVertical.propTypes = {
  data: PropTypes.any.isRequired,
};
