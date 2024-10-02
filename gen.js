const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');
if (recipeId) { loadRecipe();}

async function loadRecipe() {
    try {
        const response = await fetch('/recipes.json');  // path to JSON file
        const recipes = await response.json();
        generateRecipePage(recipes[recipeId]);
    } catch (error) {
        console.error('Error loading recipe:', error);
    }
}


function generateRecipePage(recipe) {
    const half = Math.ceil(recipe.ingredients.length / 2);
    const ingredientsLeft = recipe.ingredients.slice(0, half);
    const ingredientsRight = recipe.ingredients.slice(half);
    const fSteps = recipe.steps.replace(/\n/g, '<br>');
    const recipeHtml = `
        <div class="navbar" id="navbar">
        <a href="index.html"><img src="img/tLogo.png" class="navLogo"></a>
        <a href="index.html"><p class="navTxt">Home</p></a>
        <a class="navTxt" href="explore.html">Explore</a>
        <a class="navTxt" href="create.html">Create</a>
        <p class="navTxt" style="color: #835d2b;">Kitchen Tips</p>
        <a class="navTxt" href="aboutus.html">About Us</a>
        <input type="text" placeholder="What recipe are you after?">
         <img onclick="search()" src="img/search.png" style="width: 18px; margin-left: -34px;" id="btn">
    </div>
    <div class="wrapper">
        <div class="left">
            <h1>${recipe.title}</h1>
            <div class="box">
                <div class="top">
                    <img src="${recipe.image}" class="recipeImg">
                    <div class="ingredients">
                        <h2 class="title">Ingredients List</h2>
                        <hr style="border: 0; border-top: 2px solid #000; width: 96%;">
                        <div class="list">
                            <ul>
                                ${ingredientsLeft.map(ingredient => `<li>${ingredient}</li>`).join('')}
                            </ul>
                            <ul>
                                ${ingredientsRight.map(ingredient => `<li>${ingredient}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
                <hr style="border: 0; border-top: 2px solid #000; margin-bottom: 8px;">
                <p class="desc">${fSteps}</p>
            </div>
        </div>
        <div class="right">
            <p style="margin: 0 6px 4px 10px">Latest Recipes</p>
            <a href="recipe.html?id=6">
                <div class="latest">
                    <hr>
                    <div class="latestAll">
                        <div class="latestTxt">
                            <h3>Dinner Recipe</h3>
                            <p class="name">Texas Style BBQ Ribs With Secret Sauce </p>
                            <p class="time">2 Hours Cooking time</p>
                            <div class="rating">
                                <img src="img/stars/5star.png" style="width: 6vw;">
                                <h2>64</h2>
                            </div>
                        </div>
                        <img src="img/steak.jpg" style="width: 120px; height: 120px; object-fit: cover; margin-right: 10px;">
                    </div>  
                </div> 
            </a>
            <a href="recipe.html?id=9">
                <div class="latest">
                    <hr>
                    <div class="latestAll">
                        <div class="latestTxt">
                            <h3>Drink Recipe</h3>
                            <p class="name">15 Minute Homemade <br> Iced Bubble tea </p>
                            <p class="time">30 Minutes Preperation</p>
                            <div class="rating">
                                <img src="img/stars/3star.png" style="width: 6vw;">
                                <h2>128</h2>
                            </div>
                        </div>
                        <img src="img/drink.jpg" style="object-position: -56px; width: 120px; height: 120px; object-fit: cover; margin-right: 10px;">
                    </div>  
                </div> 
            </a>
            <a href="recipe.html?id=3">
                <div class="latest">
                    <hr>
                    <div class="latestAll">
                        <div class="latestTxt">
                            <h3>Lunch Recipe</h3>
                            <p class="name">Authentic Italian style Pesto Pasta Recipe</p>
                            <p class="time">1.5 Hours Cooking time</p>
                            <div class="rating">
                                <img src="img/stars/4star.png" style="width: 6vw;">
                                <h2>64</h2>
                            </div>
                        </div>
                        <img src="img/pesto.jpg" style="width: 120px; height: 120px; object-fit: cover; margin-right: 10px;">
                    </div>  
                </div> 
            </a>
            <a href="recipe.html?id=4">
                <div class="latest">
                    <hr>
                    <div class="latestAll">
                        <div class="latestTxt">
                            <h3>Snack Recipe</h3>
                            <p class="name">Sweet Korean Fried Chicken Popcorn</p>
                            <p class="time">30 Minutes Cooking time</p>
                            <div class="rating">
                                <img src="img/stars/1star.png" style="width: 6vw;">
                                <h2>24</h2>
                            </div>
                        </div>
                        <img src="img/popcorn.jpg" style="width: 120px; height: 120px; object-fit: cover; margin-right: 10px;">
                    </div>  
                </div> 
            </a>
            <hr>
        </div>
    </div>
    <footer>
        <p>© 2024 Tastiverse. All rights reserved.</p>
        <div class="icons">
            <img src="img/icons/txt.png">
            <div class="iLinks">
                <a href="https://twitter.com"><img src="img/icons/t.png"></a>
                <a href="https://facebook.com"><img src="img/icons/f.png"></a>
                <a href="https://nz.pinterest.com/search/pins/?q=juicy%20dinner&rs=typed"><img src="img/icons/p.png"></a>
                <a href="https://instagram.com"><img src="img/icons/cam.png"></a>
            </div>
        </div>  
    </footer>
    `;
    
    document.body.innerHTML = recipeHtml;
}
