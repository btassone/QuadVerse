<template>
    <button id="logout" class="btn btn-danger btn-logout fas fa-sign-out-alt" @click="logout">Logout</button>
</template>
<script>
	export default {
		methods: {
			logout() {
				this.$authentication.logOut();
            }
        },
		created() {

		},
		mounted() {
			console.log('Logout mounted.')
		}
	}
</script>
