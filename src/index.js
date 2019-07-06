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
  return new Promise(function(resolve){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true);
    
    xhr.onload = function() {  // событие сработает, когда скрипт загрузился и выполнился
      let result = JSON.parse(xhr.response);

      result.sort(function (a, b) {
          return (a.name > b.name) ? 1 : -1;
      });
      resolve(result);
    };
    xhr.send();
  
  });
}

export {
    delayPromise,
    loadAndSortTowns
};
