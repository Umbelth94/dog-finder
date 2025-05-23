<script lang="ts">
    import SearchForm from '$lib/components/SearchForm.svelte';
    import DogCard from '$lib/components/DogCard.svelte';
    import { getDogsByIds, searchDogs } from '$lib/api/dogs.ts'
    import { Dog } from '$lib/types.ts'
    import { loggedIn } from '../../stores/auth.js'
    import { goto } from '$app/navigation'
    import { onMount } from 'svelte'
    //Verify if the user is logged in
    
    
    onMount(() => {
        loggedIn.subscribe((value) =>  {
            if (!value) {
                console.log('user not logged in');
                goto('/')
            }
        })


    })


</script>

<h1> This is the doggy search page! </h1>
<SearchForm>

</SearchForm>
