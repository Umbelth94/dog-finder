<script lang="ts">
    export let onClose: () => void;
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
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