<style>
    #login-component {
        width: 100%;
        height: 100%;
    }
</style>
<template>
    <div id="login-component" class="login-component">
        <form @submit.prevent="login">
            <div class="form-wrap">
                <div class="form-group">
                    <input v-model="form.email" type="email" name="email" id="email" placeholder="Email Address"
                           class="form-control" :class="{ 'is-invalid': form.errors.has('email') }" />
                    <has-error :form="form" field="email"></has-error>
                </div>
                <div class="form-group">
                    <input v-model="form.password" type="password" name="password" id="password" placeholder="Password"
                           class="form-control" :class="{ 'is-invalid': form.errors.has('password') }" />
                    <has-error :form="form" field="password"></has-error>
                </div>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-success btn-login w-100">Login</button>
            </div>
        </form>
    </div>
</template>
<script>
	import Form from "vform";
	import { HasError } from "vform";
	import { AlertError } from "vform";

	export default {
		data() {
			return {
				form: new Form({
                    email: '',
                    password: ''
                })
            }
        },
        components: {
		    HasError,
            AlertError
        },
        methods: {
		    login() {
                quadVerseSite.authentication.logIn(this.form);
            }
        },
		created() {
			console.log('Login component created.')
		}
	}
</script>
