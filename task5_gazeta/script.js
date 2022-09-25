// root node = главный див
// columnCount = колво столбцов
// element gap = расстояние между колонками по горизонтали и объявлениями по вертикали
// https://contest.yandex.ru/contest/39360/problems
// 70157701 70157298 70156630
// WA 0/10
// по идее задача сделана
function renderWaterfall(rootNode, columnCount, elementGap) {
  document.body.style.margin = "0px";
  document.body.style.padding = "0px";
  rootNode.style.display = "flex";
  rootNode.style.flexDirection = "row";
  const width = rootNode.clientWidth;
  const columnWidht = (width - elementGap * (columnCount - 1)) / columnCount;
  for (let i = 0; i < columnCount; i++) {
    const column = document.createElement("div");
    column.setAttribute("class", `column${i}`);
    column.style.marginRight = `${elementGap}px`;
    column.style.width = `${columnWidht}px`;
    rootNode.append(column);
  }
  rootNode.lastChild.style.marginRight = "0px";
  let elems = rootNode.getElementsByClassName("el");

  elems = Array.from(elems);
  let heights = [];

  for (let i = 0; i < elems.length; i++) {
    let elemI;
    if (heights.length == columnCount) {
      const number = Math.min.apply(null, heights);

      if (number == Infinity) {
        elemI = i % columnCount;
      } else {
        for (let j = 0; j < heights.length; j++) {
          if (number == heights[j]) {
            elemI = j;
            break;
          }
        }
      }
    } else {
      elemI = i % columnCount;
    }

    const column = rootNode.getElementsByClassName(`column${elemI}`);
    elems[i].style.marginBottom = `${elementGap}px`;
    elems[i].style.width = `${columnWidht}px`;

    column[0].appendChild(elems[i]);
    if (heights[elemI] !== undefined) {
      heights[elemI] += elems[i].offsetHeight + elementGap;
    } else {
      heights[i % columnCount] = 0;
      heights[i % columnCount] += elems[i].offsetHeight + elementGap;
    }
  }
}
const root = document.getElementsByClassName("root")[0];
renderWaterfall(root, 4, 50);
