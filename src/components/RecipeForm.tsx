import { useState, useRef } from 'react';
import type { Ingredient, Recipe, RecipeFormProps } from '../types/types';

export const RecipeForm: React.FC<RecipeFormProps> = ({ onRecipeSaved }) => {
    const [title, setTitle] = useState('');
    const [ingredientName, setIngredientName] = useState('');
    const [ingredientQuantity, setIngredientQuantity] = useState(1);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    const ingredientInputRef = useRef<HTMLInputElement>(null);

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

        ingredientInputRef.current?.focus();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addIngredient();
    };

    const handleSaveRecipe = () => {
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
                Ingredient:
                <input
                    ref={ingredientInputRef}
                    type="text"
                    value={ingredientName}
                    onChange={(e) => setIngredientName(e.target.value)}
                />
            </label>

            <label>
                Quantity:
                <input
                    type="number"
                    min="1"
                    value={ingredientQuantity}
                    onChange={(e) => setIngredientQuantity(Number(e.target.value))}
                />
            </label>


            <button type="submit">
                Add Ingredient
            </button>

            {/* Display the current ingredients in the recipe being created*/}
            <ul className="recipe-display-list">
                {ingredients.map((ing) => (
                    <li key={ing.id}>
                        {ing.name} - {ing.quantity}
                    </li>
                ))}
            </ul>

            <button type="button" onClick={handleSaveRecipe}>Save Recipe</button>
        </form>
    );
};

export default RecipeForm;