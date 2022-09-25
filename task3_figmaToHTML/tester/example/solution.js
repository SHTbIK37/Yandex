const STYLES_MAPPER = {
  fontSize: (value) => `font-size: ${value}px;`,
  fontWeight: (value) => `font-weight: ${value};`,
  textAlignHorizontal: (value) => `text-align: ${value.toLowerCase()};`,
  lineHeightPx: (value) => `line-height: ${value}px;`,
  counterAxisAlignItems: (value) => `align-items: ${value};`,
  counterAxisSizingMode: (value) =>
    `display: ${value === "FIXED" ? "flex" : "block"};`,
  layoutMode: (value) =>
    `display: flex; flex-direction: ${
      value === "VERTICAL" ? "column" : "row"
    };`,
  absoluteBoundingBox: ({ x, y, width, height }) =>
    `width: ${width}px; height: ${height}px;`,
  primaryAxisAlignItems: (value) =>
    `justify-content: ${value.replace("_", "-")};`,
  paddingTop: (value) => `padding-top: ${value}px;`,
  paddingLeft: (value) => `padding-left: ${value}px;`,
  paddingRight: (value) => `padding-right: ${value}px;`,
  paddingBottom: (value) => `padding-bottom: ${value}px;`,
};

const getStyles = (node) => {
  const styleArr = [];
  const { style, ...rest } = node;
  for (let [key, value] of Object.entries({ ...style, ...rest })) {
    if (value && STYLES_MAPPER[key]) {
      styleArr.push(STYLES_MAPPER[key](value));
    }
  }
  return styleArr.join(" ");
};

const buildBlock = ({ type, content, className, style }) =>
  `<${type} class="${className}" style="${style}">${content}</${type}>`;

const getCommonAttrs = (node) => ({
  content: node.characters,
  className: node.type,
  style: getStyles(node),
});

const PRIMITIVES = {
  TEXT: (node) =>
    buildBlock({
      type: "span",
      ...getCommonAttrs(node),
    }),
  BLOCK: (node) =>
    buildBlock({
      type: "div",
      ...getCommonAttrs(node),
    }),
};

const traverse = (node) => {
  const createElementFn = PRIMITIVES[node.type] || PRIMITIVES.BLOCK;

  if (!node.children || node.children.length === 0) {
    return createElementFn(node);
  }

  return createElementFn({
    ...node,
    characters: node.children.map((child) => traverse(child)).join(""),
  });
};

const parse = (entry) => traverse(entry.children[0]);

module.exports = function (json) {
  const entry = json.document.children[0];
  return parse(entry);
};
