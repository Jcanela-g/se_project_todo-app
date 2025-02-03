import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constant.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = ".todos__list";

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleSubmitForm: () => {},
});

addTodoPopup.setEventListeners();

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();

  return todoElement;
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    return generateTodo(item);
  },
  containerSelector: todosList,
});

section.renderItems();

// const handleEscape = (evt) => {
//   if (evt.key === "Escape") {
//     const activePopup = document.querySelector(".popup_visible");
//     closeModal(activePopup);
//   }
// };

// const openModal = (modal) => {
//   modal.classList.add("popup_visible");
//   document.addEventListener("keyup", handleEscape);
// };

// const closeModal = (modal) => {
//   modal.classList.remove("popup_visible");
//   document.removeEventListener("keyup", handleEscape);
// };

// const renderTodo = (item) => {
//   const todo = generateTodo(item);
//   todosList.append(todo);
// };

addTodoButton.addEventListener("click", () => {
  // openModal(addTodoPopupEl);
  addTodoPopup.open();
});

// addTodoCloseBtn.addEventListener("click", () => {
//   // closeModal(addTodoPopupEl);
//   addTodoPopup.close();
// });

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };

  // renderTodo(values);
  const todoElement = generateTodo(values);
  section.addItem(todoElement);

  // closeModal(addTodoPopupEl);
  addTodoPopup.close();
  addTodoForm.reset();
  newTodoValidator.resetValidation();
});

// initialTodos.forEach((item) => {
//   renderTodo(item);
// });

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
