const deleteObjectButton = document.querySelector(".js-deleteObject");
const addObjectButton = document.querySelector(".js-addObject");
const cloneButton = document.querySelector(".js-cloneObject");
const textVal = document.querySelector(".js-addText");
const mainContainter = document.querySelector("#main");
const listItem = document.querySelectorAll(".js-item");


class ToDoList {
  constructor(arr, status) {
    this.arr = arr;
    this.status = status;
    this.render = new Renders(this.arr);
    this.render.render();
  }
  addListItem(title) {
    const listElement = {
      title: title,
      status: false,
      checked: false,
      id: Math.floor((Math.random() * 100)),
    }
    this.arr.push(listElement);
    this.arr.sort(myTodoList.sortBy("title"));
    this.update();
  }

  dezactiveAll() {
    this.arr.forEach(item => item.checked = false);
  }

  deleteOneElement() {
    const itemsToDelete = this.arr.filter(item => item.checked === true);
    itemsToDelete.forEach((itemD) => {
      const indexToDelete = this.arr.findIndex(item => item.id === itemD.id);
      this.arr.splice(indexToDelete, 1);
      // this.arr.splice(i, 1);
    })
    this.update();
  }

  sortBy(param) {
    return (a, b) => {
      if (a[param] < b[param]) { return -1; }
      if (a[param] > b[param]) { return 1; }
      return 0;
    }
  }

  deleteListItem(status) {
    const itemsToDelete = this.arr.findIndex(item => item.checked === status);
    this.arr.splice(itemsToDelete, 1);
    this.update();
  }

  toggleParametr(id, parametr) {
    this.arr.forEach((item) => {
      if (typeof item[parametr] === 'boolean' && item.id === id) {
        item[parametr] = !item[parametr];
      }
    });
    this.update();
  }
  changeParametr(id, parametr, val) {
    this.arr.forEach((item) => {
      if (item.id === id) {
        item[parametr] = val;
      }
    }
    )
  }

  cloneObject(arr) {
    this.arr.forEach((item) => {
      if (arr.find(id => id === item.id)) {
        const newItem = JSON.parse(JSON.stringify(item));
        newItem.id = Math.floor((Math.random() * 100))
        this.arr.push(newItem);
      }
    }
    )
    this.dezactiveAll();
    this.update();
  }
  checkedItems() {
    return this.arr.map(function (item) {
      if (item.checked === true) {
        return item.id
      }
    }
    )
  }

  storage(){
    let arrStorage = JSON.stringify(this.arr);
    window.localStorage.setItem("MojaTablica", arrStorage);
  }
  update(){
    this.render.render();
    this.storage();
  }
}


class Renders {
  constructor(model) {
    this.model = model;
  }

  renderList(list, container) {
    list.forEach(function (item) {
      let listItem = document.createElement("li");

      let checkboxes = document.createElement("input");
      checkboxes.type = "checkbox";
      checkboxes.checked = item.checked;

      let changeStatusButton = document.createElement("button");
      changeStatusButton.className = 'changeStatus';
      changeStatusButton.innerHTML = 'Zmień Status'

      let deleteB = document.createElement("button");
      deleteB.className = 'delete';
      deleteB.innerHTML = ' Usuń';

      listItem.id = item.id;
      listItem.className = 'js-item';
      listItem.innerHTML = `<label>
      <strong>${item.title}</strong>&nbsp
      <p>${item.status === false ? "Do zrobienia" : "Zrobione"}</p></label>`;

      listItem.prepend(checkboxes);
      listItem.appendChild(changeStatusButton);
      listItem.appendChild(deleteB);

      container.appendChild(listItem);
    })
  }
  renderAll() {
    let toDoList = document.createElement("ul");
    toDoList.className = 'toDo column';

    this.renderList(this.model, toDoList);

    mainContainter.appendChild(toDoList);
  }
  renderOnlyToDo() {
    let toDoContainer = document.createElement("ul");
    toDoContainer.className = 'toDo column';

    const toDoList = this.model.filter(item => !item.status);

    this.renderList(toDoList, toDoContainer);

    mainContainter.appendChild(toDoContainer);
  }
  renderOnlyDone() {
    let doneContainer = document.createElement("ul");
    doneContainer.className = 'done column';

    const doneList = this.model.filter(item => item.status);

    this.renderList(doneList, doneContainer);

    mainContainter.appendChild(doneContainer);
  }

  render() {
    mainContainter.innerHTML = "";
    this.renderAll();
    this.renderOnlyDone();
    this.renderOnlyToDo();
  }
}

  let getItem = localStorage.getItem("MojaTablica");
  let item = JSON.parse(getItem);
  if(item === null){
    item = [];
  }
  const myTodoList = new ToDoList(item, false);
  console.log(item);



addObjectButton.addEventListener('click', function () {
  myTodoList.addListItem(textVal.value)
})

document.addEventListener('click', function (e) {

  const deleteB = document.querySelectorAll('.delete');
  const changeStatusButton = document.querySelectorAll('.changeStatus');

  const newDelete = [...deleteB].find(item => e.target === item);
  if (newDelete && newDelete.parentElement) {
    console.log(myTodoList.arr)
    myTodoList.changeParametr(Number(newDelete.parentElement.id), "checked", true)
    myTodoList.deleteOneElement();
  }

  const newChangeStatus = [...changeStatusButton].find(item => e.target === item);
  if (newChangeStatus && newChangeStatus.parentElement) {
    myTodoList.toggleParametr(Number(newChangeStatus.parentElement.id), "status");
  }
})
document.addEventListener('change', function (e) {
  const checkboxes = document.querySelectorAll("input[type=checkbox]");

  const newCheckboxes = [...checkboxes].find(item => e.target === item);
  if (newCheckboxes && newCheckboxes.parentElement) {
    myTodoList.toggleParametr(Number(newCheckboxes.parentElement.id), "checked")
  }

})
deleteObjectButton.addEventListener('click', function () {
  myTodoList.deleteOneElement();
})
cloneButton.addEventListener('click', function () {
  const newArr = myTodoList.checkedItems()
  myTodoList.cloneObject(newArr);
});



  // window.localStorage.clear()


// for(let i in item) {
//   mainContainter.innerHTML
// }



