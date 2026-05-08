import classnames from "classnames";

export const richTextAndTwoMedia = (data: any, props: any) => ({
  className: classnames([
    "rich-text-and-two-media-stacked",
    [data?.mediaAlignment?.toLowerCase()],
    [data?.mediaOrientation?.toLowerCase()],
    { "hide-overlay": data?.hideOverlay },
    props.className,
  ]),
});
