/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

// текстовое поле для фильтрации cookie

const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');
var filterOn = true;

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    if (filterNameInput.value === '') {
      filterOn = false;
  } else {
      filterOn = true;
  }
  cookiesAdd(getCookies());
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
  
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
    renderCookie(getCookies());
});

listTable.addEventListener('click', e => {
  if (e.target.nodeName == "BUTTON") {
    let delName = e.target.parentNode.parentNode.children[0].innerHTML;
    let delValue = e.target.parentNode.parentNode.children[1].innerHTML;  
    deleteCookie(delName, delValue);  
  } 
  
})

function renderCookie() {
  console.log(document.cookie);
  if (document.cookie.length>0) {
    const objCookie = document.cookie.split('; ').reduce((result, current) => {
      
      const [name, value] = current.split('=');
      if (filterNameInput.value) {

          var answer = isMatch(name, filterNameInput.value);
          var answerVall = isMatch(value, filterNameInput.value);
          if (answer || answerVall) {
            result.push({name, value})
          }
      } else {
        result.push({name, value})  
        //result[name] = value;
         
      }

      return result;
  }, []);
  cookiesAdd(objCookie);

  }
}

function isMatch (str, filterStr) {
  if (filterStr === '') {

      return false;
  }

  let re = new RegExp(filterStr, 'i');

  return (str.search(re) !== -1) ? true : false;
}

function cookiesFiltr(cookiesArray, str) {
  return cookiesArray.filter(function(item) {
      return isMatch(item.name, str) || isMatch(item.value, str); 
  });
}

function getCookies () {
  let cookiesStr;
  let cookies = [];

  cookiesStr = (document.cookie).split('; ');
  cookiesStr.forEach(cookie => {    
      const [name, value] = cookie.split('=');

      if (name && value) {
          cookies.push( { name: name, value: value } );
      }
  });

  return cookies;
}

function deleteCookie (name, path) {
  let date = new Date(0);
console.log(name);
  date = date.toUTCString();
  document.cookie = `${name}=; path=/; expires=${date}`; 
  renderCookie(getCookies());
}

function cookiesAdd (array) {
  console.log(array);
  let cookiesArray = array;

  listTable.innerHTML = ''; 
  if (filterNameInput.value) {
      cookiesArray = cookiesFiltr(array, filterNameInput.value);
  } 
  cookiesArray.forEach(function(item) {
      var tr = document.createElement('tr');
      var tdName = document.createElement('td');
      var tdValue = document.createElement('td');
      var tdAction = document.createElement('td');
      var btn = document.createElement('button');
  
      tdName.innerText = item.name;
      tdValue.innerText = item.value;
      tdAction.append(btn);
      btn.innerText = 'удалить'; 
      btn.setAttribute('data-cookie-name', item.name)
      tr.append(tdName, tdValue, tdAction);
      listTable.appendChild(tr);
  }) 
}

cookiesAdd(getCookies());