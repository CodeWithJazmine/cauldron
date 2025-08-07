import type { Ingredient, Recipe } from './types/types.ts';

export const sampleIngredients: Ingredient[] = [
    {
        id: 'red-herb',
        name: 'Red Herb',
        quantity: 2
    },
    {
        id: 'magic-water',
        name: 'Magic Water',
        quantity: 1
    }
];

export const sampleRecipe: Recipe = {
    id: 'health-potion',
    title: 'Health Potion',
    ingredients: sampleIngredients,
};