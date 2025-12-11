import React from "react";
import Head from "next/head";
import { ModuleBase } from "components";

const EmbedModule = ({ data }) => {
  const { inlineScriptEmbed, headingSectionScript } = data || {};
  return (
    <ModuleBase data={data} className="relative">
      <Head>
        <meta property="qqq" content="qqq" />
        {typeof window !== "undefined" &&
          headingSectionScript &&
          headingSectionScript.length > 0 && (
            <script>
              {headingSectionScript
                .replace(/<script>/, "")
                .replace(/<\/script>/, "")}
            </script>
          )}
        <meta property="qqq2" content="qqq2" />
      </Head>
      <div className="container">
        <div dangerouslySetInnerHTML={{ __html: inlineScriptEmbed }}></div>
      </div>
    </ModuleBase>
  );
};
export default EmbedModule;
