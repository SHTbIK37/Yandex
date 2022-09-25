const Worker = require("./WorkerClass");

const doOneWork = (arrayString) => {
  try {
    const worker = new Worker("./worker"); // создаём подпрограмму, которая займёт один из потоков

    worker.onMessage = ({ data }) => {
      // подписываемся на его сообщение
      // тут работа выполнена, используем data и освобождаем процесс
      worker.delete();
    };

    worker.postMessage(arrayString); // отправляем сообщение подпрограмме, чтобы он начал работу
  } catch (e) {
    // свободных потоков нет, ждём освобождения и создаём инстанс подпрограммы повторно
  }
};
