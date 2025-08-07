import React from 'react';
import type { RecipeDisplayProps } from '../types/types';

export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe }) => {
    return (
        <div>
            <b>{recipe.title}</b>
            <p>Ingredients:</p>
            <ul id="recipe-display-list">
                {recipe.ingredients.map(ingredient => (
                    <li key={ingredient.id}>
                        {ingredient.name} - {ingredient.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
};
