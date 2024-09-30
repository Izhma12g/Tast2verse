const mainContainer = document.querySelector('.main');
const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');
console.log(recipeId);
if (recipeId) {
    selectCategory(document.getElementById(recipeId));
} else {
    selectCategory(document.getElementById('all'));
}



function selectCategory(element) {
    const selectedCategory = element.getAttribute('data-category');
    const recipes = document.querySelectorAll('.fil');
    
    let visibleCount = 0;

    recipes.forEach(recipe => {
        const recipeCategory = recipe.getAttribute('data-category');
        if (selectedCategory === 'all' || recipeCategory === selectedCategory) {
            recipe.style.display = 'flex';
            visibleCount++;
        } else {
            recipe.style.display = 'none';
        }
    });

    // Update the selected filter styling
    const filters = document.querySelectorAll('.filters p');
    filters.forEach(filter => filter.classList.remove('selected'));
    element.classList.add('selected');
    updateTiles(visibleCount);
}

document.querySelector('input[type="text"]').addEventListener('input', function() {
    const searchQuery = this.value.toLowerCase(); // Get search input
    const tiles = document.querySelectorAll('.tile'); // Get all recipe tiles
    let visibleCount = 0;
    // Loop through each tile and check if it matches the search query
    tiles.forEach(tile => {
        const recipeName = tile.querySelector('p').textContent.toLowerCase(); // Get the recipe name text
        if (recipeName.includes(searchQuery)) {
            tile.parentElement.style.display = 'block'; // Show tile if it matches
            visibleCount++;
        } else {
            tile.parentElement.style.display = 'none'; // Hide tile if it doesn't match
        }
    });
    updateTiles(visibleCount);
});

function updateTiles(visibleCount) {
    if (visibleCount <= 4) {
        mainContainer.style.justifyContent = 'flex-start'; // Left align if 3 or fewer items
        mainContainer.style.marginBottom = '28.24vh';
    } else if (visibleCount <= 5) {
        mainContainer.style.marginBottom = '28.24vh';
    }else {
        mainContainer.style.marginBottom = '3.24vh';
        mainContainer.style.justifyContent = 'center'; // Center align if more than 3 items
    }
}