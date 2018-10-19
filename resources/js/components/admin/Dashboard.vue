<template>
    <div>
        <div>Dashboard Template</div>
        <logout></logout>
    </div>
</template>
<script>
	import axios from "axios";
	import Logout from "../global/Logout";

	export default {
		components: {
            Logout
        },
		created() {

		},
		mounted() {
			console.log('Dashboard mounted.')
		}
	}
</script>
