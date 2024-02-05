<template>
	<div class="flex justify-center items-center h-screen">
		<form class="card w-96 rounded-md border-primary bg-slat">
			<div class="card-body p-3">
				<label for="email" class="label py-0">
					<span class="label-text font-medium text-lg">Email</span>
				</label>
				<input
					id="email"
					type="text"
					name="email"
					v-model="userLogin.email"
					class="input input-md input-bordered"
					placeholder="user@email.com"
				/>
				<label for="email" class="label py-0">
					<span class="label-text font-medium text-lg">Password</span>
				</label>
				<input
					id="email"
					type="password"
					name="email"
					v-model="userLogin.password"
					class="input input-md input-bordered"
					placeholder="password"
				/>
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

import useAuth from "@/composables/useAuth";
const { loading, error, login } = useAuth();

const userLogin = ref({
	email: "",
	password: "",
});

async function handleLogin() {
	login({ ...userLogin.value });
	console.log(userLogin.value);
}
</script>
