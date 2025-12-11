let redirectList = null;

const getRedirects = async () => {
  console.info("[RM] Reading redirects list from CMS");
  try {
    const redir = await fetch(
      `${process.env.API_URL || "https://qa-bb-api.matterofform.com/"}umbraco/api/Redirects/GetRedirects`,
    );
    redirectList = await redir.json();
  } catch (error) {
    redirectList = [];
    console.error("[RM] error: " + error);
  }
};

const cmsRedirect = async (req, res, parsedUrl) => {
  const { pathname } = parsedUrl;

  if (pathname === "/clear-redirect-cache") {
    await getRedirects();
    res.write("Redirect cache reloaded");
    res.end();
  }

  if (!redirectList) {
    await getRedirects();
  }

  const redirect = redirectList.find((item) => item.url === req.url);
  if (redirect) {
    console.log(`[RM] Redirecting ${req.url} to ${redirect.destinationUrl}`);
    res.writeHead(301, {
      Location: redirect.destinationUrl,
    });
    res.end();
  }
};

exports.cmsRedirect = cmsRedirect;
exports.getRedirects = getRedirects;
