// interface Worker {
//     /**
//      * Для создания инстанса нужно передать путь до исполняемого кода,
//      * в нашем случае это всегда "./worker".
//      *
//      * Не забудьте добавить обработчик исключения, так как если достигнут лимит потоков,
//      * нужно дождаться, пока можно будет создавать новые.
//      */
//     new (path: string);

//     /**
//      * Сюда нужно записать свою функцию-обработчик, чтобы принимать сообщения от программы.
//      */
//     onMessage?: (message: {data: string}) => void;

//     /**
//      * Эту функцию нужно вызвать для передачи данных нашей подпрограмме, который её захеширует.
//      */
//     postMessage: (text: string) => void;

//     /**
//      * После одного использования, нужно удалить инстанс подпрограммы,
//      * таким образом освобождать потоки для следующих программ.
//      */
//     delete: () => void;
// }

class WorkerClass {
  postMessage(text) {
    if (this.onMessage) {
      setTimeout(() => {
        this.onMessage({ data: cyrb53(text) });
      });
    }
  }
  delete() {}
}

const cyrb53 = function (str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

module.exports = WorkerClass;
