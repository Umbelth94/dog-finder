<script lang="ts">
	import { loggedIn } from "../../stores/auth.js";
    import { goto } from "$app/navigation";

    
    let name = '';
    let email = '';

    async function handleLogin() {
        const res = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ name, email })
        });

        if (res.ok) {
            loggedIn.set(true)
            goto('/');
            console.log('User logged in');  
        } else {
            alert('Login failed.  Check your name/email and try again.');
        }
    }
</script>

<form on:submit|preventDefault={handleLogin}>
  <input type="text" placeholder="Name" bind:value={name} required />
  <input type="email" placeholder="Email" bind:value={email} required />
  <button type="submit">Login</button>
</form>