export interface Ingredient {
    id: string;
    name: string;
    quantity: number;
    image?: string;
}

export interface Recipe {
    id?: string;
    title: string;
    ingredients: Ingredient[];
    image?: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface RecipeDisplayProps {
    recipe: Recipe;
    onDelete?: (recipeId: string) => void;
    onUpdate?: (updatedRecipe: Recipe) => void;
}

