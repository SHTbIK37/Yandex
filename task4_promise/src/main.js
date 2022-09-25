// https://contest.yandex.ru/contest/39361/problems/
// 69976071
// 26.25 /30
export default function main(game, start) {
  let x = start.x;
  let y = start.y;
  let visited = {};
  let flag = 0;
  return new Promise((resolve, reject) => {
    async function findWay(game, xx, yy) {
      if (flag == 1) {
        return {};
      }
      let x = xx;
      let y = yy;
      if (visited[`${x},${y}`] == true) {
        return {};
      } else {
        visited[`${x},${y}`] = true;
      }
      let state = await game.state(x, y);
      if (state.finish) {
        flag = 1;
        return resolve({ x, y });
      }
      if (state.right) {
        await game.right(x, y);
        findWay(game, x + 1, y);
      }
      if (state.bottom) {
        await game.down(x, y);
        findWay(game, x, y + 1);
      }
      if (state.left) {
        await game.left(x, y);
        findWay(game, x - 1, y);
      }
      if (state.top) {
        await game.up(x, y);
        findWay(game, x, y - 1);
      }
    }
    findWay(game, x, y);
  });

  // return Promise.resolve({ x, y });
  // return game
  //   .right(start.x, start.y)
  //   .then(() => game.right(start.x + 1, start.y))
  //   .then(() => game.right(start.x + 2, start.y))
  //   .then(() => game.right(start.x + 3, start.y));
  // // .then(() => ({ x: start.x + 4, y: start.y }));
}
