const BASE_URL = 'https://frontend-take-home-service.fetch.com'

export async function getBreeds(): Promise<string[]> {
    const res = await fetch(`${BASE_URL}/dogs/breeds`, {
        credentials: 'include',
    });
    return res.json ();
}

//Search API for list of dogs based on parameters in searchform component
export async function searchDogs({
    breeds = [],
    // zipCodes = [],
    // ageMin,
    // ageMax,
    sort,
    size,
    from,
}: {
    breeds: string[],
    // zipCodes?: string[],
    // ageMin?: number;
    // ageMax?: number;
    sort?: string,
    size?: number,
    from?: string
}) {
    const params = new URLSearchParams();

    if (breeds.length) {
        for (const breed of breeds) {
            params.append('breeds',breeds.join(','));
        }
    }

    // if (zipCodes.length) {
    //     for (const zip of zipCodes) {
    //         params.append('zipCodes',zip);
    //     }
    // }

    // if (ageMin !== undefined) params.set('ageMin', ageMin.toString());
    // if (ageMax !== undefined) params.set('ageMax', ageMax.toString());
    if (sort) params.set('sort', sort);
    if (size) params.set('size',size.toString());
    if (from) params.set('from',from);

    const res = await fetch(
        `https://frontend-take-home-service.fetch.com/dogs/search?${params.toString()}`,
        {
            method:'POST',
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