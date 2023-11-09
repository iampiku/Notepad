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
					placeholder="Password"
				/>
				<button type="button" class="btn btn-md" @click="handleLogin">
					LOGIN
				</button>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const userLogin = ref<{ email: string; password: string }>({
	email: "",
	password: "",
});

function handleLogin() {
	console.log(userLogin.value);
}
</script>
