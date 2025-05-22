<script lang="ts">
    import { loggedIn } from '../../stores/auth.js'
    import { goto } from '$app/navigation'
    import { onMount } from 'svelte'

    onMount(() => {
        loggedIn.subscribe((value) =>  {
            if (!value) {
                console.log('user not logged in');
                goto('/')
            }
        })
    })
    //Verify if the user is logged in
</script>

<h1> This is the doggy search page! </h1>