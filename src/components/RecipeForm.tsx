import { useState, useRef } from 'react';
import type { Ingredient, Recipe } from '../types/types';
import { createRecipe } from '../services/recipeService';
import { useAuth } from '../contexts/AuthContext';
import { slugify } from '../utility/ids';

export const RecipeForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [ingredientName, setIngredientName] = useState('');
    const [ingredientQuantity, setIngredientQuantity] = useState(1);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const ingredientInputRef = useRef<HTMLInputElement>(null);
    const { user } = useAuth();

    const addIngredient = () => {
        if (!ingredientName || ingredientQuantity < 1) return;

        const newIngredient: Ingredient = {
            id: slugify(ingredientName),
            name: ingredientName,
            quantity: ingredientQuantity,
        };

        setIngredients([...ingredients, newIngredient]);
        setIngredientName('');
        setIngredientQuantity(1);

        ingredientInputRef.current?.focus();
    };

    const saveRecipe = async (recipeData: Omit<Recipe, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
        if (!user) {
            setError('You must be logged in to save recipes');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            await createRecipe({
                ...recipeData,
                userId: user.uid
            });

            // Success - reset form
            setTitle('');
            setIngredients([]);

        } catch (error) {
            console.error('Error saving recipe:', error);
            setError('Failed to save recipe. Please try again.');
        } finally {
            setLoading(false);
        }
    }; const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addIngredient();
    };

    const handleSaveRecipe = async () => {
        if (!title.trim() || ingredients.length === 0) {
            setError('Please add a title and at least one ingredient');
            return;
        }

        const recipeData = {
            title: title.trim(),
            ingredients,
        };

        await saveRecipe(recipeData);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Create a New Recipe</h3>

                {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

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

                <button type="submit" disabled={!ingredientName.trim()}>
                    Add Ingredient
                </button>
            </form>

            {/* Display the current ingredients in the recipe being created*/}
            <ul className="recipe-display-list">
                {ingredients.map((ing) => (
                    <li key={ing.id}>
                        {ing.name} - {ing.quantity}
                    </li>
                ))}
            </ul>

            <button
                type="button"
                onClick={handleSaveRecipe}
                disabled={loading || !title.trim() || ingredients.length === 0}
            >
                {loading ? 'Saving...' : 'Save Recipe'}
            </button>
        </div>
    );
};

export default RecipeForm;