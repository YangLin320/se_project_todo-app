export default class Popup{
    constructor({popupSelector}){
        this._popup = document.querySelector(popupSelector);
    }

    open(){
        this._popup.classList.add("popup_visible");
    }

    close(){
        this._popup.classList.remove("popup_visible");
    }

    _handleEscapeClose(){
        this._popup.addEventListener("keyup", (event) =>{
            if(event.key == "Escape"){
                this.close();
            }
        })
    }

    setEventListeners(){
        this._popupCloseBtn.addEventListener("click", ()=>{
            this.close();
        });

        this._popupCloseBtn.addEventListener("click", (event)=>{
            if(event.target !== this._popupForm){
                this.close();
            }
        })
    }
}