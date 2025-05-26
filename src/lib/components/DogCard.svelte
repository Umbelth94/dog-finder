<script lang="ts">
  import {favoriteIds, toggleFavorite} from '../../stores/favorites.ts'

  export let large = false;

  export let dog: {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
  };

$: isFavorite = $favoriteIds.includes(dog.id);
</script>

<div class={`bg-gradient-to-b from-rose-100 to-pink-200 border border-gray-300 rounded-xl p-[1rem] shadow-lg transition ease hover:scale-[1.02]
    ${large ? 'w-full max-w-md mx-auto text-lg' : 'w-64 mx-3 my-3'}`}>
  <div class="relative">
    <button 
        on:click={() => toggleFavorite(dog.id)}
        class="text-2xl absolute top-55 right-1 text-yellow-400 hover:scale-110 transition-transform duration-150"
        aria-label="Toggle favorite"
    >
        {#if isFavorite}
            ★ <!-- filled star -->
        {:else}
            ☆ <!-- empty star -->
        {/if}
    </button>
</div>
  <img class="w-[100%] h-[200px] rounded-[1rem] " src={dog.img} alt={`Photo of ${dog.name}`} />
  <div class="mt-[1rem]">
    <h2 class="m-0 text-[1.25rem]">{dog.name}</h2>
    <p class="mx-0 my-[0.25rem]"><strong>Breed:</strong> {dog.breed}</p>
    <p class="mx-0 my-[0.25rem]"><strong>Age:</strong> {dog.age}</p>
    <p class="mx-0 my-[0.25rem]"><strong>Zip Code:</strong> {dog.zip_code}</p>
  </div>
  
</div>