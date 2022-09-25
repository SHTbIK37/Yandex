// 70347684
// 20/40
// https://contest.yandex.ru/contest/39364/finish/#2050165/2022_02_17/RqeUnE87Rd
export default function (html, css) {
  function traversal(element, parentElems = [], siblingsTags = []) {
    const elemTag = element.tag;
    if (!elemTag) return;

    // TODO: нужно выставить правильный порядок в зависимости от приоритета комбинатора

    addStyles(elemTag, element);

    const parentElement = parentElems[parentElems.length - 1];
    if (parentElement) {
      addStyles(`${parentElement.tag} > ${elemTag}`, element, parentElement);
    }

    for (let parentElement of parentElems.slice(0, parentElems.length - 1)) {
      addStyles(`${parentElement.tag} ${elemTag}`, element);
    }

    for (let sibling of siblingsTags.slice(0, siblingsTags.length - 1)) {
      addStyles(`${sibling.tag} ~ ${elemTag}`, element);
    }

    const prevSibling = siblingsTags[siblingsTags.length - 1];
    if (prevSibling) {
      addStyles(`${prevSibling.tag} + ${elemTag}`, element);
    }

    const nextSiblings = [...siblingsTags];
    element.children.forEach((child, index) => {
      if (index !== 0) {
        const prevElem = element.children[index - 1];
        if (prevElem.tag) nextSiblings.push(prevElem);
      }
      traversal(child, [...parentElems, element], [...nextSiblings]);
    });
  }

  function addStyles(elemSelector, element, parentElement) {
    const cssObj = css.find(({ selector }) => selector === elemSelector);

    if (parentElement && parentElement.styles) {
      for (let property in parentElement.styles) {
        if (inheretedProperties.has(property)) {
          element.styles[property] = parentElement.styles[property];
        }
      }
    }

    if (cssObj && cssObj.declarations) {
      for (let property in cssObj.declarations) {
        element.styles[property] = cssObj.declarations[property];
      }
    }
  }

  const inheretedProperties = new Set([
    "border-collapse",
    "border-spacing",
    "caption-side",
    "color",
    "cursor",
    "direction",
    "empty-cells",
    "font-family",
    "font-size",
    "font-style",
    "font-variant",
    "font-weight",
    "font-size-adjust",
    "font-stretch",
    "font",
    "letter-spacing",
    "line-height",
    "list-style-image",
    "list-style-position",
    "list-style-type",
    "list-style",
    "orphans",
    "quotes",
    "tab-size",
    "text-align",
    "text-align-last",
    "text-decoration-color",
    "text-indent",
    "text-justify",
    "text-shadow",
    "text-transform",
    "visibility",
    "white-space",
    "widows",
    "word-break",
    "word-spacing",
    "word-wrap",
  ]);

  traversal(html);
  return html;
}
