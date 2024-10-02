const mainContainer = document.querySelector('.main');
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('search');
const bar = document.getElementById('bar');

// Load recipes from recipes.json and create tiles dynamically
async function loadRecipes() {
    try {
        const response = await fetch('/recipes.json');  // path to JSON file
        const recipes = await response.json();

        recipes.forEach((recipe, index) => {
            const tile = document.createElement('a');
            tile.href = `recipe.html?id=${index}`;
            tile.classList.add('fil');
            tile.setAttribute('data-category', recipe.category);

            tile.innerHTML = `
                <div class="tile">
                    <div style="height: 68%; width: 100%;">
                        <img src="${recipe.image}" class="tImg">
                    </div>
                    <div class="text">
                        <p style="margin-bottom: 9px;">${recipe.title}</p>
                        <div style="width: 100%; display: flex; justify-content: center;">
                            <img src="img/stars/${recipe.rating}star.png" style="height: 23px; margin-right: 17px;">
                            <p>${recipe.rating_count}</p>
                        </div>
                    </div>
                </div>
            `;
            mainContainer.appendChild(tile);
        });
    } catch (error) {
        console.error('Error loading recipes:', error);
    }
}

// Call the loadRecipes function to populate the page with recipes
loadRecipes();

// Category filter function
function selectCategory(element, update) {
    if (update){
        bar.value = '';
        const selectedCategory = element.getAttribute('data-category');
        const recipes = document.querySelectorAll('.fil');
        
        let visibleCount = 0;

        recipes.forEach(recipe => {
            const recipeCategory = recipe.getAttribute('data-category');
            if (selectedCategory === 'all' || recipeCategory === selectedCategory) {
                recipe.style.display = 'block';
                visibleCount++;
            } else {
                recipe.style.display = 'none';
            }
        });
        updateTiles(visibleCount);
    }

    // Update the selected filter styling
    const filters = document.querySelectorAll('.filters p');
    filters.forEach(filter => filter.classList.remove('selected'));
    element.classList.add('selected');
}

bar.addEventListener('input', function() {
    const searchQuery = this.value.toLowerCase(); // Get search input
    search(searchQuery);
});

function search(sQuery) { 
    selectCategory(document.getElementById('all'));
    const tiles = document.querySelectorAll('.tile'); // Get all recipe tiles
    let visibleCount = 0;
    // Loop through each tile and check if it matches the search query
    tiles.forEach(tile => {
        const recipeName = tile.querySelector('p').textContent.toLowerCase(); // Get the recipe name text
        if (recipeName.includes(sQuery)) {
            tile.parentElement.style.display = 'block'; // Show tile if it matches
            visibleCount++;
        } else {
            tile.parentElement.style.display = 'none'; // Hide tile if it doesn't match
        }
    });
    updateTiles(visibleCount);
}

function updateTiles(visibleCount) {
    if (visibleCount <= 5) {
        mainContainer.style.marginBottom = '28.24vh';
    } else {
        mainContainer.style.marginBottom = '3.24vh';
    }
}