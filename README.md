# Dog Finder

My first application using Sveltekit!  This app was a coding exercise that I used as an opportunity to get familiar with the front-end aspects of the Svelte framework.  I am more familiar with Next.js but the similarities between the two frameworks helped me start with a good foundation and work out from there.  Additionally, the API I was using handled it's own authentication which made things a lot easier for me.  The app is a simple dog finding service that hits a pre-configured API to find dogs based on your favorite breed and age.  After you have selected a few dogs to be your favorites, the favorites page will pair you up with one.  After that, the rest of the leg work is on you to imagine your new life with your paired dog because the app really doesn't do anything else.  

# Live Link
[Vercel Link](https://dog-finder-pink.vercel.app/)

# Installation 

- Fork or clone this repo
- type 'NPM Install' in the terminal to install all of the packages
- type 'NPM run dev' in the terminal to start up the dev environment server in order to use the application

# Usage

After logging in, navigate to the search page to find listings for dogs based on breeds, age, and zip code.  Multiple breeds can be selected and then sorted by alphabetical order, as well as age.  On the dog cards themselves, clicking on the star will "favorite" a dog and add it to your favorites list.  Navigating to the favorites page will show you all of the dogs you have favorited.  Once you have some dogs favorited, you can click the "Make a match" button to be randomly assigned a dog from your list of favorite dogs.  

# In Progress

I gave myself a week to at least fulfill the minimum requirements of the exercise and make things look nice, as well as cut out any of the jankiness of the UI that comes with learning all of the quirks of a new framework.  That said, there is some functionality that I still intend to add to give myself some more practice with not just Svelte, but front-end design in general.  Here they are in order of priority: 

- Make the location searching more robust.  i.e. Zipcodes using a general area around them instead of only finding dogs that match the specific zip code, and being able to search by city/state.

- Add page numbers to the search page instead of the simple next/back button I have to handle pagination.  (I have not done much pagination before so that was a rabbit hole I was trying to avoid spending too much time on)

- Adding a more exciting reveal to the dog matcher.  I want it to be the digital equivalent of a glitter cannon.  
