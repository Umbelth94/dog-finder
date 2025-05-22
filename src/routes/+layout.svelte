<script lang="ts">
	import '../app.css';
	import { loggedIn } from '../stores/auth.js'
	import NavBar from '../lib/components/NavBar.svelte'
	let { children } = $props();

	async function handleLogout() {

	}

</script>

<NavBar/>

{@render children()}
