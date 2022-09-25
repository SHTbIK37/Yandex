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
// не останавливается код после нахождения элемента
export default function main(game, start) {
    const visited = {};
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        function internal(position) {
            return __awaiter(this, void 0, void 0, function* () {
                let x = position.x;
                let y = position.y;
                const state = yield game.state(x, y);
                if (state.finish)
                    resolve(position);
                if (visited[`x:${x};y${y}`] === true)
                    return {};
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
            });
        }
        internal(start);
    }));
}
