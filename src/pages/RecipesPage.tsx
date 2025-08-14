import { useState, useEffect } from 'react'
import { RecipeDisplay } from '../components/RecipeDisplay.tsx'
import { RecipeForm } from '../components/RecipeForm.tsx'
import type { Recipe } from '../types/types.ts'
import { exportRecipesJSON, exportRecipesCSV } from '../utility/exportHelpers.ts'
import { useAuth } from '../contexts/AuthContext.tsx';
import { subscribeToUserRecipes, deleteRecipe, updateRecipe } from '../services/recipeService.ts';

export default function RecipesPage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;

        const unsubscribe = subscribeToUserRecipes(user.uid, (recipes) => {
            setRecipes(recipes);
        });

        // Cleanup subscription on unmount
        return unsubscribe;
    }, [user]); const handleExportRecipesJSON = (): void => {
        console.log("Export Recipes JSON button pressed!");
        exportRecipesJSON(recipes);
    }

    const handleExportRecipesCSV = (): void => {
        console.log("Export Recipes CSV button pressed!");
        exportRecipesCSV(recipes)
    }

    const handleDeleteRecipe = async (recipeId: string) => {
        try {
            await deleteRecipe(recipeId);
            // No need to update local state - the real-time subscription will handle it
        } catch (error) {
            console.error('Error deleting recipe:', error);
            // You might want to show a user-friendly error message here
        }
    };

    const handleUpdateRecipe = async (updatedRecipe: Recipe) => {
        try {
            if (!updatedRecipe.id) {
                console.error('Recipe ID is required for updates');
                return;
            }
            await updateRecipe(updatedRecipe.id, updatedRecipe);
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };

    return (
        <div>
            <RecipeForm />

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

            <h3>Export Recipes</h3>
            <button type="button" onClick={handleExportRecipesJSON}>Export JSON</button>
            <button type="button" onClick={handleExportRecipesCSV}>Export CSV</button>
        </div>
    );
}
