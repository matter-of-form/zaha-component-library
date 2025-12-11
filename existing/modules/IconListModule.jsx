import { ModuleBase, ResponsiveImage } from "components";
const IconListModule = ({ data }) => {
  function getNumberOfColumns(num) {
    if (num.toLowerCase() === "two") {
      return 2;
    } else if (num.toLowerCase() === "three") {
      return 3;
    } else {
      return 4;
    }
  }

  const noOfColumns = getNumberOfColumns(data.numberOfColumns);
  const itemsPerColumn = Math.floor(data.iconListElements.length / noOfColumns);
  const totalItems = itemsPerColumn * noOfColumns;

  const groups = [];

  for (let i = 0; i < totalItems; i += itemsPerColumn) {
    groups.push(data.iconListElements.slice(i, i + itemsPerColumn));
  }

  const remainder = data.iconListElements.length % noOfColumns;

  for (let i = 0; i < remainder; i++) {
    groups[i].push(data.iconListElements[itemsPerColumn * noOfColumns + i]);
  }

  const columns = () => {
    if (data.numberOfColumns.toLowerCase() === "two") {
      return "lg:w-1/2";
    } else if (data.numberOfColumns.toLowerCase() === "three") {
      return "md:w-[32%]";
    } else {
      return "lg:w-[24%]";
    }
  };

  return (
    <ModuleBase data={data} className="font-primary text-paragraph">
      <div className=" container">
        <div className={`list flex flex-wrap`}>
          {groups.map((group, index) => (
            <div
              className={`list-column lg:flex lg:flex-col lg:items-start w-1/2 mb-10 md:mb-20 lg:mb-0 ${columns()}`}
              key={index}
            >
              {group.map((item, index) => (
                <div className=" flex  items-center mb-6 last:mb-0" key={index}>
                  <div className="logo aspect-square w-[18px] h-[18px] mr-[15px]">
                    <ResponsiveImage
                      image={item.logo}
                      widths={{ xs: 36 }}
                      heights={{ xs: 36 }}
                      image-class="h-full w-full object-cover "
                      className=" h-full w-full object-cover"
                    />
                  </div>
                  <div className="list-item-text">
                    <p className="">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </ModuleBase>
  );
};

export default IconListModule;
