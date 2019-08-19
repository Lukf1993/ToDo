const deleteObjectButton = document.querySelector(".js-deleteObject");
const addObjectButton = document.querySelector(".js-addObject");
const cloneButton = document.querySelector(".js-cloneObject");
const textVal = document.querySelector(".js-addText");
const mainContainter = document.querySelector("#main");
const listItem = document.querySelectorAll(".js-item");

let models = [];

function addListItem(title, status) {
  const listElement = {
    title: title,
    status: status,
    checked: false,
    id: Math.floor((Math.random() * 100)),
  }
  models.push(listElement);
  models.sort(sortBy('title'));
  render();
}

const sortBy = param => (a, b) => {
  if(a[param] < b[param]) { return -1; }
  if(a[param] > b[param]) { return 1; }
  return 0;
}

// function sortBy(param) {
//   (a, b) => {
//     console.log(a);
//     console.log(b);
//     console.log(param);
//     if(a[param] < b[param]) { return -1; }
//     if(a[param] > b[param]) { return 1; }
//     return 0;
//   }
// }

function sortElement(a, b) {
  if(a.title < b.title) { return -1; }
  if(a.title > b.title) { return 1; }
  return 0;
}

function sortByStatus(a, b) {
  if(a.status < b.status) { return -1; }
  if(a.status > b.status) { return 1; }
  return 0;
}


function addEvents() {

  const checkboxes = document.querySelectorAll("input[type=checkbox]");
  checkboxes.forEach(item => item.addEventListener('change', function(){
    toggleParametr(Number(item.parentNode.id), "checked");
  }));

  const changeStatusButton = document.querySelectorAll('.changeStatus');
  changeStatusButton.forEach(item => item.addEventListener('click', function(){
    toggleParametr(Number(item.parentNode.id), "status");
    dezactiveAll();
  }))

  const deleteB = document.querySelectorAll('.delete');
  deleteB.forEach(item => item.addEventListener('click', function() {
    console.log(typeof (item.parentNode.id));
    deleteOneElement(Number(item.parentNode.id), models);
  }));
}

function toggleParametr(id, parametr) {
  models.forEach((item) => {
    if(typeof item[parametr] === 'boolean' && item.id === id){
      item[parametr] = !item[parametr];
    }
  });
  render();
}

function dezactiveAll() {
  models.forEach(item => item.checked = false);
}

function deleteListItem(status, arr) {
  console.log(arr);
  models = arr.filter(item => item.status !== status);
  render();
}

function deleteOneElement(id, arr) {
  models = arr.filter(item => item.id !== id );
  console.log(id);
  console.log(arr);
  render();
}

function cloneObject(arr) {
  models.forEach((item) => {
    if(arr.find(id => id === item.id)) {
      const newItem = JSON.parse(JSON.stringify(item));
      newItem.id = Math.floor((Math.random() * 100))
      models.push(newItem);
    }
  });
  dezactiveAll(arr);
  render();
};

cloneButton.addEventListener('click', function(){
  const newArr = models.map(function(item){
    if(item.checked === true){
      return item.id
    }
  });
  cloneObject(newArr);
});

deleteObjectButton.addEventListener('click', function(){
  deleteListItem(false, models);
});

addObjectButton.addEventListener('click', function(){
  if(textVal.value == ""){
    throw alert("Wpisz tekst");
  } else {
      addListItem(textVal.value, false);
      textVal.value = ''
  }
});

function renderList(list, container){
    list.forEach(function(item){
    let listItem = document.createElement("li");

    listItem.id = item.id;
    listItem.className = `js-item`;
    listItem.innerHTML = `<input type="checkbox" ${item.checked === true ? 'checked' : ''}><label>
      <strong>${item.title}</strong>&nbsp
      <p>${item.status === false ? "Do zrobienia" : "Zrobione"}</p></label>
      <button class="delete">usuń</button>
      <button class="changeStatus">Zmień Status</button>`;

      container.appendChild(listItem);
  });
};



function renderAll() {
  models.sort(sortBy('id'));
  let toDoList = document.createElement("ul");
  toDoList.className = 'toDo column';

  renderList(models, toDoList);

  mainContainter.appendChild(toDoList);
}

function renderOnlyToDo() {
  let toDoContainer = document.createElement("ul");
  toDoContainer.className = 'toDo column';

  const toDoList = models.filter(item => !item.status);
  toDoList.sort(sortBy('title'));

  renderList(toDoList, toDoContainer);

  mainContainter.appendChild(toDoContainer);
}

function renderOnlyDone() {
  let doneContainer = document.createElement("ul");
  doneContainer.className = 'done column';

  const doneList = models.filter(item => item.status);
  doneList.sort(sortBy('title'));

  renderList(doneList, doneContainer);

  mainContainter.appendChild(doneContainer);
}

function render() {
  mainContainter.innerHTML = "";
  renderAll();
  renderOnlyDone();
  renderOnlyToDo();
  addEvents();
}





// function changeParametr(id, parametr, val) {
//   models.forEach((item) => {
//     if(item.id === id){
//       console.log(item, parametr);
//       item[parametr] = val;
//     }
//   });render();
// }


// const newModels = models.map( val =>
// val.status === true ?
//    Object.assign({}, val, { status: "do zrobienia"}) :
//    Object.assign({}, val, {status: "zrobione"}));

// const stringModels = newModels.reduce((previousValue, currentValue)=>
// `${previousValue} ${currentValue.title.toUpperCase()}, ${currentValue.status}, id: ${currentValue.id} \n`, '');


