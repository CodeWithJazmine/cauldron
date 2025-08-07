import React from 'react';
import { sampleRecipe } from '../sample-data';

const RecipeDisplay: React.FC = () => {
    return (
        <div>
            <b>{sampleRecipe.title}</b>
            <p>Ingredients:</p>
            <ul>
                {sampleRecipe.ingredients.map(ingredient => (
                    <li key={ingredient.id}>
                        {ingredient.name} - {ingredient.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeDisplay;
