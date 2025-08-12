import type { Recipe } from '../types/types'

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
    const normalized = sortRecipes(recipes).map(r => ({
        id: r.id,
        title: r.title,
        // Optional fields reserved for future schema
        category: null as string | null,
        ingredients: sortIngredientsByName(r.ingredients).map(i => ({
            id: i.id,
            name: i.name,
            quantity: i.quantity,
            unit: null as string | null,
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
    const headers = ["recipe_id", "recipe_title", "category", "ingredient_id", "ingredient_name", "quantity", "unit"];
    const rows: string[] = [headers.join(",")];

    for (const r of sortRecipes(recipes)) {
        for (const ing of sortIngredientsByName(r.ingredients)) {
            rows.push([
                r.id,
                r.title,
                "",            // category placeholder
                ing.id,
                ing.name,
                ing.quantity,
                ""             // unit placeholder
            ].map(csvEscape).join(","));
        }
    }

    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8" });
    downloadBlob(blob, `cauldron-recipes-${Date.now()}.csv`);
}