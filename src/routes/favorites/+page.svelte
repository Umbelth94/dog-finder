<script lang="ts">
    import { onMount } from "svelte";
    import { getDogsByIds, matchDogByIds } from "$lib/api/dogs.ts";
    import { favoriteIds } from "../../stores/favorites.ts";
    import DogCard from "$lib/components/DogCard.svelte";
	import type { Dog } from "$lib/types.ts";

    let dogs: Dog[] = [];
    let matchedDog: Dog | null = null;

    async function handleMatch() {
    const dogIds = dogs.map(dog => dog.id);
    const result = await matchDogByIds(dogIds);

    //Get the ID out of the returned result object
    const matchId = result[0]; 

    if (!matchId) {
        matchedDog = null;
        return;
    }

    try {
        const [match] = await getDogsByIds([matchId]); // Wrap in array
        matchedDog = match;
    } catch (error) {
        console.error("Failed to fetch matched dog details", error);
        matchedDog = null;
    }
}

    onMount(() => {
        const unsubscribe = favoriteIds.subscribe(async (ids) => {
            if (ids.length === 0) {
                dogs = [];
                return;
            }
            loadDogs(ids);
        })
        return () => unsubscribe();
    })

    async function loadDogs(ids: string[]) {
        try {
            dogs = await getDogsByIds(ids);
        } catch (e) {
            console.error('Failed to fetch favorite dogs:', e)
        }
    }
</script>

<div class="flex flex-col items-center mt-6 px-4">
	<h1 class="text-2xl font-bold mb-4">Your Favorite Dogs</h1>

	{#if dogs.length}
		<div class="flex flex-wrap justify-center gap-6">
			{#each dogs as dog}
				<DogCard {dog} />
			{/each}
		</div>

        <button on:click={() => handleMatch()}>Make a Match!</button>
	{:else}
		<p class="text-gray-600 mt-4">No favorites yet. Go find your match!</p>
	{/if}

    {#if matchedDog}
			<h2 class="text-xl font-semibold mt-8">Your Match!</h2>
			<DogCard dog={matchedDog} />
		
	{/if}
</div>
