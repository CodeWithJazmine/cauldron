import { useState } from 'react'
import { RecipeDisplay } from '../components/RecipeDisplay.tsx'
import { RecipeForm } from '../components/RecipeForm.tsx'
import type { Recipe } from '../types/types.ts'

export default function RecipesPage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    return (
        <div>
            <RecipeForm onRecipeSaved={(newRecipe) => setRecipes(prev => [...prev, newRecipe])} />

            <h2>Your Saved Recipes</h2>
            {/* TODO: Fix styling so each recipe is it's own card & add placeholder text is recipes are empty*/}
            {recipes.map((recipe) => (
                <RecipeDisplay key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
}