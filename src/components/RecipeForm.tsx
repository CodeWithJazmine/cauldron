import React, { useState } from 'react';
import type { Ingredient, Recipe, RecipeFormProps } from '../types/types';

export const RecipeForm: React.FC<RecipeFormProps> = ({ onRecipeSaved }) => {
    const [title, setTitle] = useState('');
    const [ingredientName, setIngredientName] = useState('');
    const [ingredientQuantity, setIngredientQuantity] = useState(1);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    {/*TODO: Move styling to .css!*/ }
    const buttonStyle = {
        display: 'inline-block',
        padding: '0.5rem 1rem',
        backgroundColor: '#4a5568',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '4px'
    }

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
        // TODO: Move styling to .css!
        <div style={{
            border: '1px solid black',
            padding: '1.5rem',
            borderRadius: '4px'
        }}>
            <form onSubmit={handleSubmit}>
                <h3>Create a New Recipe</h3>

                <label>
                    Recipe Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>

                <h3>Add Ingredients</h3>
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

                <button style={buttonStyle} type="button" onClick={addIngredient}>
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
                <button style={buttonStyle} type="submit">Save Recipe</button>
            </form>
        </div>
    );
};

export default RecipeForm;