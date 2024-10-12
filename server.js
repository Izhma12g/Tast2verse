const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

// Serve static files (like the HTML file)
app.use(express.static(__dirname));
app.use(bodyParser.json());

// Endpoint to save the recipe
app.post('/saveRecipe', (req, res) => {
    const newRecipe = req.body;
    const filePath = path.join(__dirname, 'recipes.json');

    // Read the existing recipes from the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading file' });
        }

        let recipes = [];
        try {
            recipes = JSON.parse(data);
        } catch (parseError) {
            return res.status(500).json({ message: 'Error parsing JSON' });
        }

        // Add the new recipe
        recipes.push(newRecipe);

        // Write the updated recipes array back to the file
        fs.writeFile(filePath, JSON.stringify(recipes, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error writing file' });
            }
            res.json({ message: 'Recipe saved successfully!' });
        });
    });
});

// Endpoint to serve recipe pages
app.get('/recipe', (req, res) => {
    console.log('Request for recipe page:');
    const recipeId = req.query.id; // Get the recipe ID from the query string
    const filePath = path.join(__dirname, 'recipes.json');

    // Read the recipes from the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading recipes file.');
        }

        let recipes;
        try {
            recipes = JSON.parse(data);
        } catch (parseError) {
            return res.status(500).send('Error parsing recipes JSON.');
        }

        const recipe = recipes[recipeId]; // Find the relevant recipe


        if (recipe) {
            let recipeImg;
            if (recipeId < 10) {
                recipeImg = `http://tastiverse.cloud-ip.biz/${recipe.image}`
            }
            else {
                recipeImg = recipe.image;
            }
            console.log(recipeId);
            console.log(recipeImg);
            const half = Math.ceil(recipe.ingredients.length / 2);
            const ingredientsLeft = recipe.ingredients.slice(0, half);
            const ingredientsRight = recipe.ingredients.slice(half);
            const description = recipe.steps.slice(0, 190) + '...';
            const fSteps = recipe.steps.replace(/\n/g, '<br>');
            // Generate the HTML content with Open Graph tags
            const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <link rel="stylesheet" href="recipe.css">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${recipe.title}</title>
                <meta name="description" content="${description}">
                <meta property="og:title" content="${recipe.title}">
                <meta property="og:description" content="${description}">
                <meta property="og:image" content="${recipeImg}">
                <meta property="og:url" content="${req.protocol}://http://tastiverse.cloud-ip.biz${req.originalUrl}">
                <meta name="twitter:card" content="summary_large_image">
                <meta name="twitter:title" content="${recipe.title}">
                <meta name="twitter:description" content="${description}">
                <meta name="twitter:image" content="${recipeImg}">
                <meta name="theme-color" content="#ECAB55">
                <link rel="icon" type="image/x-icon" href="${recipe.image}">
            </head>
            <body>
 <div class="navbar" id="navbar">
        <a href="index.html"><img src="img/tLogo.png" class="navLogo"></a>
        <a href="index.html"><p class="navTxt">Home</p></a>
        <a class="navTxt" href="explore.html">Explore</a>
        <a class="navTxt" href="create.html">Create</a>
        <a class="navTxt" href="tips.html">Kitchen Tips</a>
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
            <a href="recipe?id=6">
                <div class="latest">
                    <hr>
                    <div class="latestAll">
                        <div class="latestTxt">
                            <h3>Dinner Recipe</h3>
                            <p class="name">Texas Style BBQ<br>Ribs With Secret Sauce </p>
                            <p class="time">2 Hours Cooking time</p>
                            <div class="rating">
                                <img src="img/stars/5star.png" style="width: 6vw;">
                                <h2>64</h2>
                            </div>
                        </div>
                        <img src="img/steak.jpg" style="width: 6.25vw; height: 12.592vh; object-fit: cover; margin-right: 10px;">
                    </div>  
                </div> 
            </a>
            <a href="recipe?id=9">
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
                        <img src="img/drink.jpg" style="object-position: -56px; width: 6.25vw; height: 12.592vh; object-fit: cover; margin-right: 10px;">
                    </div>  
                </div> 
            </a>
            <a href="recipe?id=3">
                <div class="latest">
                    <hr>
                    <div class="latestAll">
                        <div class="latestTxt">
                            <h3>Lunch Recipe</h3>
                            <p class="name">Authentic Italian style<br>Pesto Pasta Recipe</p>
                            <p class="time">1.5 Hours Cooking time</p>
                            <div class="rating">
                                <img src="img/stars/4star.png" style="width: 6vw;">
                                <h2>64</h2>
                            </div>
                        </div>
                        <img src="img/pesto.jpg" style="width: 6.25vw; height: 12.592vh; object-fit: cover; margin-right: 10px;">
                    </div>  
                </div> 
            </a>
            <a href="recipe?id=4">
                <div class="latest">
                    <hr>
                    <div class="latestAll">
                        <div class="latestTxt">
                            <h3>Snack Recipe</h3>
                            <p class="name">Sweet Korean Fried<br>Chicken Popcorn</p>
                            <p class="time">30 Minutes Cooking time</p>
                            <div class="rating">
                                <img src="img/stars/1star.png" style="width: 6vw;">
                                <h2>24</h2>
                            </div>
                        </div>
                        <img src="img/popcorn.jpg" style="width: 6.25vw; height: 12.592vh; object-fit: cover; margin-right: 10px;">
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
    </body>
</html>`;
            res.send(html); // Send the generated HTML as the response
        } else {
            res.status(404).send('Recipe not found');
        }
    });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
