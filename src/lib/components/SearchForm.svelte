<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let breeds:string[] = [];
    export let selectedBreeds: string[] = [];
    export let sort: string = 'breed:asc';
    export let ageMin: number | null = null;
    export let ageMax: number | null = null;
    export let zipCode: string = '';

    const dispatch = createEventDispatcher();

    function updateSearch() {
        dispatch('submitForm', {
            breeds: selectedBreeds,
            sort,
            ageMin,
            ageMax,
            zipCode
        });
    }

    //Run on change
    $: selectedBreeds, updateSearch();
    $: sort, updateSearch();
    $: ageMin, updateSearch();
    $: ageMax, updateSearch();
    $: zipCode, updateSearch();
</script>

<form on:submit|preventDefault={updateSearch}
class="bg-white shadow-lg rounded-xl p-6 mb-8 w-full max-w-3xl flex flex-col md:flex-row md:items-center gap-6"
>
    
    <!-- <div class="flex-1 w-full flex items-center md:items-start">
    <label class="block w-full text-sm font-medium text-gray-700 mb-1">
        Breeds:
        <select multiple bind:value={selectedBreeds}
        class="w-full h-[280px] rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ">
            {#each breeds as breed}
            <option value={breed}>{breed}</option>
            {/each}
        </select>
    </label>
    </div> -->
    <div class="flex flex-col">
        <p class="text-sm font-medium text-gray-700 mb-1">Breeds:</p>
        
        <div class="flex flex-col gap-2 max-h-[275px] overflow-y-auto p-2 border rounded-sm">
        {#each breeds as breed}
            <label class="inline-flex items-center gap-2 text-sm text-gray-700">
            <input
                type="checkbox"
                value={breed}
                on:change={(e) => {
                    const target = e.target as HTMLInputElement;
                if (target.checked) {
                    selectedBreeds = [...selectedBreeds, breed];
                } else {
                    selectedBreeds = selectedBreeds.filter((b) => b !== breed);
                }
                }}
                checked={selectedBreeds.includes(breed)}
            />
            {breed}
            </label>
        {/each}
        </div>
</div>

    <div class="flex-1 w-full flex flex-col gap-4 justify-end">
       
        <div class="w-full">
            <label class="block text-sm font-medium text-gray-700 mb-1">Min Age:
                <input type="number" min="0" bind:value={ageMin}
                class="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />

            </label>
        </div>
        
    
        <div class="w-full">
            <label class="block text-sm font-medium text-gray-700 mb-1">Max Age:
                <input type="number" min="0" bind:value={ageMax}
                class="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />

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
        <div class="w-full">
		<label class="block text-sm font-medium text-gray-700 mb-1">
			ZIP Code:
			<input type="text" bind:value={zipCode} placeholder="e.g. 90210"
				class="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
		</label>
	</div>
    </div>

</form>