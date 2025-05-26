<script lang="ts">
    import { onMount } from "svelte";
    import { getDogsByIds, matchDogByIds } from "$lib/api/dogs.ts";
    import { favoriteIds } from "../../stores/favorites.ts";
    import DogCard from "$lib/components/DogCard.svelte";
	import type { Dog } from "$lib/types.ts";
	import MatchModal from "$lib/components/MatchModal.svelte";

    let dogs: Dog[] = [];
    let matchedDog: Dog | null = null;
    let showModal = false;

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
            showModal = true;
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

<div class="flex flex-col items-center">
    <div class="m-auto flex flex-col items-center mb-8 text-center space-y-3">
        <h1 class="text-4xl font-bold text-purple-700">Favorites</h1>
        <h1 class="text-lg text-gray-800">Click the match button at the bottom of the page to get paired with one of your favorites</h1>
    </div>

	{#if dogs.length}
		<div class="flex flex-wrap justify-center gap-6">
			{#each dogs as dog}
				<DogCard {dog} />
			{/each}
		</div>

        <button on:click={() => handleMatch()} class="bg-purple-500 text-white px-8 py-4 my-4 text-lg rounded-full hover:bg-purple-600 transition shadow-lg">Make a Match!</button>
	{:else}
		<p class="text-gray-800 mt-4">No favorites yet. Go find your match!</p>
	{/if}

    {#if showModal && matchedDog}
        <MatchModal dog={matchedDog} onClose={() => (showModal = false)}>
            <DogCard dog={matchedDog} large/>
        </MatchModal>

	{/if}
</div>
