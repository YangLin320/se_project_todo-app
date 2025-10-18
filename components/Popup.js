export default class Popup{
    constructor({popupSelector}){
        this._popup = document.querySelector(popupSelector);
    }

    _handleEscapeClose = (event) =>{
        if(event.key === 'Escape'){
            this.close();
        };
    }

    open(){
        this._popup.classList.add("popup_visible");
        document.addEventListener("keyup", this._handleEscapeClose);
    }

    close(){
        this._popup.classList.remove("popup_visible");
        document.removeEventListener("keyup", this._handleEscapeClose);
    }

    setEventListeners(){
        this._popupCloseBtn.addEventListener("click", ()=>{
            this.close();
        });

        this._popup.addEventListener("click", (event)=>{
            console.log(event.target);
            if(event.target === this._popup){
                this.close();
            }
        });
    }
}