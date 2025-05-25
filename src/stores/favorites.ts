import { writable } from "svelte/store";
import { browser } from "$app/environment";

// Fallback value
let initial: string[] = [];

if (browser) {
    const stored = localStorage.getItem('favoriteIds');
    initial = stored ? JSON.parse(stored) : [];
}

export const favoriteIds = writable<string[]>(initial);

if (browser) {
    favoriteIds.subscribe((value) => {
        localStorage.setItem('favoriteIds', JSON.stringify(value));
    });
}

// Helper to toggle a favorite
export function toggleFavorite(id: string) {
    favoriteIds.update((ids) =>
        ids.includes(id) ? ids.filter(existingId => existingId !== id) : [...ids, id]
    );
}