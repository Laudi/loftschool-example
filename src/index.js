/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
  let timer = seconds * 1000;
  var promiseOne = new Promise((resolve, reject) => {
    setTimeout(() => {
       resolve("result");
    }, timer);
  });
  return promiseOne;
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов можно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
  return new Promise((resolve, reject) =>{
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
    xhr.send();
   // 
    xhr.addEventListener('load', () => {
      let townsUnsort = [];
      let townsSort = [];
      if (xhr.status >= 400) {
        reject();
      } else {
        const townsUnsortObj = JSON.parse(xhr.responseText); // получили массив неотсортированных объектов
        for (const i of townsUnsortObj) { //получить массив несортированных названий городов 
          townsUnsort.push(i.name);
        }
        townsSort = townsUnsort.sort();
        resolve(townsSort);
      }
    });
  });
}

export {
    delayPromise,
    loadAndSortTowns
};
