//API: add store locator

// (Nick-Done) 1. When I search for a recipe, I can filter recipes by dietary preferences.
    //a. grab search button via the DOM
    //b. add click event for search button
        //1. prevent default for form input to stop page from refreshing
    //c. grab input box   
        //. create filter button within input field to filter recipes by dietary preference/restrictions with a checkbox next to each restriction that user can click to confirm preferences to include in search. 
            //. user preferences would go into local storage?
        
        
// (Ja-Done) 2. Once user clicks the search button, a list of recipes will populate depending on preferences. 
        //b. will need a for loop to iterate through recipes to find recipes based off of user preferences
        //a. create a <ul> with <li> for recipes to populate into. How many recipes should be shown at a time? Top 5 on first page, next page has next 5 recipes. 

// (Kristin) 3. When user clicks on a recipe, then they can view the recipe's name, image, ingredients, preparation steps, and serving sizes. 
    //1. add click event for li item. Should we put displayRecipe() in click event?
    //2. create a displayRecipe() to fetch data from API in order to populate:
        //a. creater <h3> heading for recipe name to populate
        //b. create <div> for recipe image to populate
        //c. create <p> for serving size.
        //d. create <ul> and <li> for ingredient list to populate.
        //e. create <ol> and <li> for preparation steps.
    //3. Create <div> for food joke at the bottom of the recipe page.    
    //4. create +my EZ list button to add a recipe to user's "EZ recipe" list
        //a. create localStorage to store added recipe

// Carly 4. When user adds a recipe to their "my recipes" list, then they can generate a shopping list that includes all of the ingredients needed for the selected recipe. 
    //1. Create a "generate EZ list" button 
        //a. create an event listener for button 
    //2. Create generateEZList() to fetch ingredients from recipe to create an EZ shopping list
        //a. grab ingredients from recipe to create an unordered list of items for grocery list.
        
// (Nick) 5. When user views their EZ list, then they can remove items they already have at home.
    //1. Dynamically add a remove <button> in generateEZList()? 
     //add an id for this    
    
// (Ja) 6. When user is shopping at the grocery store, then they can mark items off their EZ list as they shop. 
    //1. Dynamically strike-through to mark that ingredient item as done.
    // 
    
// (Carly) 7. Add store locator (Carly Google API)  

//https://api.spoonacular.com/recipes/complexSearch?query=${searchValue}&chainonsomeshit

//&apiKey=${APIKey}
        
// Kristin's API key = '21f21f2d600f49239e04c648f8312a58'
// Carly's API key = 6d5284f3fe6f45dcac346ce9ae990745
//Ja's API key 

async function handleSearch(event) {
  console.log("u clicked me")

  event.preventDefault();

  // Get the recipe input
  const recipeInput = document.getElementById('recipeInput').value;

  // Get the user preferences
  const vegetarian = document.getElementById('vegetarianCheckbox').checked;
  const vegan = document.getElementById('veganCheckbox').checked;
  const glutenFree = document.getElementById('glutenFreeCheckbox').checked;

  // Save user preferences to local storage
  const userPreferences = {
      vegetarian,
      vegan,
      glutenFree,
      // Add more preferences as needed
  };

  localStorage.setItem('userPreferences', JSON.stringify(userPreferences));

  // Perform the search with the entered recipe and preferences
  await performSearch(recipeInput, userPreferences);
}

// Function to perform the recipe search
async function performSearch(recipe, preferences) {
  const apiKey = '21f21f2d600f49239e04c648f8312a58'; 
  console.log("u clicked me")


  const preferencesArray = Object.entries(preferences)
      .filter(([key, value]) => value)
      .map(([key, value]) => key);

  const preferencesString = preferencesArray.join(',');

  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${recipe}&diet=${preferencesString}`;

  try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const foodOption = document.querySelector('.food-option')
        const foodData = data.results
        let foodResults = ''
        const recipeList = document.getElementById('recipe-list')
        for (let i = 0; i < foodData.length; i++) {
          foodResults += `
          <div>
            <div>
                <ul>
                    <li class='food-option' id='${foodData[i].id}'>${foodData[i].title}</li>
                </ul>
            </div>
          </div>
          ` 
          recipeList.innerHTML = foodResults  
        }
        recipeList.addEventListener('click', async function (event) {
          const clickedId = event.target.id;
          if (event.target.classList.contains('food-option')) {
              console.log('foodOption', clickedId);
              const endPoint = `https://api.spoonacular.com/recipes/${clickedId}/ingredientWidget.json/?addRecipeInformation&apiKey=${apiKey}`;
             
      
              

              try {
                  const response = await fetch(endPoint);
                  const ingredients = await response.json();
                  
                  const recipeView = document.getElementById('recipe-view')
                  
                    const ingredientData = ingredients.ingredients.forEach(ingredient => {
                    console.log(ingredient)
                        
                    
                    


                        //my image display
                    const img = document.createElement('img')
                    img.setAttribute('src', `https://spoonacular.com/recipeImages/${ingredient.image}`)
                    img.setAttribute('alt', 'image of ingredient')
                    

                    //this is my p-name tag
                    const recipe = document.createElement('p')
                    recipe.innerText = ingredient.name
                

                        //this is my span-metric tag inside p
                    const metrics = document.createElement('p')
                    metrics.innerText = 'Metric: ' + ingredient.amount.metric.value 

                        //this is my p-unitMetric tag
                    const unitMetric = document.createElement('p')
                    unitMetric.innerText = ingredient.amount.metric.unit

                    const US = document.createElement('p')
                    US.innerText = 'US: ' + ingredient.amount.us.value 

                        //this is my p-unitUS tag
                    const unitUS = document.createElement('p')
                    unitUS.innerText = ingredient.amount.us.unit

                    recipeView.appendChild(img)
                    recipeView.appendChild(recipe)
                    recipeView.appendChild(US)
                    recipeView.appendChild(unitUS)
                    recipeView.appendChild(metrics)
                    recipeView.appendChild(unitMetric)
                    
                    




                    

                   
                    // const ingUrl = `https://spoonacular.com/recipeImages/${ingredient.image}` 
                    // const imgAlt = `${ingredient.name}`
                    
                    

                    // ${ingredient.name}
                    // ${ingredient.amount.metric.value} ${ingredient.amount.metric.unit}
                    // ${ingredient.amount.us.value} ${ingredient.amount.us.unit}
                
              })
              
                  // Display ingredient details in a new div
                //   const ingredientDetailsDiv = document.getElementById('ingredientDetails');
                //   ingredientDetailsDiv.innerHTML = ingredientData.join('')
                //   console.log(JSON.stringify(ingredients))
                  
              } catch (error) {
                  console.error('Error fetching ingredient details:', error);
              }
          }
      });


      // Implement your logic to handle the API response (data variable)
      console.log('API Response:', data);



  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

// Add click event to the search button
document.getElementById('searchButton').addEventListener('click', handleSearch);

//Add click event to the EZ list button
// document.getElementById('ezBtn').addEventListener('click', async function() {

// }); 

async function displaySL() {
    // const clickedId = event.target.id;
    // const apiKEY = '21f21f2d600f49239e04c648f8312a58';

    
    const apiURL = `https://api.spoonacular.com/recipes/${clickedId}/ingredientWidget.json/?addRecipeInformation&apiKey=${apiKey}`

    try { 
        
        let response = await fetch(apiURL)
        let data = await response.json();
        console.log(data, 'kristin')

        const shoppingList = document.getElementById('shoppingList')
        const foodList = data.foodList;

        //create an unordered list
        const ulSL = document.createElement('ul')

        //create list items for each ingredient
        ingredients.forEach(ingredient => {
            const liEl = document.createElement('li');
            liEl.textContent = ingredient.name;

            //Add a click event listener to toggle the strike-through class
            liEl.addEventListener('click', () => {
                liEl.classList.toggle('strikethrough')
            })

            ulSL.appendChild(liEl)
        });

            //clear the existing content and append the new list
            shoppingList.innerHTML = '';
            shoppingList.appendChild(ulSL)


    }
    catch (error) {
        console.error('Error:', error);
    }
} 


// Load user preferences from local storage on page load
window.onload = function () {
  const storedPreferences = localStorage.getItem('userPreferences');

  if (storedPreferences) {
      const parsedPreferences = JSON.parse(storedPreferences);

      // Set checkbox states based on stored preferences
      document.getElementById('vegetarianCheckbox').checked = parsedPreferences.vegetarian;
      document.getElementById('veganCheckbox').checked = parsedPreferences.vegan;
      document.getElementById('glutenFreeCheckbox').checked = parsedPreferences.glutenFree;

      // Perform a search with the stored preferences (you might want to add this logic)
      // performSearch('', parsedPreferences);
  }
};


