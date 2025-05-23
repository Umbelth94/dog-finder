<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let breeds:string[] = [];
    export let selectedBreeds: string[] = [];
    export let sort: string = 'breed:asc';

    let localSelectedBreeds = [...selectedBreeds];
    let localSort = sort;

    const dispatch = createEventDispatcher();

    function submit() {
        dispatch('submitForm', {
            breeds: localSelectedBreeds,
            sort: localSort
        });
    }
</script>

<form on:submit|preventDefault={submit}>
    <label>
        Breeds:
        <select multiple bind:value={localSelectedBreeds}>
            {#each breeds as breed}
            <option value={breed}>{breed}</option>
            {/each}
        </select>
    </label>

    <label>
        Sort:
        <select bind:value={localSort}>
            <option value="breed:asc">Breed (A-Z)</option>
            <option value="breed:desc">Breed (Z-A)</option>
            <option value="age:asc">Age (Youngest)</option>
            <option value="age:desc">Age (Oldest)</option>
        </select>
    </label>

    <button type="submit">Search</button>
</form>