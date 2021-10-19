import View from "./View";
import previewView from "./previewView";
import icons from "url:../../img/icons.svg";


class ResultsView extends View {

  _parentElement = document.querySelector(`.results`);
  _errorMessage = `Nao foi possivel encontrar nada com essa pesquisa.Tente Novamente`;
  _successMessage = ``;


  _generateMarkup() {

    return this._data.map(result => previewView.render(result, false)).join(``);

  }


};



export default new ResultsView();