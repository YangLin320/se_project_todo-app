export default class Section{
    constructor({items,renderer,containerSelector}){
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(){
        this._items.forEach((each) =>{
            this._renderer(each);
        });
    }

    addItem(element){
        this._container.append(element);
    }
}