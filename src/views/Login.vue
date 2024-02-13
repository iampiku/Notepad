<template>
	<div class="flex justify-center items-center h-screen">
		<form
			class="card w-96 rounded-md card-compact card-bordered shadow-lg bg-slate-200"
		>
			<div class="card-body p-3">
				<div class="card-title">
					<h2 class="text-2xl font-bold">LOGIN</h2>
				</div>
				<label for="email" class="label py-0">
					<span class="label-text font-medium">Email</span>
				</label>
				<input
					id="email"
					type="text"
					name="email"
					v-model="userLogin.email"
					class="input input-bordered input-sm w-full"
				/>
				<label for="email" class="label py-0">
					<span class="label-text font-medium">Password</span>
				</label>
				<input
					id="email"
					type="password"
					name="email"
					v-model="userLogin.password"
					class="input input-bordered input-sm w-full mb-2"
				/>
				<p class="card-side">
					New to Notepad?
					<router-link to="/signup">
						<span class="link link-info">Create a new account</span>
					</router-link>
				</p>
				<Button :loading="loading" :disabled="false" @click="handleLogin"
					>Login</Button
				>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import Button from "@/components/Button.vue";

import { userSessionStore } from "@/store/UserSessionStore";
const userSession = userSessionStore();

import useAuth from "@/composables/useAuth";
const { loading, errorMessage, login } = useAuth();

const userLogin = ref({
	email: "",
	password: "",
});

async function handleLogin() {
	try {
		const response = await login({ ...userLogin.value });
		// debugger;
		if (response) userSession.setUserSession(response.session);
	} catch {
		console.log(errorMessage);
	}
}
</script>
