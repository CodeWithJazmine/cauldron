import React, { useState } from 'react';
import type { Ingredient, Recipe, RecipeFormProps } from '../types/types';

export const RecipeForm: React.FC<RecipeFormProps> = ({ onRecipeSaved }) => {
    const [title, setTitle] = useState('');
    const [ingredientName, setIngredientName] = useState('');
    const [ingredientQuantity, setIngredientQuantity] = useState(1);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    const addIngredient = () => {
        if (!ingredientName || ingredientQuantity < 1) return;

        const newIngredient: Ingredient = {
            id: ingredientName.trim().toLowerCase().replace(/\s+/g, '_'),
            name: ingredientName,
            quantity: ingredientQuantity,
        };

        setIngredients([...ingredients, newIngredient]);
        setIngredientName('');
        setIngredientQuantity(1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const recipeData: Recipe = {
            id: title.trim().toLowerCase().replace(/\s+/g, '_'),
            title,
            ingredients,
        };
        console.log('Recipe created:', recipeData);

        if (onRecipeSaved) {
            onRecipeSaved(recipeData);
        }

        setTitle('');
        setIngredients([]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a New Recipe</h2>

            <label>
                Recipe Title:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>

            <h4>Add Ingredient</h4>
            <label>
                Name:
                <input
                    type="text"
                    value={ingredientName}
                    onChange={(e) => setIngredientName(e.target.value)}
                />
            </label>

            <br></br>{ /*Is there another way to create a new line? */}

            <label>
                Quantity:
                <input
                    type="number"
                    min="1"
                    value={ingredientQuantity}
                    onChange={(e) => setIngredientQuantity(Number(e.target.value))}
                />
            </label>

            <br></br>  { /*Is there another way to create a new line? */}

            <button type="button" onClick={addIngredient}>
                Add Ingredient
            </button>

            <ul id="recipe-display-list">
                {ingredients.map((ing) => (
                    <li key={ing.id}>
                        {ing.name} - {ing.quantity}
                    </li>
                ))}
            </ul>

            <br></br>  { /*Is there another way to create a new line? */}
            <button type="submit">Save Recipe</button>
        </form>
    );
};

export default RecipeForm;