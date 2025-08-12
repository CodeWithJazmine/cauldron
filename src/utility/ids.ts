export function slugify(s: string): string {
    return s.trim().toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
}

export function withRecipeIdsSynced(recipe: {
    id: string; title: string; ingredients: { id: string; name: string; quantity: number }[];
}) {
    const syncedId = slugify(recipe.title);
    return {
        ...recipe,
        id: syncedId,
        ingredients: recipe.ingredients.map(i => ({
            ...i,
            id: slugify(i.name),
        })),
    };
}