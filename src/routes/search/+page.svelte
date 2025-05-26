<script lang="ts">
    import SearchForm from '$lib/components/SearchForm.svelte';
    import DogCard from '$lib/components/DogCard.svelte';
    import { getBreeds, getDogsByIds, searchDogs } from '$lib/api/dogs.ts'
    import { type Dog } from '../../lib/types.ts'
    import { loggedIn } from '../../stores/auth.js'
    import { goto } from '$app/navigation'
    import { onMount } from 'svelte'
	import { extractCursorFromUrl } from '$lib/api/apiHelpers.ts';

    

    let breeds: string[] = [];
    let selectedBreeds: string[] = [];
    let ageMin: number | undefined = undefined;
    let ageMax: number | undefined = undefined;;
    let sort = 'breed:asc';
    let dogs: Dog[] = [];
    let next = '';
    let prev = '';
    const pageSize = 20;
    let cursor = '';
    let zipCode: string = '';
    
    async function runSearch() {

        const {resultIds, next: nextCursor, prev: prevCursor } = await searchDogs({
            breeds: selectedBreeds,
            sort,
            ageMin: ageMin ?? undefined,
            ageMax: ageMax ?? undefined,
            size: pageSize,
            from: cursor,
            zipCodes: zipCode ? [zipCode] : []
        });

        dogs = await getDogsByIds(resultIds);
        next = extractCursorFromUrl(nextCursor);
        prev = extractCursorFromUrl(prevCursor);
    }
    
    function handleSubmit({
        breeds, 
        sort: sortOption,
        ageMin:submittedAgeMin,
        ageMax:submittedAgeMax,
        zipCode: submittedZipCode
    }: {
        breeds: string[], 
        sort: string,
        ageMin?:number | undefined,
        ageMax?:number | undefined,
        zipCode:string
    }) {
        selectedBreeds = breeds;
        sort = sortOption;
        ageMin = submittedAgeMin ?? undefined;
        ageMax = submittedAgeMax ?? undefined;
        cursor = '';
        zipCode = submittedZipCode;
        runSearch();
    }

    function goToNext() {
        cursor = next;
        runSearch();
    }

    function goToPrev() {
        cursor = prev;
        runSearch();
    }

    onMount(async () => {
        //Run the dog search API on page load
        breeds = await getBreeds();
        runSearch();

})


</script>
<div class="flex flex-col items-center">
    <div class="m-auto flex flex-col items-center mb-8 text-center space-y-3">
        <h1 class="text-4xl font-bold text-purple-700">Dog Search</h1>
        <h1 class="text-lg text-gray-800">Search for some dogs!</h1>
        <h1 class="text-lg text-gray-800">Favorite them by clicking on the stars, and then head to the favorites page to pick one out!</h1>
    
    </div>
    <SearchForm
        {breeds}
        {selectedBreeds}
        {sort}
        {ageMin}
        {ageMax}
        {zipCode}
        on:submitForm={(e) => {
            handleSubmit(e.detail);
        }}
    />
    
  
        <div class="flex flex-wrap justify-center gap-6 px-4">
            {#each dogs as dog}
                <DogCard {dog} />
            {/each}
        </div>
   
    
    <div class="pagination my-5">
        {#if prev}
        <button 
            on:click={goToPrev}
            class="w-[8rem] bg-blue-500 text-white px-4 py-2 rounded transition-all duration-150 ease-in-out hover:bg-blue-600 active:scale-95 disabled:bg-blue-300 disabled:cursor-not-allowed"
            disabled={!prev}
            >Previous
            </button>
        {/if}
        {#if next}
        <button on:click={goToNext}
        class="w-[8rem] bg-blue-500 text-white px-4 py-2 rounded transition-all duration-150 ease-in-out hover:bg-blue-600 active:scale-95 disabled:bg-blue-300 disabled:cursor-not-allowed"
    disabled={!next}>Next</button>
        {/if}
    </div>


</div>
