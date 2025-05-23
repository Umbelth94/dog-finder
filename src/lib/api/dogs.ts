import type { Dog } from "$lib/types.ts";

const BASE_URL = 'https://frontend-take-home-service.fetch.com';

//Get list of breeds for search component
export async function getBreeds(): Promise<string[]> {
    const res = await fetch(`${BASE_URL}/dogs/breeds`, {
        credentials: 'include',
    });
    return res.json ();
}

//Search API for list of dogs based on parameters in searchform component
export async function searchDogs({
    breeds,
    sort,
    size,
    from,
}: {
    breeds: string[],
    sort: string,
    size: number,
    from?: string
}): Promise<{resultIds: string[], next?: string, prev?: string, total: number}> {
    const url = new URL(`${BASE_URL}/dogs/search`);
    if (breeds.length) url.searchParams.append('breeds',breeds.join(','));
    if (sort) url.searchParams.set('sort', sort);
    url.searchParams.set('size', size.toString());
    if (from) url.searchParams.set('from', from);

    const res = await fetch(url.toString(), {credentials: 'include'});
    return res.json();
}

//Get info about specific dogs by ID's
export async function getDogsByIds(ids: string[]) : Promise<Dog[]>{
    const res = await fetch(`${BASE_URL}/dogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(ids),
    });
    return res.json();
}