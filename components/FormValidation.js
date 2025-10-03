class FormValidator {
   constructor(settings, formElement) {
      this._formElement = formElement;
      this._inputSelector = settings.inputSelector;
      this._submitButtonSelector = settings.submitButtonSelector;
      this._errorClass = settings.errorClass;
      this._inputErrorClass = settings.inputErrorClass;
      this._inactiveButtonClass = settings.inactiveButtonClass;
   }

   _hideInputError = (inputElement) => {
      const errorElementId = `#${inputElement.id}-error`;
      const errorElement = this._formElement.querySelector(errorElementId);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = "";
   };
   _showInputError = (inputElement, errorMessage) => {
      const errorElementId = `#${inputElement.id}-error`;
      const errorElement = this._formElement.querySelector(errorElementId);
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
   };

   _checkInputValidity = (inputElement) => {
      if (!inputElement.validity.valid) {
         this._showInputError(inputElement, inputElement.validationMessage);
      } else {
         this._hideInputError(inputElement);
      }
   };
   _hasInvalidInput = () => {
      return this._inputList.some((inputElement) => {
         return !inputElement.validity.valid;
      });
   };

   _toggleButtonState = (buttonElement) => {
      if (this._hasInvalidInput()) {
         buttonElement.classList.add(this._inactiveButtonClass);
         buttonElement.disabled = true;
      } else {
         buttonElement.classList.remove(this._inactiveButtonClass);
         buttonElement.disabled = false;
      }
   };
   _setEventListeners = () => {
      this._inputList = Array.from(
         this._formElement.querySelectorAll(this._inputSelector)
      );
      const buttonElement = this._formElement.querySelector(
         this._submitButtonSelector
      );

      this._toggleButtonState(buttonElement);

      this._inputList.forEach((inputElement) => {
         inputElement.addEventListener("input", () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState(buttonElement);
         });
      });
   };

   enableValidation = () => {
      this._formElement.addEventListener("submit", (evt) => {
         evt.preventDefault();
      });
      this._setEventListeners();
   };

   resetValidation() {
      this._formElement.reset();

      // Ensure _inputList exists
      this._inputList = Array.from(
         this._formElement.querySelectorAll(this._inputSelector)
      );

      // Hide all errors
      this._inputList.forEach((input) => this._hideInputError(input));

      // Disable submit button
      const button = this._formElement.querySelector(
         this._submitButtonSelector
      );
      button.classList.add(this._inactiveButtonClass);
      button.disabled = true;
   }
}

export default FormValidator;
