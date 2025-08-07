interface Ingredient {
    id: string;
    name: string;
    quantity: number;
    image?: string;
}

interface Recipe {
    id: string;
    title: string;
    ingredients: Ingredient[];
    image?: string;
}

export type { Ingredient, Recipe };
