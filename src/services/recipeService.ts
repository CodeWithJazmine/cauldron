import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    where,
    orderBy,
    Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Recipe } from '../types/types';
import { slugify } from '../utility/ids';

// Collection reference
const recipesCollection = collection(db, 'recipes');

// Create a new recipe
export const createRecipe = async (recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
        const docRef = await addDoc(recipesCollection, {
            ...recipe,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating recipe:', error);
        throw error;
    }
};

// Update an existing recipe
export const updateRecipe = async (id: string, updates: Partial<Recipe>) => {
    const docRef = doc(db, 'recipes', id);
    await updateDoc(docRef, {
        ...updates,
        updatedAt: Timestamp.now(),
    });
};

// Delete a recipe
export const deleteRecipe = async (id: string) => {
    const docRef = doc(db, 'recipes', id);
    await deleteDoc(docRef);
};

// Get all recipes for a user
export const getUserRecipes = async (userId: string) => {
    const q = query(
        recipesCollection,
        where('userId', '==', userId),
        orderBy('updatedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })) as Recipe[];
};

// Get a single recipe
export const getRecipe = async (id: string) => {
    const docRef = doc(db, 'recipes', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Recipe;
    }
    return null;
};

// Listen to user's recipes in real-time
export const subscribeToUserRecipes = (userId: string, callback: (recipes: Recipe[]) => void) => {
    const q = query(
        recipesCollection,
        where('userId', '==', userId)
    );

    return onSnapshot(q, (querySnapshot) => {
        const recipes = querySnapshot.docs.map(doc => {
            const data = doc.data();

            const recipe = {
                id: doc.id,
                ...data
            } as Recipe;

            // Normalize ingredient IDs to ensure consistency
            return normalizeIngredientIds(recipe);
        });

        // Sort in memory for now
        recipes.sort((a, b) => {
            const aTime = a.updatedAt?.getTime ? a.updatedAt.getTime() : 0;
            const bTime = b.updatedAt?.getTime ? b.updatedAt.getTime() : 0;
            return bTime - aTime; // Descending order
        });

        callback(recipes);
    }, (error) => {
        console.error('Subscription error:', error);
    });
};// Helper function to normalize ingredient IDs in recipes
// This ensures all ingredient IDs are consistently generated from their names
export const normalizeIngredientIds = (recipe: Recipe): Recipe => {
    return {
        ...recipe,
        ingredients: recipe.ingredients.map(ingredient => ({
            ...ingredient,
            id: slugify(ingredient.name)
        }))
    };
};