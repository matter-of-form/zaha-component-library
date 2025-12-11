import { ModuleBase, Media } from "components";

const ListAndMediaModule = ({ data }) => {
  return (
    <ModuleBase data={data} className="relative lg:px-[108px]">
      <div
        className={`container  main-data flex flex-col lg:justify-between   ${
          data.mediaAlignment === "Left"
            ? "lg:flex-row-reverse"
            : " lg:flex-row"
        }`}
      >
        <div
          className={`img-wrapper w-full max-w-[270px] md:max-w-[419px] lg:max-w-[496px] lg:my-auto mb-14 md:mb-10 
             relative aspect-3/4 
             ${data.mediaAlignment === "Left" ? "self-start" : "self-end "}`}
        >
          <Media
            media={data.media}
            widths={{ xs: 213, sm: 213, md: 332, lg: 392, xl: 392, xxl: 392 }}
            className="h-full w-full object-cover"
          />
        </div>

        <div
          className={`stats-wrapper flex flex-col  lg:my-auto lg:w-[47%] lg:max-w-[496px] color-from-bg 
        ${data.mediaAlignment === "Left" ? "md:items-start md:pl-[104px]" : "md:items-center "}
        `}
        >
          {data.statElements.map((statItem, statIndex) => (
            <div
              key={statIndex}
              className="stats mb-10 last:mb-0  md:w-[30%] lg:w-full"
            >
              <p className="font-primary font-normal text-[16px] leading-[24px] lg:text-[14px] lg:leading-[20px]">
                {statItem.statisticsLabel}
              </p>

              <p className="font-primary text-h4 color-from-bg">
                {statItem.statistics}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ModuleBase>
  );
};

export default ListAndMediaModule;
