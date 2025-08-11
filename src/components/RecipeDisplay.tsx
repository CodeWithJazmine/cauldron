import React from 'react';
import type { RecipeDisplayProps } from '../types/types';

export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, onDelete }) => {
    {/* TODO: Improve styling */ }
    return (
        <div>
            <b>{recipe.title}</b>
            <p>Ingredients:</p>
            <ul className="recipe-display-list">
                {recipe.ingredients.map(ingredient => (
                    <li key={ingredient.id}>
                        {ingredient.name} - {ingredient.quantity}
                    </li>
                ))}
            </ul>
            {onDelete && (
                <button onClick={() => onDelete(recipe.id)}>
                    Delete Recipe
                </button>
            )}
        </div>
    );
};
