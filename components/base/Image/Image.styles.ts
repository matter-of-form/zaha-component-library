export const spacer = {
  className: "w-full h-full",
};

const CLOUDFLARE_GRAVITY_MAP: Record<string, string> = {
  left: "0% 50%",
  right: "100% 50%",
  top: "50% 0%",
  bottom: "50% 100%",
  center: "50% 50%",
  auto: "50% 50%",
};

export const focalPointSettings = (focalPoint?: string) => {
  if (!focalPoint) return {};

  const trimmed = focalPoint.trim().toLowerCase();

  // Cloudflare named gravity values (auto, left, right, top, bottom, center)
  if (trimmed in CLOUDFLARE_GRAVITY_MAP) {
    return { objectPosition: CLOUDFLARE_GRAVITY_MAP[trimmed] };
  }

  // Cloudflare coordinate format: "0.5x0.3"
  if (/^[\d.]+x[\d.]+$/.test(trimmed)) {
    const [x, y] = trimmed.split("x");
    return {
      objectPosition: `${Math.round(parseFloat(x) * 100)}% ${Math.round(parseFloat(y) * 100)}%`,
    };
  }

  return {};
};
