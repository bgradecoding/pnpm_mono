import { FIGMA_API_TOKEN, FIGMA_FILE_ID, FIGMA_ICON_NODE_ID } from "./const.js";
import api from "axios";
import { transform } from "@svgr/core";
import fs from "fs";

const headers = {
  "X-FIGMA-TOKEN": FIGMA_API_TOKEN,
};
const figmaFiles = () =>
  api.create({
    baseURL: `https://api.figma.com/v1/files/${FIGMA_FILE_ID}/nodes?ids=${FIGMA_ICON_NODE_ID}`,
    headers,
  });

const getDocument = async () => {
  const { data } = await figmaFiles().get();

  return data;
};

const getComponents = async () => {
  const document = await getDocument();
  return document.nodes[FIGMA_ICON_NODE_ID].document.children
    .filter((child) => child.type === "COMPONENT")
    .map((frame) => {
      return {
        name: frame.name,
        id: frame.id,
      };
    }); // (2)
};

const figmaImages = api.create({
  baseURL: `https://api.figma.com/v1/images/${FIGMA_FILE_ID}`,
  headers,
});

// (1) GET image : getComponents에서 얻은 node id 배열을 활용하여 다시 api 작업을 진행한다.
const getSvgData = async () => {
  const componets = await getComponents();
  const ids = componets.map((comp) => comp.id).join(",");
  const total = componets.length;

  // NOTE: id값들을 ,로 join하여 string으로 변환한 뒤, api를 호출하면 svg 데이터를 객체로 한 번에 받을 수 있다.
  const { data } = await figmaImages.get(
    `?ids=${ids}&format=svg&svg_include_id=false`
  );
  const { images } = data;

  return {
    total,
    datas: componets.map((component) => {
      return {
        id: component.id,
        name: component.name,
        url: images[component.id],
      };
    }),
  };
};

const convertSvgToReactComponent = async (svg, svgName) => {
  const jsCode = await transform(
    svg,
    {
      plugins: [
        "@svgr/plugin-svgo",
        "@svgr/plugin-jsx",
        "@svgr/plugin-prettier",
      ],
      icon: true,
      typescript: true,
      jsxRuntime: "automatic",
    },
    {
      componentName: svgName
        .replace("Type=", "")
        .replace("_<<", "")
        .replace("_<", ""),
    }
  );
  return jsCode;
};

const generateIconComponent = async () => {
  const { datas } = await getSvgData();
  const components = await Promise.all(
    datas.map(async (data) => {
      const svg = await api.get(data.url);
      const code = await convertSvgToReactComponent(svg.data, data.name);
      fs.writeFile(
        `../ui-core/src/components/icons/${data.name
          .replace("Type=", "")
          .replace("_<<", "")
          .replace("_<", "")}.tsx`,
        code,
        (err) => {
          if (err) {
            console.error(err);
          }
          // file written successfully
        }
      );
    })
  );

  return components;
};

generateIconComponent().then((components) => {
  console.log(components);
});
