export interface Ingredient {
    id: string;
    name: string;
    quantity: number;
    image?: string;
}

export interface Recipe {
    id: string;
    title: string;
    ingredients: Ingredient[];
    image?: string;
}

export interface RecipeFormProps {
    onRecipeSaved?: (recipe: Recipe) => void;
}

export interface RecipeDisplayProps {
    recipe: Recipe;
    onDelete?: (recipeId: string) => void;
    onUpdate?: (updatedRecipe: Recipe) => void;
}

