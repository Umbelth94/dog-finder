<script lang="ts">
	import { goto } from '$app/navigation';

	function handleLoginClick() {
		goto('/login');
	}

</script>

<section class="min-h-screen flex flex-col items-center justify-center text-center p-8">
	<h1 class="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 drop-shadow">
		Find Your Forever Friend 🐶
	</h1>
	<p class="text-lg md:text-xl text-gray-800 max-w-2xl mb-8">
		Fetch is your personalized dog-matching service. Swipe through adoptable pups, match with your favorites, and make your home a little more lovable.
	</p>

	<button
		class="bg-purple-500 text-white px-8 py-4 text-lg rounded-full hover:bg-purple-600 transition shadow-lg"
		on:click={handleLoginClick}
	>
		Sign up now!
	</button>
</section>