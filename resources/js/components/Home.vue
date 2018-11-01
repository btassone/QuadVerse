<style>
    #welcome {
        width: 100vw;
        height: 100vh;
    }

    #account-actions {
        background-color: #ffffff;
    }

    #form-view-container {
        background-color: #046380;
    }
</style>

<template>
    <div id="welcome" class="row m-0">
        <div id="account-actions" class="col-md d-flex align-items-center justify-content-center">
            <div class="d-flex flex-column w-25">
                <h1>Laravel SPA Base</h1>
                <div class="home-links">
                    <router-link to="/login" class="btn btn-primary w-100 mb-3">Login</router-link>
                    <router-link to="/register" class="btn btn-secondary w-100">Register</router-link>
                </div>
            </div>
        </div>
        <div id="form-view-container" class="col-md align-items-center justify-content-center d-none">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
	export default {
		mounted() {
			console.log('Home page mounted.')
		}
	}
</script>
