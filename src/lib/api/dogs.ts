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
    breeds = [],
    zipCodes = [],
    ageMin,
    ageMax,
    sort,
    size,
    from,
}: {
    breeds: string[],
    zipCodes?: string[],
    ageMin?: number;
    ageMax?: number;
    sort?: string,
    size?: number,
    from?: string
}) {
    const url = new URL(`${BASE_URL}/dogs/search`);

    if (breeds.length) {
        for (const breed of breeds) {
            url.searchParams.append('breeds',breed);
        }
    }

    if (zipCodes.length) {
        for (const zip of zipCodes) {
            url.searchParams.append('zipCodes',zip);
        }
    }

    if (ageMin !== undefined) url.searchParams.set('ageMin', ageMin.toString());
    if (ageMax !== undefined) url.searchParams.set('ageMax', ageMax.toString());
    if (sort) url.searchParams.set('sort', sort);
    if (size) url.searchParams.set('size',size.toString());
    if (from) url.searchParams.set('from',from);

    const res = await fetch(
        url.toString(),
        {
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch dog search results');
    }
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

    if (!res.ok) {
        throw new Error('Failed to fetch dogs by ID')
    }
    return res.json();
}

export async function matchDogByIds(ids:string[]) : Promise<string[]>{
    const res = await fetch(`${BASE_URL}/dogs/match`, {
        method:'POST',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(ids),
    })
    if (!res.ok) {
        throw new Error('Failed to match a dog by ID')
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [data.match]
    
}