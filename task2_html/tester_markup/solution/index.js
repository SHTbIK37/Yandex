/**
 * Сюда необходимо вставить разметку, которая будет находиться внутри тега <body>
 * ВАЖНО! тег <body> вставлять не надо, только то, что будет внутри (включая стили)
 */
const htmlFragment = `<style>
.list {
  padding: 16px;
}
.list__title {
  font-size: 18px;
  line-height: 22px;
  margin-top: 0;
  margin-bottom: 16px;
}
.list__items {
  display: flex;
  flex-shrink: 1;
  flex-direction: row;
}
.list__items__card {
  box-sizing: border-box;
  margin-right: 16px;
  padding: 16px;
  background-color: #f8f8f8;
  border-radius: 24px;
  width: 181px;
}
.list__items__card:last-child {
  margin-right: 0;
}
.list__items__card__img {
  margin-bottom: 16px;
  height: 138px;
  background-color: #c4c4c4;
  border-radius: 16px;
}
.list__items__card__button {
  width: 100%;
  font-size: 12px;
  line-height: 15px;
  border: none;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 10px;
}
</style>
<div class="list">
<p class="list__title">Список товаров</p>
<div class="list__items">
  <div class="list__items__card">
    <div class="list__items__card__img"></div>
    <button class="list__items__card__button">Купить</button>
  </div>
  <div class="list__items__card">
    <div class="list__items__card__img"></div>
    <button class="list__items__card__button">Купить</button>
  </div>
  <div class="list__items__card">
    <div class="list__items__card__img"></div>
    <button class="list__items__card__button">Купить</button>
  </div>
</div>
</div>`;

module.exports = function () {
  return htmlFragment;
};
