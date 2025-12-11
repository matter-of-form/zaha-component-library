const setCacheControlForCDN = (req, res) => {
  if (req.url.startsWith("/favicon.ico")) {
    res.setHeader("Cache-Control", "public, max-age=2678400"); // 1 month
  } else if (req.url.startsWith("/imgs/")) {
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable"); // 1 year
  }
};

exports.setCacheControlForCDN = setCacheControlForCDN;
