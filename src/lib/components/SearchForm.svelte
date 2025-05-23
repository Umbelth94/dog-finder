<script lang="ts">
    import {onMount} from 'svelte';
    import { getBreeds, getDogsByIds, searchDogs } from '../api/dogs.ts'
	import type { Dog } from '$lib/types.ts';


    let breeds: string[] = [];

    //This will be used for customizable search parameters but for now is just set to default
    let searchParams = {
        selectedBreeds: [] as string[],
        sort: 'breed:asc',
        pageSize:20,
        cursor:'',//used for pagination?
    }

    async function runSearch() {
        const {resultIds: ids, next: nextCursor, prev: prevCursor} = await searchDogs({
            breeds: searchParams.selectedBreeds,
            sort: searchParams.sort,
            size:searchParams.pageSize,
            from:searchParams.cursor,
        });

        resultIds= ids;
        next = nextCursor || '';
        prev = prevCursor || '';
        dogs = await getDogsByIds(ids)
        console.log(dogs);


    }

    let resultIds: string[] = [];
    let dogs: Dog[] = [];
    let next = '';
    let prev = '';
    
    //Run this when the component loads the first time
    onMount(async () => {
        breeds = await getBreeds();
        runSearch();
    })
</script>

<div class="w-[80%] border-2 border-solid ">
    <form on:submit|preventDefault={() => {runSearch()}}>
        <label>Breeds 
            {#if breeds.length}
            <select multiple bind:value={searchParams.selectedBreeds} class="w-200px"> 
                {#each breeds as breed}
                <option value={breed}>{breed}</option>
                {/each}
            </select>
            {:else}
            <p>Loading breeds...</p>
            {/if}
        </label>

        <label>sort
            <select bind:value={searchParams.sort}>
                <option value="breed:asc">Breed (A-Z)</option>
                <option value="breed:desc">Breed (Z-A)</option>
                <option value="age:asc">Age (Youngest)</option>
                <option value="age:desc">Age (Oldest)</option>
            </select>
        </label>
        <button type="submit">SUBMIT</button>
    </form>
</div>