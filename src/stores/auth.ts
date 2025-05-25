import { writable } from "svelte/store";

//browser is only true when the code is running in the browser.
import { browser } from '$app/environment'


export const loggedIn = writable(false);

//This block just makes sure we don't lose our "logged in" status on the front end when the page is refreshed
if (browser) {
    const stored = localStorage.getItem('loggedIn');
    if (stored === 'true') {
        loggedIn.set(true);
    }
    
    //Keep localstorage in sync with the store
    loggedIn.subscribe((value) => {
        localStorage.setItem('loggedIn', value.toString());
    });
}

//This hits an endpoint that requires the user to be logged in.  I am using it to verify if the user is logged in during start up so that the local storage doesn't think the user is logged in when they don't have a login cookie
export async function verifyLogin(): Promise<boolean> {
    try {
        const res = await fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
            method: 'GET',
            credentials: 'include'
        });
        return res.ok;
    } catch (error) {
        console.error('Error verifying login:', error);
        return false;
    }
}