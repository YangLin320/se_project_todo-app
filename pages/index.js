import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { validationConfig, initialTodos } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function completeCounter(completed){
   todoCounter.updateCompleted(completed);
}

function totalCounter(deleted){
   todoCounter.updateTotal(!deleted);
}

const addTodoPopup = new PopupWithForm({
   popupSelector: "#add-todo-popup",
   submit: (evt, {name, dateInput}) => {
      // Create a date object and adjust for timezone
      const date = new Date(dateInput);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

      const id = uuidv4();
      const values = { id, name, date };
      const todo = new Todo(values, "#todo-template");
      todosList.append(todo.getView());
      addTodoPopup.close();
      totalCounter(false);

      formValidator.resetValidation();
   },
});
const section = new Section({
   items: initialTodos,
   renderer: (item) => {
      const todo = new Todo(item, "#todo-template", completeCounter, totalCounter);
      const todoElement = todo.getView();
      todosList.append(todoElement);
   },
   containerSelector: ".todos__list",
});
const formValidator = new FormValidator(validationConfig, addTodoPopup.getForm());
formValidator.enableValidation();

addTodoButton.addEventListener("click", () => {
   addTodoPopup.open();
});

section.renderItems();
addTodoPopup.setEventListeners();
todoCounter.updateText();