import type { Recipe } from '../types/types'
import { slugify } from './ids'

// Transform recipe for export with slugified IDs
function createExportRecipe(recipe: Recipe) {
    return {
        ...recipe,
        id: slugify(recipe.title), // Use slugified title for export ID
        ingredients: recipe.ingredients.map(ingredient => ({
            ...ingredient,
            id: slugify(ingredient.name) // Use slugified name for export ingredient ID
        }))
    };
}

function downloadBlob(data: Blob, filename: string) {
    const url = URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
// Keep output stable for clean diffs
function sortRecipes(recipes: Recipe[]): Recipe[] {
    return [...recipes].sort((a, b) => a.title.localeCompare(b.title));
}
function sortIngredientsByName<T extends { name: string }>(arr: T[]): T[] {
    return [...arr].sort((a, b) => a.name.localeCompare(b.name));
}

export function exportRecipesJSON(recipes: Recipe[]) {
    const exportRecipes = recipes.map(createExportRecipe);
    const normalized = sortRecipes(exportRecipes).map(r => ({
        recipe_id: r.id,
        recipe_title: r.title,
        recipe_category: null as string | null,
        ingredients: sortIngredientsByName(r.ingredients).map(i => ({
            ingredient_id: i.id,
            ingredient_name: i.name,
            quantity: i.quantity,
        })),
    }));

    const payload = {
        schemaVersion: "1.0.0",
        exportedAt: new Date().toISOString(),
        recipes: normalized,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    downloadBlob(blob, `cauldron-recipes-${Date.now()}.json`);
}

function csvEscape(v: unknown): string {
    const s = String(v ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function exportRecipesCSV(recipes: Recipe[]) {
    const exportRecipes = recipes.map(createExportRecipe);
    const headers = ["Row Name", "Recipe Name", "Required Ingredients", "Crafted Item Name", "Crafted Item Quantity"];
    const rows: string[] = [headers.join(",")];

    for (const r of sortRecipes(exportRecipes)) {
        const requiredIngredients = r.ingredients
            .map(ing => `(("IngredientName": "${ing.name}", "Quantity": ${ing.quantity} ))`)
            .join(", ");

        rows.push([
            r.id,
            r.title,
            `(${requiredIngredients})`,
            r.title,
            1                        // Crafted Item Quantity (assuming 1 for now)
        ].map(csvEscape).join(","));
    }

    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8" });
    downloadBlob(blob, `cauldron-recipes-ue5-${Date.now()}.csv`);
}