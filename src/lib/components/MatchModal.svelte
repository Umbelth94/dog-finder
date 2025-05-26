<script lang="ts">
    export let onClose: () => void;

    export let dog: {
        name:string,
    }

</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
    <h1 class="text-white text-5xl my-5">Congratulations!</h1>
    <p class="text-white text-2xl mb-5">You and {dog.name} are going to be great friends</p>
    <div class="bg-radial from-[#9A348E] to-[#E2AFDE] p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button
            on:click={onClose}
            class="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            aria-label="Close"
        >
            ✕
        </button>
        <slot />
    </div>
</div>