<template>
    <div id="admin" v-bind:class="{ 'is-login': isLogin }">
        <div class="router-view-wrap">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
	export default {
		data() {
		    return {
		    	isLogin: false,
            }
        },
        watch: {
		    $route (to, from) {
			    this.isLogin = to.name === "adminLogin";
            }
        },
		created() {
            this.isLogin = this.$route.name === "adminLogin";
        },
		mounted() {
			console.log('Admin mounted.')
		}
	}
</script>
