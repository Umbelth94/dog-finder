<script lang='ts'>
    import { loggedIn } from '../../stores/auth.ts'
    import { goto } from '$app/navigation'

    function logout() {
        fetch ('https://frontend-take-home-service.fetch.com/auth/logout', {
            method:'POST',
            credentials: 'include',
        }).then(() => {
            loggedIn.set(false);
            goto('/');
        })
    }
</script>

<nav class='flex justify-end items-center p-1 bg-[#f3f3f3] gap-10'>
    {#if $loggedIn}
    <button on:click={logout}>Logout</button>
    <a href="/search">Doggy Search</a>
    <a href="/favorites">Favorites</a>
    
    {:else}
    <a href="/login">Login</a>
    {/if}
</nav>

