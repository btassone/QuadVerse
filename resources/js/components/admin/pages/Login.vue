<template>
    <div class="app flex-row align-items-center">
        <div class="container">
            <b-row class="justify-content-center">
                <b-col md="8">
                    <b-card-group>
                        <b-card no-body class="p-4">
                            <b-card-body>
                                <form @submit.prevent="login">
                                    <h1>Login</h1>
                                    <p class="text-muted">Sign In to your account</p>
                                    <b-input-group class="mb-3">
                                        <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                                        <input v-model="form.email" type="email" name="email" id="email" placeholder="Email Address"
                                               class="form-control" :class="{ 'is-invalid': form.errors.has('email') }" />
                                        <has-error :form="form" field="email"></has-error>
                                    </b-input-group>
                                    <b-input-group class="mb-4">
                                        <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                                        <input v-model="form.password" type="password" name="password" id="password" placeholder="Password"
                                               class="form-control" :class="{ 'is-invalid': form.errors.has('password') }" />
                                        <has-error :form="form" field="password"></has-error>
                                    </b-input-group>
                                    <b-row>
                                        <b-col cols="6">
                                            <b-button type="submit" variant="primary" class="px-4">Login</b-button>
                                        </b-col>
                                        <b-col cols="6" class="text-right">
                                            <b-button variant="link" class="px-0">Forgot password?</b-button>
                                        </b-col>
                                    </b-row>
                                </form>
                            </b-card-body>
                        </b-card>
                        <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
                            <b-card-body class="text-center">
                                <div>
                                    <h2>Sign up</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                                </div>
                            </b-card-body>
                        </b-card>
                    </b-card-group>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
	import Form from "vform";
	import { HasError } from "vform";
	import { AlertError } from "vform";

	export default {
		name: 'Login',
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
				this.$authentication.logIn(this.form);
			}
		}
	}
</script>