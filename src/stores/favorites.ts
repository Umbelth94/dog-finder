import { writable } from "svelte/store";

export const favoriteIds = writable<string[]>([])