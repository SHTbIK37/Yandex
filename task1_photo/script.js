// 69905536
// https://contest.yandex.ru/contest/39366/problems
// 17/20
function solution(n, width, height) {
  const columnCounter = Math.ceil(Math.sqrt(n));
  const ratio = width / height; // соотношение сторон
  const firstStringElem = n % columnCounter; // остаток это и есть кол во элементов в первой строке, если 0 то во всех строках одиниковое колво элементов
  if (firstStringElem) {
    let photoArray = [];
    const elemString = columnCounter; // колво элементво в строке
    const stringCounter = Math.ceil(n / elemString); // колво строк
    const photoWidth = Math.round(width / columnCounter); // ширина фотки
    const photoHeight = Math.round(photoWidth / ratio); // высота фотки
    const generalHeight = photoHeight * stringCounter; // общая высота фоток
    const differenceVertical = height - generalHeight;
    const differenceHorizontal = width - firstStringElem * photoWidth;
    let photoCenter = Math.round(photoWidth / 2);
    let flag;
    let resultX;
    if (differenceVertical > 0) {
      for (let j = 0; j < stringCounter; j++) {
        for (let i = 0; i < elemString; i++) {
          if (j == 0 && i >= firstStringElem) {
            flag = 1;
            break;
          }

          if (i == 0 && j == 0) {
            resultX = differenceHorizontal / 2 + photoCenter;
          } else {
            if (j == 0) {
              resultX = differenceHorizontal / 2 + photoCenter + i * photoWidth;
            } else {
              if (flag == 1) {
                resultX = photoCenter + photoWidth * i;
              }
            }
          }
          photoArray.push({
            width: photoWidth,
            height: photoHeight,
            x: Math.round(resultX),
            y:
              j == 0
                ? differenceVertical / 2
                : differenceVertical / 2 + photoHeight * j,
          });
        }
      }
      return photoArray;
    } else {
      for (let j = 0; j < stringCounter; j++) {
        for (let i = 0; i < elemString; i++) {
          if (j == 0 && i >= firstStringElem) {
            flag = 1;
            break;
          }

          if (i == 0 && j == 0) {
            resultX = differenceHorizontal / 2 + photoCenter;
          } else {
            if (j == 0) {
              resultX = differenceHorizontal / 2 + photoCenter + i * photoWidth;
            } else {
              if (flag == 1) {
                resultX = photoCenter + photoWidth * i;
              }
            }
          }

          photoArray.push({
            width: photoWidth,
            height: photoHeight,
            x: Math.round(resultX),

            y: j == 0 ? 0 : photoHeight * j,
          });
        }
      }
      return photoArray;
    }
  } else {
    let photoArray = [];
    const elemString = columnCounter; // колво элементво в строке
    const stringCounter = Math.ceil(n / elemString); // колво строк
    const photoWidth = Math.round(width / columnCounter); // ширина фотки
    const photoHeight = Math.round(photoWidth / ratio); // высота фотки
    const generalHeight = photoHeight * stringCounter; // общая высота фоток
    const differenceVertical = height - generalHeight;
    let photoCenter = Math.round(photoWidth / 2);
    if (differenceVertical > 0) {
      for (let j = 0; j < stringCounter; j++) {
        for (let i = 0; i < elemString; i++) {
          photoArray.push({
            width: photoWidth,
            height: photoHeight,
            x: i == 0 ? photoCenter : photoCenter + photoWidth * i,
            y:
              j == 0
                ? differenceVertical / 2
                : differenceVertical / 2 + photoHeight * j,
          });
        }
      }
      return photoArray;
    } else {
      for (let j = 0; j < stringCounter; j++) {
        for (let i = 0; i < elemString; i++) {
          photoArray.push({
            width: photoWidth,
            height: photoHeight,
            x: i == 0 ? photoCenter : photoCenter + photoWidth * i,
            y: j == 0 ? 0 : photoHeight * j,
          });
        }
      }
      return photoArray;
    }
  }
}
module.exports = solution;
