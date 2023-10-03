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
  const apiKey = '40d6fe324c1c4704ae9a77905aa534f1'; 
  console.log("u clicked me")


  const preferencesArray = Object.entries(preferences)
      .filter(([key, value]) => value)
      .map(([key, value]) => key);

  const preferencesString = preferencesArray.join(',');

  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${recipe}&diet=${preferencesString}`;

  try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Implement your logic to handle the API response (data variable)
      console.log('API Response:', data);
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

// Add click event to the search button
document.getElementById('searchButton').addEventListener('click', handleSearch);


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