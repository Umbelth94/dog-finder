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
            goto('/search');
            console.log('User logged in');  
        } else {
            alert('Login failed.  Check your name/email and try again.');
        }
    }
</script>

<form
  on:submit|preventDefault={handleLogin}
  class="max-w-sm mx-auto mt-24 bg-white p-8 rounded-lg shadow-md flex flex-col gap-4"
>
  <h2 class="text-2xl font-bold text-center text-gray-800 mb-4">Login</h2>

  <input
    type="text"
    placeholder="Name"
    bind:value={name}
    required
    class="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <input
    type="email"
    placeholder="Email"
    bind:value={email}
    required
    class="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <button
    type="submit"
    class="bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
  >
    Login
  </button>
</form>