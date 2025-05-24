<script lang="ts">
    import { onMount } from "svelte";
    import { getDogsByIds } from "$lib/api/dogs.ts";
    import { favoriteIds } from "../../stores/favorites.ts";
    import DogCard from "$lib/components/DogCard.svelte";
	import type { Dog } from "$lib/types.ts";

    let dogs: Dog[] = [];

    onMount(() => {
        const unsubscribe = favoriteIds.subscribe(async (ids) => {
            if (ids.length === 0) {
                dogs = [];
                return;
            }
            try {
                dogs = await getDogsByIds(ids);

            } catch (e){
                console.error('Failed to fetch favorite dogs:', e);
            }
        })
        return () => unsubscribe();
    })
</script>

<div class="flex flex-col items-center mt-6 px-4">
	<h1 class="text-2xl font-bold mb-4">Your Favorite Dogs</h1>

	{#if dogs.length}
		<div class="flex flex-wrap justify-center gap-6">
			{#each dogs as dog}
				<DogCard {dog} />
			{/each}
		</div>
	{:else}
		<p class="text-gray-600 mt-4">No favorites yet. Go find your match!</p>
	{/if}
</div>
