const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";

// Where the API call will happen
const margaritaSamples = document.querySelector(".results");

// API call starts here
async function getMargaritas() {

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Remove loading indicator when API call's finish
        document.querySelector(".loading").innerHTML = "";
        
        // How we want the chosen API data to appear
        function getIngredients(drink) {
            let html = "";

            // Filter out data that has no value
            for(let i = 1; i < 16; i++) {
                if(drink[`strMeasure${i}`] && drink[`strIngredient${i}`]) {
                    html += `
                        <li class="recipe_list">
                            <span class="color">${drink[`strMeasure${i}`]}</span> 
                            ${drink[`strIngredient${i}`]}
                        </li>
                    `;
                }
            }

            return html;
        }

        // The final API data display inside html
        for (let i = 0; i < data.drinks.length; i++) {
            margaritaSamples.innerHTML += `
                <div class="result">
                    <img src="${data.drinks[i].strDrinkThumb}" alt="${data.drinks[i].strDrink}" />
                        <h2 class="h2_heading"> ${data.drinks[i].strDrink} </h2>
                        <div class="space">
                            ${getIngredients(data.drinks[i])}
                            </div>
                                <div class="button">
                                <a class="cta" href="pages/details.html?id=${data.drinks[i].idDrink}">
                            &#10024; Get recipe &#10024;
                        </a>
                    </div>
                </div>
            `;
        }
        
    // Error message display
    } catch (error) {
        margaritaSamples.innerHTML = theError("Whoops! The margarita data seems to be spilt away.. &#128530;");

    } 
}

getMargaritas();
