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

    // Update alignment based on the number of visible items
    const mainContainer = document.querySelector('.main');
    if (visibleCount <= 4) {
        mainContainer.style.justifyContent = 'flex-start'; // Left align if 3 or fewer items
    } else {
        mainContainer.style.justifyContent = 'center'; // Center align if more than 3 items
    }
}
