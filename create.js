const prev = document.getElementById('display');
const form = document.getElementById('recipeForm');
const msg = document.getElementById('message');

document.querySelectorAll('.til').forEach(function(tilElement) {
    tilElement.addEventListener('input', function() {
        getData();
    });
});

function preview(recipe) {
    try {
        const oldTile = document.querySelector('.tile');
        if (oldTile) {
            prev.removeChild(oldTile);
        }
        const tile = document.createElement('div');
        tile.classList.add('tile');

        tile.innerHTML = `
            <div style="height: 68%; width: 100%;">
                <img src="${recipe.image}" class="tImg">
            </div>
            <div class="text">
                <p style="margin-bottom: 9px;">${recipe.title}</p>
                <div style="width: 100%; display: flex; justify-content: center;">
                    <img src="img/stars/${recipe.rating}star.png" style="height: 23px; margin-right: 17px;">
                    <p>1</p>
                </div>
            </div>
        `;
        prev.appendChild(tile);
    } catch (error) {
        console.error('Error loading recipes:', error);
    }
}

function getData() {
    const rating = document.getElementById('rating').value;
    const image = document.getElementById('image').value;
    const title = document.getElementById('title').value;
    const ingredients = document.getElementById('ingredients').value.split(',');
    const steps = document.getElementById('steps').value;
    const category = document.getElementById('category').value; 

    let recipe = {
        title: title,
        image: image,
        ingredients: ingredients.map(ingredient => ingredient.trim()),
        steps: steps,
        category: category,
        rating: rating,
        rating_count: 1
    };


    return checkImage(image).then((result) => {
        if (result === recipe.image) {
            console.log(recipe);  // Correctly logs the recipe object
            msg.innerText = '';   // Clear any error messages
            preview(recipe);      // Preview the recipe
            return recipe;        // Return the recipe object
        } else {
            console.log('Using fallback image');
            recipe.image = result;  // Use fallback image
            preview(recipe);        // Preview the recipe with fallback
            return null;          // Return the recipe object with fallback image
        }
    });
}

function checkImage(image) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(image);
        img.onerror = () => resolve('img/404.jpg');
        img.src = image;
    });
}

form.addEventListener('submit', async function(event) {
    event.preventDefault();
    try {
        console.log('submit');
        const recipe = await getData();
        console.log(recipe);
        if (!recipe) {
            console.log(recipe);
            msg.innerText = 'Error loading image.';
            return;
        }
        const response = await fetch('/saveRecipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipe)
        });

        const result = await response.json();
        msg.style.color = 'green';
        msg.innerText = result.message;
    } catch (error) {
        msg.innerText = 'Error saving recipe.';
    }
});