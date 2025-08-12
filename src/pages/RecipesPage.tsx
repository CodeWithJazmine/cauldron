import { useState } from 'react'
import { RecipeDisplay } from '../components/RecipeDisplay.tsx'
import { RecipeForm } from '../components/RecipeForm.tsx'
import type { Recipe } from '../types/types.ts'
import { exportRecipesJSON, exportRecipesCSV } from '../utility/exportHelpers.ts'

export default function RecipesPage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const handleDeleteRecipe = (recipeId: string) => {
        setRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
    }

    const handleUpdateRecipe = (updatedRecipe: Recipe, previousId?: string) => {
        setRecipes(prev =>
            prev.map(r => (r.id === (previousId ?? updatedRecipe.id) ? updatedRecipe : r))
        );
    };

    const handleExportRecipesJSON = (): void => {
        console.log("Export Recipes JSON button pressed!");
        exportRecipesJSON(recipes);
    }

    const handleExportRecipesCSV = (): void => {
        console.log("Export Recipes CSV button pressed!");
        exportRecipesCSV(recipes)
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

            )
            }
            <h3>Export Recipes</h3>
            <button type="button" onClick={handleExportRecipesJSON}>Export JSON</button>
            <button type="button" onClick={handleExportRecipesCSV}>Export CSV</button>
        </div >
    );
}