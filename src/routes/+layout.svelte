<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';

	import NavBar from '../lib/components/NavBar.svelte'
	import { loggedIn } from '../stores/auth.ts';
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


	function verifyLogin() {
		throw new Error('Function not implemented.');
	}
</script>

<NavBar/>

{@render children()}
