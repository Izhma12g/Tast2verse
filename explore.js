const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');
console.log(recipeId);
if (recipeId) {
    selectCategory(document.getElementById(recipeId));
} else {
    selectCategory(document.getElementById('all'));
}




function selectCategory(element) {
    console.log(element);
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => {
        p.classList.remove('selected');
    });
    element.classList.add('selected');
}