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

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
