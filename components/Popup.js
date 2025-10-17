export default class Popup{
    constructor({popupSelector}){
        this._popup = document.querySelector(popupSelector);
    }

    open(){
        this._popup.classList.add("popup_visible");
        document.addEventListener("keydown", this._handleEscapeClose);
    }

    close(){
        this._popup.classList.remove("popup_visible");
        document.removeEventListener("keydown", this._handleEscapeClose);
    }

    _handleEscapeClose(){
        document.addEventListener("keyup", (event) =>{
            if(event.key === "Escape"){
                this.close();
            }
        })
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
        })
    }
}