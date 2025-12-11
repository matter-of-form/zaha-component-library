const FormTitleAndDescription = ({
  settings = { captionTag: "", caption: "", bodyText: "" },
  ...props
}) => {
  const { captionTag, caption, bodyText } = settings;
  const CaptionTag = captionTag;

  return (
    <section className="form-title-and-description richtext-content" {...props}>
      {captionTag && <CaptionTag className="form-title">{caption}</CaptionTag>}
      <p className="form-description">{bodyText}</p>
    </section>
  );
};

export default FormTitleAndDescription;
