<script lang="ts">
    import {onMount} from 'svelte';
    import { getBreeds } from '../api/dogs.ts'
	import { SvelteURLSearchParams } from 'svelte/reactivity';

    let breeds: string[] = [];

    //This will be used for customizable search parameters but for now is just set to default
    let searchParams = {
        selectedBreeds: [] as string[],
        sort: 'breed:asc',
        pageSize:20,
        cursor:'',//used for pagination?
    }
    
    onMount(async () => {
        breeds = await getBreeds();
        console.log(breeds);

    })
</script>

<div class="w-[80%] border-2 border-solid ">
    <form on:submit|preventDefault={() => {console.log('Doggo search')}}>
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
    </form>
</div>