//Rotate Cube
const cube = $('.js-cube');
const radioButtons = $('.js-radioButtons');
let currentClass = '';
const addToDo = $('.js-add-todo-form');
const formButton = $('.js-add-todo-form__add');
const moveButton = $('.js-add-todo-form--move');
const ToDoList = $('.js-ToDo-List');
const doneList = $('.js-Done-list');
const formText = $('.js-add-todo-form__text');
const liElements = $(".js-list_item");
const deleteButton = $(".js-delete");
const returnButton = $(".js-done_toDo--return");
const Title = $('.js-text-head');
const inputText =('.js-inputText');

function changeSide() {

    const checked = $( 'input[type=radio]:checked' );
    const showClass = 'show-' + checked.val();

    addForm(checked);
    doneButtons(checked);

    if( currentClass ) {
        cube.removeClass( currentClass );
    }
    cube.addClass( showClass );
    currentClass = showClass;
}

function addForm(input) {

    if(input.val() === "right") {
       addToDo.addClass("add-todo-form--opacity");
       Title.text("Co musisz zrobić?");
       formText.addClass('opacity');
       formButton.addClass('opacity');
       deleteButton.addClass('opacity');
       moveButton.addClass('opacity');
    } else {
        addToDo.removeClass("add-todo-form--opacity");
        Title.text(" ");
        formButton.removeClass('opacity');
        formText.removeClass('opacity');
        moveButton.removeClass('opacity');
    }
}

function doneButtons(input) {

    if(input.val() === "back") {
        addToDo.addClass("add-todo-form--opacity");
        Title.text("Zrobione");
        returnButton.addClass('opacity');
        deleteButton.addClass('opacity');
    } else{
        returnButton.removeClass('opacity');
    }
}

function addLi(){

    let text = formText.val();
    const itemId = $('.js-list_item').length;

    if(text === ""){
        text === "error"
    } else{ToDoList.append(
        "<li class='js-list_item'>"
            + "<input id='" + itemId +"' type='checkbox' />"
            + "<label  for='" + itemId +"'>" + text + "</label>"
        + "</li>")}
}

function deleteLi() {
    const doneElements = $('input[type="checkbox"]:checked');
    if( doneElements ) {
        const parentList = doneElements.parent();
        parentList.remove();
    }
}

function returnLi() {
    const doneElements = $('input[type="checkbox"]:checked');
    if( doneElements ) {
        const parentList = doneElements.parent();
        parentList.detach().appendTo(ToDoList);
    }
    $("input[value=right]").trigger('click');
    doneElements.trigger('click');
}

function moveLi() {
    const doneElements = $('input[type="checkbox"]:checked');
    if( doneElements ) {
        const parentList = doneElements.parent();
        parentList.detach().appendTo(doneList);

    }
    $('input[value=back]').trigger('click');
    doneElements.trigger('click');
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
        $('#calendar').fullCalendar( "removeEvents", [e._id ] )
    }
});


$( document ).ready(function() {
    changeSide();
    radioButtons.on( 'change', changeSide );
    formButton.on('click', addLi);
    moveButton.on('click', moveLi);
    deleteButton.on('click', deleteLi);
    returnButton.on('click', returnLi);

});





