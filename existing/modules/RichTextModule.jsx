import { ModuleBase, SectionContent } from "components";

const RichTextModule = ({ data }) => {
  return (
    <ModuleBase data={data}>
      <SectionContent
        data={{ description: data.content, ...data }}
        className="container"
        //preHeadingClassName="text-grey3"
        //descriptionClassName="richtext-content"
        //headingClassName="text-h2"
      />
    </ModuleBase>
  );
};
export default RichTextModule;
