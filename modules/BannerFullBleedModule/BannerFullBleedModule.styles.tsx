import classnames from "classnames";

export const BannerFullBleedMedia = (props: any, data: any) => ({
  className: classnames("banner-full-bleed", props.className, {
    "with-video": data?.media?.coverImage || data?.backgroundMedia?.coverImage,
  }),
});
