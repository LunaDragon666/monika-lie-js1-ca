const cocktailTitle = document.querySelector("title").innerHTML = "Margarita | Detail";

// Where we want the selected API data to display if they get through from html
const cocktailContainer = document.querySelector(".cocktail-details");


// Locate API ids 
const queryString = document.location.search; 

const params = new URLSearchParams(queryString);

// API "id call"
const id = params.get("id")


// The API url and each of the following ids we want to "call to action"
const singleUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id;


// API call(s) for details.html page(s)
async function fetchCocktail() {

    try {
        const response = await fetch(singleUrl);
        const details = await response.json();

        document.querySelector(".loading").innerHTML = "";
        createHtml(details);

      
    }
    
    // In case if API loading's failing, this message will show up 
    catch(error) {
            cocktailContainer.innerHTML = theError("Whoops! The margarita data seems to be spilt away.. &#128530;");
    }
    
}

// When API loading's finish and successful, this content will show up
function createHtml(data) {

        cocktailContainer.innerHTML = `
        <h1 class="h1_detail">${data.drinks[0].strDrink}</h1>
                <p class="p_id"><span class="color">id no.</span> ${data.drinks[0].idDrink}</p> 
                        <img class="img_detail" src="${data.drinks[0].strDrinkThumb}" alt="${data.drinks[0].strDrink}" />
                            <div class="text-box">
                        <h2>Instructions</h2>
                        <hr>
                    <div class="info">${data.drinks[0].strInstructions}
                </div>
            <a class="link" href="#">
            &#8594; Full ingredient list
          </a> 
        </div>
        `;

    }

fetchCocktail();
