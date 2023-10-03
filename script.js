//API: add store locator

// (Nick) 1. When I search for a recipe, I can filter recipes by dietary preferences.
    //a. grab search button via the DOM
    //b. add click event for search button
        //1. prevent default for form input to stop page from refreshing
    //c. grab input box   
        //. create filter button within input field to filter recipes by dietary preference/restrictions with a checkbox next to each restriction that user can click to confirm preferences to include in search. 
            //. user preferences would go into local storage?
        
        
// (Ja) 2. Once user clicks the search button, a list of recipes will populate depending on preferences. 
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
        
// (Kristin) 5. When user views their EZ list, then they can remove items they already have at home.
    //1. Dynamically add a remove <button> in generateEZList()? 
     //add an id for this    
    
// (Nick) 6. When user is shopping at the grocery store, then they can mark items off their EZ list as they shop. 
    //1. Dynamically strike-through to mark that ingredient item as done.
    // 
    
// (Carly) 7. Add store locator (Carly Google API)  

//https://api.spoonacular.com/recipes/complexSearch?query=${searchValue}&chainonsomeshit

//&apiKey=${APIKey}
        
const APIkey = 