import React, { useState } from 'react';
import type { RecipeDisplayProps, Ingredient } from '../types/types';

export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(recipe.title);
    const [editIngredients, setEditIngredients] = useState<Ingredient[]>(recipe.ingredients);
    const [newIngredientName, setNewIngredientName] = useState('');
    const [newIngredientQuantity, setNewIngredientQuantity] = useState(1);
    const [showAddIngredient, setShowAddIngredient] = useState(false);

    const handleSaveEdit = () => {
        if (onUpdate) {
            const updatedRecipe = {
                ...recipe,
                title: editTitle,
                ingredients: editIngredients,
            };
            onUpdate(updatedRecipe);
        }
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditTitle(recipe.title);
        setEditIngredients(recipe.ingredients);
        setNewIngredientName('');
        setNewIngredientQuantity(1);
        setShowAddIngredient(false);
        setIsEditing(false);
    };

    const addNewIngredient = () => {
        if (!newIngredientName || newIngredientQuantity < 1) return;

        const newIngredient: Ingredient = {
            id: newIngredientName.trim().toLowerCase().replace(/\s+/g, '_'),
            name: newIngredientName,
            quantity: newIngredientQuantity,
        };

        setEditIngredients(prev => [...prev, newIngredient]);
        setNewIngredientName('');
        setNewIngredientQuantity(1);
        setShowAddIngredient(false); // Hide form after adding
    };

    const updateIngredient = (index: number, field: 'name' | 'quantity', value: string | number) => {
        setEditIngredients(prev => prev.map((ingredient, i) =>
            i === index ? { ...ingredient, [field]: value } : ingredient
        ));
    };

    const removeIngredient = (index: number) => {
        setEditIngredients(prev => prev.filter((_, i) => i !== index));
    };

    {/* TODO: Improve styling */ }
    return (
        <div>
            {isEditing ? (
                // Edit Mode
                <div>
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <p>Ingredients:</p>
                    <ul className="recipe-display-list">
                        {editIngredients.map((ingredient, index) => (
                            <li key={ingredient.id}>
                                <input
                                    type="text"
                                    value={ingredient.name}
                                    onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                                />
                                <input
                                    type="number"
                                    min="1"
                                    value={ingredient.quantity}
                                    onChange={(e) => updateIngredient(index, 'quantity', Number(e.target.value))}
                                />
                                <button onClick={() => removeIngredient(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    {showAddIngredient ? (
                        <div>
                            <h4>Add New Ingredient</h4>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    value={newIngredientName}
                                    onChange={(e) => setNewIngredientName(e.target.value)}
                                />
                            </label>
                            <label>
                                Quantity:
                                <input
                                    type="number"
                                    min="1"
                                    value={newIngredientQuantity}
                                    onChange={(e) => setNewIngredientQuantity(Number(e.target.value))}
                                />
                            </label>
                            <button type="button" onClick={addNewIngredient}>
                                Add Ingredient
                            </button>
                            <button type="button" onClick={() => setShowAddIngredient(false)}>
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button type="button" onClick={() => setShowAddIngredient(true)}>
                            + Add Ingredient
                        </button>
                    )}

                    <div>
                        <button onClick={handleSaveEdit}>Save</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                    </div>
                </div>
            ) : (
                // View Mode
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
                    <div>
                        {onUpdate && (
                            <button onClick={() => setIsEditing(true)}>Edit</button>
                        )}
                        {onDelete && (
                            <button onClick={() => onDelete(recipe.id)}>Delete Recipe</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
