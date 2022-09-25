// https://contest.yandex.ru/contest/39361/problems/
// 69976071
// task 4 promise
// 26.25 /30
// не останавливается код после нахождения элемента
export default function main(game, start) {
  const visited = {};

  return new Promise(async (resolve) => {
    async function internal(position) {
      let x = position.x;
      let y = position.y;

      const state = await game.state(x, y);
      if (state.finish) resolve(position);

      if (visited[`x:${x};y${y}`] === true) return {};
      visited[`x:${x};y${y}`] = true;

      if (state.top) {
        game.up(x, y).then(() => internal({ x, y: y - 1 }));
      }
      if (state.bottom) {
        game.down(x, y).then(() => internal({ x, y: y + 1 }));
      }
      if (state.left) {
        game.left(x, y).then(() => internal({ x: x - 1, y }));
      }
      if (state.right) {
        game.right(x, y).then(() => internal({ x: x + 1, y }));
      }

      return {};
    }

    internal(start);
  });
}
