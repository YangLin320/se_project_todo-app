class Todo {
   constructor(data, selector, completeCounter, totalCounter) {
      this._data = data;
      this._selector = selector;
      this._completeCounter = completeCounter;
      this._totalCounter = totalCounter;
   }

   getView() {
      this._todoElement = document
         .querySelector(this._selector)
         .content.querySelector(".todo")
         .cloneNode(true);
      this._todoNameElement = this._todoElement.querySelector(".todo__name");
      this._todoCheckboxElement =
         this._todoElement.querySelector(".todo__completed");
      this._todoLabel = this._todoElement.querySelector(".todo__label");
      this._todoDate = this._todoElement.querySelector(".todo__date");
      this._todoDeleteBtn =
         this._todoElement.querySelector(".todo__delete-btn");

      this._todoNameElement.textContent = this._data.name;
      this._todoCheckboxElement.checked = this._data.completed;

      // Apply id and for attributes.
      // The id will initially be undefined for new todos.
      this._todoCheckboxElement.id = `todo-${this._data.id}`;
      this._todoLabel.setAttribute("for", `todo-${this._data.id}`);

      // If a due date has been set, parsing this it with `new Date` will return a
      // number. If so, we display a string version of the due date in the todo.
      const dueDate = new Date(this._data.date);
      if (!isNaN(dueDate)) {
         this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
         })}`;
      }

      this._setEventListeners();
      return this._todoElement;
   }

   _setEventListeners() {
      this._todoDeleteBtn.addEventListener("click", () => {
         this._todoElement.remove();
         this._totalCounter(true);
      });
      this._todoCheckboxElement.addEventListener("change", () => {
         this._data.completed = !this._data.completed;
         this._completeCounter(this._data.completed);
      });
   }
}

export default Todo;
