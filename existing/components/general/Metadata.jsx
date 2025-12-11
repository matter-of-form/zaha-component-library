import Head from "next/head";
import PropTypes from "prop-types";
import Script from "next/script";

const Metadata = ({ metadata }) => {
  if (!metadata) return;

  const vanillaScripts = metadata.headSectionScripts
    .map((s) => {
      if (!s || s === "") return null;
      return s.replace(/<script[^>]*>/g, "").replace(/<\/script>/g, "");
    })
    .join("\n");

  const scriptSrcs = [];
  metadata.headSectionScripts.forEach((s) => {
    if (s && s !== "") {
      scriptSrcs.push(
        .../src\s*=\s*"([^"]+)/g
          .exec(s)
          .filter((res) => !res.startsWith("src=")),
      );
    }
  });

  const hreflangs = [];

  if (metadata.languages && metadata.languages.length > 0) {
    let currentHost = null;
    if (process.env.NODE_ENV === "development") {
      currentHost = process.env.DEV_FRONTEND_HOST;
    } else {
      if (typeof window === "undefined") {
        currentHost = process.env.RESOURCE_PATH.slice(0, -1);
      } else {
        currentHost = window?.location?.origin;
      }
    }

    metadata.languages.forEach((language) => {
      if (language.language === "en-us") {
        hreflangs.push(
          <link
            hid="hreflang-x-default"
            rel="alternate"
            href={currentHost + language.languageUrl}
            hrefLang="x-default"
          />,
        );
      }

      hreflangs.push(
        <link
          hid="canonical"
          rel="alternate"
          href={currentHost + language.languageUrl}
          hrefLang={language.language === "en-us" ? "en" : language.language}
        />,
      );
    });
  }

  return (
    <>
      {scriptSrcs.map((script, index) => (
        <Script key={index} src={script} defer />
      ))}

      <Head>
        <title>{metadata.pageTitle}</title>
        <meta name="keywords" content={metadata.metaKeywords} />
        <meta name="description" content={metadata.metaDescription} />
        <meta property="og:url" content={metadata.absolutePageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.openGraphPageTitle} />
        <meta
          property="og:description"
          content={metadata.openGraphDescription}
        />
        <meta property="og:image" content={metadata.openGraphImageUrl} />
        <link rel="canonical" href={metadata.canonicalLink} />

        {...hreflangs}

        {metadata.hideFromSearch && <meta name="robots" content="noindex" />}

        {metadata.headSectionScripts &&
          metadata.headSectionScripts.length > 0 && (
            <script
              dangerouslySetInnerHTML={{
                __html: vanillaScripts,
              }}
            />
          )}

        {metadata.structuredDataTags.map((element, index) => (
          <script
            key={index}
            type="application/ld+json"
            id="structuredDataTags"
          >
            {element}
          </script>
        ))}

        {metadata.favicon?.imageUrl && (
          <link rel="icon" type="image/png" href={metadata.favicon.imageUrl} />
        )}
      </Head>
    </>
  );
};

Metadata.propTypes = {
  metadata: PropTypes.object.isRequired,
};

export default Metadata;
