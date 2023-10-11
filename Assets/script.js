// Kristin's API key = '21f21f2d600f49239e04c648f8312a58' used
// Carly's API key = 6d5284f3fe6f45dcac346ce9ae990745 
//Ja's API key = 8b1a8d9e424e4917b6ede45953ef9424

async function handleSearch(event) {
    console.log("u clicked me");

    event.preventDefault();

    // Get the recipe input
    const recipeInput = document.getElementById("recipeInput").value;

    // Get the user preferences
    const vegetarian = document.getElementById("vegetarianCheckbox").checked;
    const vegan = document.getElementById("veganCheckbox").checked;
    const glutenFree = document.getElementById("glutenFreeCheckbox").checked;

    // Save user preferences to local storage
    const userPreferences = {
        vegetarian,
        vegan,
        glutenFree,
        // Add more preferences as needed
    };

    localStorage.setItem("userPreferences", JSON.stringify(userPreferences));

    // Perform the search with the entered recipe and preferences
    await performSearch(recipeInput, userPreferences);
}

// Function to perform the recipe search
async function performSearch(recipe, preferences) {
    const apiKey = "8b1a8d9e424e4917b6ede45953ef9424";
    console.log("u clicked me");

    const preferencesArray = Object.entries(preferences)
        .filter(([key, value]) => value)
        .map(([key, value]) => key);

    const preferencesString = preferencesArray.join(",");

    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${recipe}&diet=${preferencesString}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const foodOption = document.querySelector(".food-option");
        const foodData = data.results;
        let foodResults = "";
        const recipeList = document.getElementById("recipe-list");
        for (let i = 0; i < foodData.length; i++) {
            foodResults += `
            <div>
              <div>
                  <ul>
                      <li class='food-option' id='${foodData[i].id}'>${foodData[i].title}</li>
                  </ul>
              </div>
            </div>
            `;
            recipeList.innerHTML = foodResults;
        }

        function clearIngredients() {
            const clearIng = document.querySelector('#recipe-view')
            clearIng.innerHTML = ''
        }
 

        recipeList.addEventListener("click", async function (event) {
            
            const clickedId = event.target.id;
            if (event.target.classList.contains("food-option")) {
                
                console.log("foodOption", clickedId);
                const endPoint = `https://api.spoonacular.com/recipes/${clickedId}/ingredientWidget.json/?addRecipeInformation&apiKey=${apiKey}`;

                try {
                    clearIngredients();
                    const response = await fetch(endPoint);
                    const ingredients = await response.json();

                    const recipeView = document.getElementById("recipe-view");
                    var ingredientList = [];
                    ingredients.ingredients.forEach(
                        (ingredient) => {
                            console.log(ingredient);

                            //create a card container for each ingredient
                            const card = document.createElement('div')
                            card.classList.add('card')

                            //my image display
                            const img = document.createElement("img");
                            img.classList.add('ingImg')
                            img.setAttribute(
                                "src",
                                `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`
                            );

                            const cardBody = document.createElement('div')

                            //this is my p-name tag
                            const recipe = document.createElement("p");
                            recipe.classList.add('card-text')
                            recipe.innerText = ingredient.name;
                            ingredientList.push(ingredient.name);


                        

                            //this is my span-metric tag inside p
                            const metrics = document.createElement("span");
                            metrics.classList.add('metric-text')
                            const unitMetric = document.createElement('p'); 
                            unitMetric.innerText = ingredient.amount.metric.unit;
                            metrics.innerText = 'Metric: ' + ingredient.amount.metric.value + '  ' + unitMetric.innerText;

                             
                            const US = document.createElement("p");
                            US.classList.add('us-text')
                            const unitUS = document.createElement('p');  
                            unitUS.innerText = ingredient.amount.us.unit    
                            US.innerText = 'US: ' + ingredient.amount.us.value + '  ' + unitUS.innerText;


                            cardBody.appendChild(recipe)
                            cardBody.appendChild(US)
                            cardBody.appendChild(metrics)
                            card.appendChild(img)
                            card.appendChild(cardBody)
                            recipeView.appendChild(card)
                            



                        }
                    );
                    function addToList(){
                        console.log("easy list")
                        localStorage.setItem("ingredients", JSON.stringify(ingredientList));
                        
                      }
                    const easyButtOn= document.getElementById('easyButton')
                    easyButtOn.addEventListener(`click`, function(event){
                        event.preventDefault()
                        addToList()
                        // To alert users that the ingredients have been added to their list
                        const notification = document.querySelector('.notification')
                        const interval = 1000
                        const flashNotification = setInterval(() => {
                            notification.classList.remove('hide') 
                        }, interval)
                        setTimeout(()=> {
                            clearInterval(flashNotification)
                            notification.classList.add('hide')
                        }, 5000)
                    })
                    
                    //This will pull the ingredients into local storage.
                    // Display ingredient details in a new div
                    //   const ingredientDetailsDiv = document.getElementById('ingredientDetails');
                    //   ingredientDetailsDiv.innerHTML = ingredientData.join('')
                    //   console.log(JSON.stringify(ingredients))
                } catch (error) {
                    console.error("Error fetching ingredient details:", error);
                }
            }
        });




        // Implement your logic to handle the API response (data variable)
        console.log("API Response:", data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Add click event to the search button
document.getElementById("searchButton").addEventListener("click", handleSearch);



// Load user preferences from local storage on page load
window.onload = function () {
    const storedPreferences = localStorage.getItem("userPreferences");

    if (storedPreferences) {
        const parsedPreferences = JSON.parse(storedPreferences);

        // Set checkbox states based on stored preferences
        document.getElementById("vegetarianCheckbox").checked =
            parsedPreferences.vegetarian;
        document.getElementById("veganCheckbox").checked = parsedPreferences.vegan;
        document.getElementById("glutenFreeCheckbox").checked =
            parsedPreferences.glutenFree;

        // Perform a search with the stored preferences (you might want to add this logic)
        // performSearch('', parsedPreferences);
    }
};
    const showList = document.getElementById("showList");
    showList.addEventListener("click", function (event) {
        event.preventDefault();
        const ingredientList = JSON.parse(localStorage.getItem("ingredients"));
        const list = document.getElementById("list");
        for (let i = 0; i < ingredientList.length; i++) {
            const li = document.createElement("li");

            li.innerText = ingredientList[i]; 
            li.className += "listItem"
            list.appendChild(li);
        }
        list.addEventListener("click", function (event) {
            event.preventDefault();
            if (event.target.classList.contains("listItem")){
                event.target.style.textDecoration = "line-through";
                
            }
            
        })

            li.innerText = ingredientList[i];
            list.appendChild(li);
        }

    )

   


