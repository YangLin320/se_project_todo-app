class Todo {
   constructor(data, selector, completeCounter, totalCounter) {
      this._data = data;
      this._selector = document.querySelector(selector);
      this._completeCounter = completeCounter;
      this._totalCounter = totalCounter;
   }

   getView() {
      this._todoElement = this._selector.content.querySelector(".todo").cloneNode(true);
      this._todoNameElement = this._todoElement.querySelector(".todo__name");
      this._todoCheckboxElement =
         this._todoElement.querySelector(".todo__completed");
      this._todoLabel = this._todoElement.querySelector(".todo__label");
      this._todoDate = this._todoElement.querySelector(".todo__date");
      this._todoDeleteBtn =
         this._todoElement.querySelector(".todo__delete-btn");

      this._todoNameElement.textContent = this._data.name;
      this._todoCheckboxElement.checked = this._data.completed;

      this._todoCheckboxElement.id = `todo-${this._data.id}`;
      this._todoLabel.setAttribute("for", `todo-${this._data.id}`);

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
         this._totalCounter(false);
         if(this._data.completed){
            this._completeCounter(false)};
      });
      this._todoCheckboxElement.addEventListener("change", () => {
         this._data.completed = !this._data.completed;
         this._completeCounter(this._data.completed);
      });
   }
}

export default Todo;
