const files = require.context(".", true, /\.jsx$/);

const Modules = {};
files.keys().forEach((fileName) => {
  if (fileName === "./index.js") return;
  const componentName = fileName.replace(/^.+\/([^/]+)\.jsx$/, "$1");
  Modules[componentName] = files(fileName).default || files(fileName);
});

export default Modules;
