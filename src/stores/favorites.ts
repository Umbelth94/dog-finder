import { writable } from "svelte/store";

export const favoriteIds = writable<string[]>([])
export const favoriteToggle = writable(false);