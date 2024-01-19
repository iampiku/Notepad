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
					autocomplete="off"
					class="input input-md input-bordered"
					placeholder="user@email.com"
				/>
				<label for="phone" class="label py-0">
					<span class="label-text font-medium text-lg">Phone</span>
				</label>
				<input
					id="phone"
					type="text"
					name="phone"
					v-model="userLogin.phone"
					class="input input-md input-bordered"
					placeholder=""
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
					placeholder="Password"
				/>
				<Button :loading="loading" :disabled="false"> Register </Button>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

import Button from "@/components/Button.vue";

import useAuth from "@/composables/useAuth";
const { loading, error, signUp } = useAuth();

const userLogin = reactive<{ email: string; password: string; phone: string }>({
	email: "",
	phone: "",
	password: "",
});

// function handleLogin() {
// 	try {
// 		const response = signUp(userLogin);
// 	} catch {}
// }
</script>
