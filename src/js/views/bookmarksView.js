import View from "./View";
import previewView from "./previewView";
import icons from "url:../../img/icons.svg";


class BookmarksView extends View {

    _parentElement = document.querySelector(`.bookmarks__list`);
    _errorMessage = `Ainda não há favoritos. Encontre uma boa receita marque-a como favorito!`;
    _successMessage = ``;


    addHandlerRender(handler) {

        window.addEventListener(`load`, handler);

    }

    _generateMarkup() {

        return this._data.map(bookmark => previewView.render(bookmark, false)).join(``);

    }


};



export default new BookmarksView();