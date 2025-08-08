import { useState } from 'react'
import { RecipeDisplay } from '../components/RecipeDisplay.tsx'
import { RecipeForm } from '../components/RecipeForm.tsx'
import type { Recipe } from '../types/types.ts'

export default function RecipesPage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    return (
        <div>
            <h3>Recipes (Protected Page)</h3>
            <RecipeForm onRecipeSaved={(newRecipe) => setRecipes(prev => [...prev, newRecipe])} />

            <h3>Your Saved Recipes</h3>
            {recipes.map((recipe) => (
                <RecipeDisplay key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
}