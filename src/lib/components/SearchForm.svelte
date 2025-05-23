<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let breeds:string[] = [];
    export let selectedBreeds: string[] = [];
    export let sort: string = 'breed:asc';

    let localSelectedBreeds = [...selectedBreeds];
    let localSort = sort;

    const dispatch = createEventDispatcher();

    $: {
        dispatch('submitForm', {
            breeds: selectedBreeds,
            sort
        });
    }
</script>

<div
class="bg-white shadow-md rounded-xl p-6 mb-8 w-full max-w-3xl flex flex-col md:flex-row items-start md:items-end gap-6  ">
    
<div class="flex-1 w-full">
    <label class="block text-sm font-medium text-gray-700 mb-1">
        Breeds:
        <select multiple bind:value={selectedBreeds}
        class="w-full h-[120px] rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            {#each breeds as breed}
            <option value={breed}>{breed}</option>
            {/each}
        </select>
    </label>
</div>

<div class="flex-1 w-full">
    <label class="block text-sm font-medium text-gray-700 mb-1">
        Sort:
        <select bind:value={sort}
        class="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="breed:asc">Breed (A-Z)</option>
            <option value="breed:desc">Breed (Z-A)</option>
            <option value="age:asc">Age (Youngest)</option>
            <option value="age:desc">Age (Oldest)</option>
        </select>
    </label>

</div>

</div>