const mainContainer = document.querySelector('.main');
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('search');
const recipeId = urlParams.get('id');
const bar = document.getElementById('bar');
if (recipeId) {
    selectCategory(document.getElementById(recipeId), true);
} else if (query) {
    selectCategory(document.getElementById('all'));
    bar.value = query;
    search(query);
}  else {
    selectCategory(document.getElementById('all'), true);
}



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
    selectCategory (document.getElementById('all'));
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
    if (visibleCount <= 4) {
        mainContainer.style.justifyContent = 'flex-start'; // Left align if 4 or fewer items
        mainContainer.style.marginBottom = '28.24vh';
    } else if (visibleCount <= 5) {
        mainContainer.style.marginBottom = '28.24vh';
    }else {
        mainContainer.style.marginBottom = '3.24vh';
        mainContainer.style.justifyContent = 'center'; // Center align if more than 3 items
    }
}