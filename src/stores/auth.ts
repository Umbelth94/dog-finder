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

//TODO: Add a check that will set loggedIn to false if it pings the API and it is not authorized (In case of timeout)