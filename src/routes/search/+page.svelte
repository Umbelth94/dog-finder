<script lang="ts">
    import SearchForm from '$lib/components/SearchForm.svelte';
    import DogCard from '$lib/components/DogCard.svelte';
    import { getBreeds, getDogsByIds, searchDogs } from '$lib/api/dogs.ts'
    import { type Dog } from '../../lib/types.ts'
    import { loggedIn } from '../../stores/auth.js'
    import { goto } from '$app/navigation'
    import { onMount } from 'svelte'
    //Verify if the user is logged in
    
    let breeds: string[] = [];
    let selectedBreeds: string[] = [];
    let sort = 'breed:asc';
    let dogs: Dog[] = [];
    let next = '';
    let prev = '';
    const pageSize = 20;
    let cursor = '';
    
    async function runSearch() {
        const {resultIds, next: nextCursor, prev: prevCursor } = await searchDogs({
            breeds: selectedBreeds,
            sort,
            size: pageSize,
            from: cursor
        });
    
        dogs = await getDogsByIds(resultIds);
        next = nextCursor ?? '';
        prev = prevCursor ?? '';
    }
    
    function handleSubmit({breeds, sort: sortOption}) {
        selectedBreeds = breeds;
        sort = sortOption;
        cursor = '';
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
        loggedIn.subscribe((value) =>  {
            if (!value) {
                console.log('user not logged in');
                goto('/')
            }
        })

        breeds = await getBreeds();
        runSearch();

})


</script>

<div class="flex flex-col items-center">
    <SearchForm
        {breeds}
        bind:selectedBreeds
        bind:sort
        on:submitForm={(e) => {
            cursor ='';
            runSearch();
        }}
    />
    
  
        <div class="flex flex-wrap justify-center gap-6 px-4">
            {#each dogs as dog}
                <DogCard {dog} />
            {/each}
        </div>
   
    
    <div class="pagination">
        {#if prev}
        <button on:click={goToPrev}>Previous</button>
        {/if}
        {#if next}
        <button on:click={goToNext}>Next</button>
        {/if}
    </div>


</div>
