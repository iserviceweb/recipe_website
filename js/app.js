// www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

// Variables
const randomRecipeURL = `https://www.themealdb.com/api/json/v1/1/search.php?f=e`;
const recipeContainer = document.getElementById("recipe__container");
let recipeDb = [];
const RECIPE_NAME = "name";
const RECIPE_ID = "id";
const RECIPE_CATEGORY = "category";
const RECIPE_IMAGE = "image";

// console.log("JS Loaded!");

// Functions
const getAPIData = async (apiURL) => {
  try {
    const responseFromAPI = await fetch(apiURL);
    // console.log(responseFromAPI);
    const jsonData = await responseFromAPI.json();
    // console.log(jsonData);
    fetchRecipeFromAPI(jsonData);
  } catch (error) {
    console.log(error);
    recipeContainer.innerHTML = `<p clas>${error}</p>`
  }
};

const fetchRecipeFromAPI = (jsonData) => {
  let apiData = jsonData.meals;
  for (let i = 0; i < apiData.length; i++) {
    let currentRecipe = {};
    currentRecipe[RECIPE_ID] = apiData[i].idMeal;
    currentRecipe[RECIPE_NAME] = apiData[i].strMeal;
    currentRecipe[RECIPE_CATEGORY] = apiData[i].strCategory;
    currentRecipe[RECIPE_IMAGE] = apiData[i].strMealThumb;
    recipeDb.push(currentRecipe);
  }
  console.log(recipeDb[0].name);
  displayAllRecipes(recipeDb);
};

const displayAllRecipes = (recipeArray) => {
  recipeContainer.innerHTML = "";

  if (recipeArray == null) {
    return;
  } else {
    for (let i = 0; i < recipeArray.length; i++) {
      recipeContainer.innerHTML += `
                <div class="recipe__card">
                    <div>
                        <img src="${recipeArray[i].image}" />
                    </div>
                    <div class="text__container">
                        <h3>${recipeArray[i].name}</h3>
                        <p>${recipeArray[i].category}</p>
                    </div>
                </div>
            `;
    }
  }
};

const fetchRecipesByKeyword = (searchKeyword) => {
  recipeDb = [];
  getAPIData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchKeyword}`);
};

// Event Handlers
const pageLoaded = () => {
  console.log("Page Loaded!");
  getAPIData(randomRecipeURL); //call API here
};

const searchButtonClicked = () => {
  console.log("Search button clicked!");
  let searchValue = document.querySelector("input").value;
  // console.log(`You searched for : ${searchValue}`);
  if (searchValue === "") {
    return;
  } else {
    fetchRecipesByKeyword(searchValue);
  }
};

// Event Listeners
document.addEventListener("DOMContentLoaded", pageLoaded);
document
  .querySelector(".search__btn")
  .addEventListener("click", searchButtonClicked);
