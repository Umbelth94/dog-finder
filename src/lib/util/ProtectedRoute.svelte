<script>
    import { goto } from '$app/navigation';
	import { loggedIn, verifyLogin } from '../../stores/auth.ts';
    
    export async function requireLogin() {
        const isValid = await verifyLogin();
        loggedIn.set(isValid);
        if (!isValid) {
            localStorage.removeItem('loggedIn');
            goto('/');
        }
    }
</script>