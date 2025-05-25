<script lang="ts">
	import '../app.css';

	import NavBar from '../lib/components/NavBar.svelte'
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

<NavBar/>

{@render children()}
