<template>
	<div class="flex justify-center items-center h-screen">
		<form
			class="card w-96 rounded-md card-compact card-bordered shadow-2xl bg-slate-200"
		>
			<div class="card-body p-3 text-center">
				<div class="card-title">Register New Account</div>
				<div class="divider my-0"></div>
				<label for="email" class="label py-0">
					<span class="label-text">Email</span>
				</label>
				<input
					required
					id="email"
					type="text"
					name="email"
					v-model="userLogin.email"
					autocomplete="off"
					class="input input-sm input-bordered"
				/>
				<label for="phone" class="label py-0">
					<span class="label-text">Phone</span>
				</label>
				<input
					required
					id="phone"
					type="text"
					name="phone"
					v-model="userLogin.phone"
					class="input input-sm input-bordered"
					placeholder=""
				/>
				<label for="email" class="label py-0">
					<span class="label-text">Password</span>
				</label>
				<input
					id="email"
					type="password"
					name="email"
					v-model="userLogin.password"
					class="input input-sm input-bordered"
					placeholder="Password"
				/>
				<div class="divider my-0"></div>
				<Button :loading="loading" :disabled="false" @click="onRegistration">
					Register
				</Button>
				<router-link to="/login" class="text-center">
					Already have an account?
					<span class="link link-info">Login</span>
				</router-link>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

import Button from "@/components/Button.vue";

import useAuth from "@/composables/useAuth";
const { loading, errorMessage, signUp } = useAuth();

const userLogin = reactive<{ email: string; password: string; phone: string }>({
	email: "",
	phone: "",
	password: "",
});

async function onRegistration() {
	try {
		const response = await signUp(userLogin);
	} catch {
		console.log(errorMessage);
	}
}
</script>
