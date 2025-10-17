import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor({popupSelector, submit}){
        super({popupSelector});
        this._popupCloseBtn = this._popup.querySelector(".popup__close");
        this._popupForm = this._popup.querySelector(".popup__form");
        this._submit = submit;
    }

        _getInputValues(evt){
        const name = evt.target.name.value;
        const dateInput = evt.target.date.value;

        return {name, dateInput};
    }
    setEventListeners(){
        super.setEventListeners();
        this._popupForm.addEventListener("submit", (evt)=>{
            evt.preventDefault();
            this._submit(evt, this._getInputValues(evt));
        })
    }

    getForm(){
        return this._popupForm;
    }
}