let currentClass = '';
const cube = document.querySelector('.js-cube');
const radioButtons = document.querySelector('.js-radioButtons');
const addToDo = document.querySelector('.js-add-todo-form');
const Title = document.querySelector('.js-text-head');
const formText = document.querySelector('.js-add-todo-form__text');
const formButton = document.querySelector('.js-add-todo-form__add');
const deleteButton = document.querySelector('.js-delete');
const moveButton = document.querySelector('.js-add-todo-form--move');
const returnButton = document.querySelector('.js-done_toDo--return');
const ToDoList = document.querySelector('.js-ToDo-List');
const doneList = document.querySelector('.js-Done-list');
const checkBack = document.querySelector('input[value=back]');
const checkRight= document.querySelector('input[value=right]');


function simulateClick(elem) {
    const evt = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
    });
    !elem.dispatchEvent(evt);
}

function changeSide() {
    const checked = radioButtons.querySelector(':checked');
    const showClass = 'show-' + checked.value;

    addForm(checked);
    doneButtons(checked);

    if( currentClass ) {
        cube.classList.remove( currentClass );
    }
    cube.classList.add( showClass );
    currentClass = showClass;
}

function addForm(input) {

    const arr = [formText, formButton, moveButton];
    if(input.value === 'right') {
        addToDo.classList.add('opacity');
        Title.innerText = 'Co musisz zrobić?';

        arr.push(deleteButton);
        arr.forEach(function(item, index){
            item.classList.add('opacity');

        });
    } else {
        addToDo.classList.remove('opacity');

        arr.forEach(function(item, index){
            item.classList.remove('opacity');
        })
    }
}
function doneButtons(input) {
    if(input.value === 'back') {
        addToDo.classList.add('add-todo-form--opacity');
        Title.innerText = 'Zrobione';
        returnButton.classList.add('opacity');
        deleteButton.classList.add('opacity');
    } else {
        returnButton.classList.remove('opacity');
    }
}
// const ToDoList = document.querySelector('.js-ToDo-List');
const model = [];
function addListItem(text, status) {
  const listElement = {
      text: text,
       status: status,
        data: new Date()
    }
    model.push(listElement);
    renderItem(listElement);
}


function renderItem(item) {
    const elem = document.createElement("li");
    elem.classList.add('js-list_item');
    elem.innerHTML= `${item.text} - status: ${item.status}`;
    ToDoList.appendChild(elem);
}
formButton.addEventListener('click', function(){
        
});
// function addListItem() {
//     let text = formText.value;
//     const itemId = document.querySelectorAll('.js-list_item').length;
//     if(text === '') {
//         alert('wpisz tekst');
//     } else{
//         const elem = document.createElement("li");
        
//         elem.classList.add('js-list_item');
//         elem.innerHTML= `<input id="${itemId}" type="checkbox"/>
//         <label for="${itemId}">${text}</label><a class="js-deleteIcon" href="#">
//         <span class="icon-4"></span></a><a class="js-removeIcon" href="#">
//         <span class="icon-2"></span></a>`;
//         ToDoList.appendChild(elem);
//         const deleteIconButton = document.querySelector('.js-deleteIcon');
//         deleteIconButton.addEventListener('click', function() {
//             deleteIcon(elem)
//         });
//     }
// }
function deleteIcon(elem) {
    ToDoList.removeChild(elem);
 }

function deleteListItem() {
    const listItem = document.querySelectorAll('.js-list_item');

    listItem.forEach(function(index){
        const doneElements = listItem[index].querySelector(':checked');
        if( doneElements ) {
            const parentList = doneElements.parentNode;
            parentList.remove();
        }
    })
}


//Roki
// (function(win) {
//     this.x = 'test';
//     console.log(this.x);
// })(window);

// (() => {
//     this.x = 'test'
//     console.log(this.x);
// }, ());
// function deleteListItem() {
//     const listItem = document.querySelectorAll('.js-list_item');

//     listItem.forEach((item, index) => {
//         const doneElements = listItem[index].querySelector(':checked');
//         if( doneElements ) {
//             const parentList = doneElements.parentNode;
//             parentList.remove();
//         }
//     })
// }



// const restoreEl = (addList, removeList) => {
//     return function(item, index) {
//         const doneElements = listItem[index].querySelector(':checked');
//         if( doneElements ) {
//             doneList.removeChild(item);
//             ToDoList.appendChild(item);

//             simulateClick(checkRight);
//             simulateClick(doneElements);
//         }
//     }
// }

function returnListItem() {
    const listItem = document.querySelectorAll('.js-list_item');

    listItem.forEach(function(item, index){
        const doneElements = listItem[index].querySelector(':checked');
        if( doneElements ) {
            doneList.removeChild(item);
            ToDoList.appendChild(item);

            simulateClick(checkRight);
            simulateClick(doneElements);
        }
    })
}
function moveLi() {
    const listItem = document.querySelectorAll('.js-list_item');

    listItem.forEach(function(item, index){
        const doneElements = listItem[index].querySelector(':checked');
        if( doneElements ) {
            ToDoList.removeChild(item);
            doneList.appendChild(item);

            simulateClick(checkBack);
            simulateClick(doneElements);
        }
    })
}


$('#calendar').fullCalendar({
    selectable: true,
    navLinks: true,
    header: { center: 'month,agendaWeek,agendaDay' },
    views: {
        month: { titleFormat: 'YYYY, MM, DD' }
    },
    timeFormat: 'H(:mm)',
    select: function(startDate, endDate) {
        const dateStr = prompt('Wpisz coś');

         if(dateStr) {
             $('#calendar').fullCalendar('renderEvent', {

                 title: dateStr,
                 start: startDate,
                 end: endDate,

             });
         }
     },
    eventClick: function(e) {
        $('#calendar').fullCalendar( 'removeEvents', [e._id ] )
    }
});


window.addEventListener('load', function() {
    changeSide();
    radioButtons.addEventListener( 'change', changeSide );

    deleteButton.addEventListener('click', deleteListItem);
    moveButton.addEventListener('click', moveLi);
    returnButton.addEventListener('click', returnListItem);
}, false )




function a(){
    const checkbox = document.querySelector(":checked");
    console.log(checkbox.parentNode.id);
  }

  cloneButton.addEventListener('click', function(){
    const checkbox = document.querySelector(":checked");
    if(checkbox){
      const checkboxID = checkbox.parentNode.id;
      cloneObject(Number(checkboxID));
    }
  });

  function cloneObject(IDarr) {
    console.log(IDarr)
    models.forEach((item) => {
    //   const itemsToClone = IDarr.filter(id => id === item.id);
    //   console.log(itemsToClone);
      if(IDarr.find(id => id === item.id)) {
        const newItem = JSON.parse(JSON.stringify(item));
        newItem.id = Math.floor((Math.random() * 100))
        models.push(newItem);
      }
    // });
    dezactiveAll();
    render();
  };
  
  cloneButton.addEventListener('click', function(){
    const checkboxes = document.querySelectorAll(":checked");
    const IDarr = [...checkboxes].map(function(checkbox){
      return checkbox.parentNode.id;
    });
    cloneObject(IDarr);
  });
  