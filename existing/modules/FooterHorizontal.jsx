import { ModuleBase, Link, ResponsiveImage } from "components";
import PropTypes from "prop-types";
import Instagram from "assets/instagram.svg";
import Facebook from "assets/facebook.svg";
import Linkedin from "assets/linkedin.svg";
import Youtube from "assets/youtube.svg";
import Twitter from "assets/twitter.svg";

const FooterHorizontal = ({ data }) => {
  const linkWrapperClass = `
  link-wrapper border-b border-b-solid border-b-grey4 pt-6 pb-6 flex flex-col items-center justify-center
  md:pb-8 md:flex-row md:flex-wrap md:justify-between 
  lg:flex-nowrap lg:pt-10 lg:pb-10`;

  const linkItemClass = `
  font-[400] w-full text-center link-item text-small-paragraph 
  md:text-paragraph md:w-[33%] mb-4 last:mb-0 md:mb-3 md:last:mb-3
  lg:mb-0 lg:last:mb-0`;

  return (
    <ModuleBase
      data={data}
      className="container font-primary pb-4 md:px-10"
      role="contentinfo"
      aria-label="footer"
    >
      <div className={`${linkWrapperClass}`}>
        {data.links.map((linkItem, linkIndex) => (
          <Link link={linkItem} key={linkIndex} className={`${linkItemClass}`}>
            {linkItem.text}
          </Link>
        ))}
      </div>
      <div className="main-data-wrapper mt-6 md:mt-8 lg:mt-10">
        <div className="logo-and-details-wrapper w-full lg:flex lg:justify-between">
          <div className="logo w-full lg:w-[20%]  mx-auto h-fit md:mx-0 mb-6 aspect-square max-w-[120px] md:max-w-[160px] lg:max-w-[184px]">
            <ResponsiveImage
              image={data.footerLogo}
              widths={{ xs: 120, md: 160, lg: 184, xl: 184 }}
              heights={{ xs: 120, md: 160, lg: 184, xl: 184 }}
              image-class="h-full w-full object-cover "
              className=" h-full w-full object-cover"
            />
          </div>

          <div className="details w-full lg:w-[78%] flex flex-col md:flex-row md:justify-between md:mb-14">
            {data.displayAddress && (
              <div className="adress-wrapper w-full md:w-[32%] lg:w-[25%] text-center md:text-left">
                <p className="font-[600] mb-2 text-paragraph">
                  {data.findUsLabel}
                </p>

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

                {data.googleMaps && (
                  <div className="external-link-wrapper mt-6 mb-10 md:mb-0 ">
                    <Link
                      link={data.googleMaps}
                      className="font-[600] after:content-externalLink text-small-paragraph flex justify-center md:justify-start gap-3 items-center"
                    >
                      {data.googleMaps.text}
                    </Link>
                  </div>
                )}
              </div>
            )}

            {data.displayContactDetails && (
              <div className="contacts-wrapper w-full md:w-[32%] lg:w-[25%] text-center md:text-left">
                <p className="font-[600] mb-4 text-paragraph">
                  {data.contactsLabel}
                </p>

                <div className="phone-and-email mb-6 md:mb-0 flex flex-col items-center md:items-start  w-full">
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

            {data.displaySocialLinks && (
              <div className="social-wrapper w-full md:w-[32%] lg:w-[25%] text-center md:text-left mb-10 md:mb-0">
                <p className="font-[600] mb-[18px] text-paragraph">
                  {data.followLabel}
                </p>

                <div className="social-links flex justify-center flex-wrap md:justify-start">
                  {data.socialLinks.map((socialItem, socialIndex) => (
                    <div
                      className="social-link-item mr-[42px] md:mr-[25px] last:mr-0 md:mb-2"
                      key={socialIndex}
                    >
                      {socialItem.socialPlatform.toLowerCase() ===
                      "facebook" ? (
                        <Link link={socialItem.link}>
                          <Facebook role="presentation" />
                        </Link>
                      ) : socialItem.socialPlatform.toLowerCase() ===
                        "instagram" ? (
                        <Link link={socialItem.link}>
                          <Instagram role="presentation" />
                        </Link>
                      ) : socialItem.socialPlatform.toLowerCase() ===
                        "linkedin" ? (
                        <Link link={socialItem.link}>
                          <Linkedin role="presentation" />
                        </Link>
                      ) : socialItem.socialPlatform.toLowerCase() ===
                        "youtube" ? (
                        <Link link={socialItem.link}>
                          <Youtube role="presentation" />
                        </Link>
                      ) : socialItem.socialPlatform.toLowerCase() ===
                        "twitter" ? (
                        <Link link={socialItem.link}>
                          <Twitter role="presentation" />
                        </Link>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bottom-data flex flex-col md:flex-row">
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
        <div className="copy-right text-center md:ml-auto md:text-start text-tiny-paragraph mt-6 md:mt-0">
          <p>{data.copyrightText}</p>
        </div>
      </div>
    </ModuleBase>
  );
};

export default FooterHorizontal;

FooterHorizontal.propTypes = {
  data: PropTypes.any.isRequired,
};
