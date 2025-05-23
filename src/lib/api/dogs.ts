const BASE_URL = 'https://frontend-take-home-service.fetch.com';

//Get list of breeds for search component
export async function getBreeds(): Promise<string[]> {
    const res = await fetch(`${BASE_URL}/dogs/breeds`, {
        credentials: 'include',
    });
    return res.json ();
}

//Search API for list of dogs based on parameters
