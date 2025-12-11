import { ModuleBase } from "components";
import SectionContent from "components/cards/SectionContent.jsx";

const HeadingVerticalModule = ({ data }) => {
  return (
    <ModuleBase data={data}>
      <div className="container">
        <SectionContent
          data={data}
          //preHeadingClassName="text-paragraph text-grey3 my-0"
          //headingClassName={`font-primary  text-h2 color-from-bg font-[300] my-5`}
          //descriptionClassName="font-[300] font-primary text-h6"
          className={`[&_.button-wrapper]:justify-end [&_.primary]:mt-11 [&_.secondary]:mt-11
           [&_.primary]:md:mt-14 [&_.secondary]:md:mt-14 [&_.primary]:mr-4 [&_.primary]:lg:mt-[75px]
            [&_.secondary]:lg:mt-[75px] [&_.subHeading]:font-[600] [&_.description-wrapper]:mt-0`}
        />
      </div>
    </ModuleBase>
  );
};

export default HeadingVerticalModule;
