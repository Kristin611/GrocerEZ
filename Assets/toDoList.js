const ezBtn = document.getElementById("EzBtn");

function handleButtonClick() {
    alert("Button Clicked!"); // You can replace this with your desired action
}
ezBtn.addEventListener("click", handleButtonClick);

        async function scrapeRecipe(url) {
            console.log(url)
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to retrieve the webpage');
                }
                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                // Modify this part according to the structure of the recipe website
                const ingredients = Array.from(doc.querySelectorAll('.recipe-ingredients li'))
                    .map((ingredientElement) => ingredientElement.textContent.trim());

                return ingredients;
            } catch (error) {
                console.error('Failed to retrieve the webpage:', error);
                return [];
            }
        }

        // Function to add ingredients to a shopping list
        function addToShoppingList(ingredients, shoppingList) {
            shoppingList.push(...ingredients);
        }

        // Event listener for the button click
        document.getElementById('EzBtn').addEventListener('click', async () => {
            const recipeUrl = 'https://example.com/recipe-url'; // Replace with the actual recipe URL
            const shoppingList = [];

            const recipeIngredients = await scrapeRecipe(recipeUrl);
            addToShoppingList(recipeIngredients, shoppingList);

            console.log('Shopping List:');
            shoppingList.forEach((item) => {
                console.log(item);
            });
        });
