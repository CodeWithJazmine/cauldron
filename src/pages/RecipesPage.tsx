import { useState } from 'react'
import { RecipeDisplay } from '../components/RecipeDisplay.tsx'
import { RecipeForm } from '../components/RecipeForm.tsx'
import type { Recipe } from '../types/types.ts'

export default function RecipesPage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const handleDeleteRecipe = (recipeId: string) => {
        setRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
    }

    const handleUpdateRecipe = (updatedRecipe: Recipe) => {
        setRecipes(prev => prev.map(recipe =>
            recipe.id === updatedRecipe.id ? updatedRecipe : recipe
        ));
    }

    return (
        <div>
            <RecipeForm onRecipeSaved={(newRecipe) => setRecipes(prev => [...prev, newRecipe])} />

            <h2>Your Saved Recipes</h2>
            {recipes.length === 0 ? (
                <p>Add your first recipe above</p>
            ) : (
                recipes.map((recipe) => (
                    <RecipeDisplay
                        key={recipe.id}
                        recipe={recipe}
                        onDelete={handleDeleteRecipe}
                        onUpdate={handleUpdateRecipe}
                    />
                ))
            )}
        </div>
    );
}