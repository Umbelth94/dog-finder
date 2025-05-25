<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';

	import NavBar from '../lib/components/NavBar.svelte'
	import { loggedIn, verifyLogin } from '../stores/auth.ts';
	import { goto } from '$app/navigation';
	let { children } = $props();

	onMount(async () => {
		const isValid = await verifyLogin();
		loggedIn.set(isValid);

		if(!isValid){
			localStorage.removeItem('loggedIn');
			goto('/');
		}
	})

</script>

<main class='min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100'>
	<NavBar/>
	{@render children()}

</main>

