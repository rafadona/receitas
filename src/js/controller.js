import * as model from './model.js';
import recipeView from "./views/recipeView.js";
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeViews from './views/addRecipeViews.js';


// https://forkify-api.herokuapp.com/v2


const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    //update results view to mark selected search
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);


    //load recipe
    await model.loadRecipe(id);

    //rendering
    recipeView.render(model.state.recipe);


  } catch (error) {
    recipeView.renderError(`${error} ❌❌`);
  };

};


const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    //get search query
    const query = searchView.getQuery();
    if (!query) return;

    //load results
    await model.loadSearchResults(query);


    //render search results
    resultsView.render(model.getSearchResultsPage());

    //render initial pagination buttons
    paginationView.render(model.state.search);

  } catch (error) {
    console.error(error);

  }
};

const controlPagination = function (gotoPage) {
  resultsView.render(model.getSearchResultsPage(gotoPage));

  //render new pagination buttons
  paginationView.render(model.state.search);
};

const constrolServings = function (newServings) {

  //update the recipe servings
  model.updateServings(newServings);

  //update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);


};

const controlAddBookmark = function () {
  //add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //update recipe view
  recipeView.update(model.state.recipe);

  //render bookmark
  bookmarksView.render(model.state.bookmarks);

};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {

  try {
    addRecipeViews.renderSpinner();


    await model.uploadRecipe(newRecipe);

    recipeView.render(model.state.recipe);


    //success message
    addRecipeViews.renderSuccessMessage();


    bookmarksView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

  } catch (error) {
    console.error(error);
    addRecipeViews.renderError(error.message);
  }


};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(constrolServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeViews.addHandlerUpload(controlAddRecipe);

};

init();


