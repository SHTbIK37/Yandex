var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// https://contest.yandex.ru/contest/39361/problems/
// 69976071
// task 4 promise
// 26.25 /30
// не останавливается код после нахождения элемента done
export default function main(game, start) {
    let x = start.x;
    let y = start.y;
    let visited = {};
    let flag = 0;
    return new Promise((resolve, reject) => {
        function findWay(game, xx, yy) {
            return __awaiter(this, void 0, void 0, function* () {
                if (flag == 1) {
                    return {};
                }
                let x = xx;
                let y = yy;
                if (visited[`${x},${y}`] == true) {
                    return {};
                }
                else {
                    visited[`${x},${y}`] = true;
                }
                let state = yield game.state(x, y);
                if (state.finish) {
                    flag = 1;
                    return resolve({ x, y });
                }
                if (state.right) {
                    yield game.right(x, y);
                    findWay(game, x + 1, y);
                }
                if (state.bottom) {
                    yield game.down(x, y);
                    findWay(game, x, y + 1);
                }
                if (state.left) {
                    yield game.left(x, y);
                    findWay(game, x - 1, y);
                }
                if (state.top) {
                    yield game.up(x, y);
                    findWay(game, x, y - 1);
                }
            });
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
