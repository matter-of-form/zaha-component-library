import dynamic from "next/dynamic";

const ReactJson = dynamic(
  () =>
    import("@microlink/react-json-view").then(
      (m) => m.default as unknown as React.ComponentType<any>,
    ),
  { ssr: false },
);

const JSON = ({ data }: { data: any }) =>
  data && <ReactJson src={data} collapsed={1} theme="chalk" />;

export default JSON;
