import { supabase } from "@/supabase/index";
import { AuthError } from "@supabase/supabase-js";

import { ref } from "vue";

import type { Auth, Params } from "@/types/Auth";

export default function useAuth(auth: Auth) {
	const loading = ref(false);
	const errorMessage = ref("");
	const successMessage = ref("");

	function authAction(params?: Params) {
		loading.value = true;
		try {
			const { error, data } = await supabase.auth.signUp(params);
			if (error) throw error;
			successMessage.value = "Registration successful!";
			errorMessage.value = "";
			return data;
		} catch (error) {
			errorMessage.value =
				error instanceof AuthError
					? error.message
					: "Oops! something went wrong";
		} finally {
			loading.value = false;
		}
	}

	async function signUp(params: {
		email: string;
		phone: string;
		password: string;
	}) {
		loading.value = true;
		try {
			const { error, data } = await supabase.auth.signUp(params);
			if (error) throw error;
			successMessage.value = "Registration successful!";
			errorMessage.value = "";
			return data;
		} catch (error) {
			errorMessage.value =
				error instanceof AuthError
					? error.message
					: "Oops! something went wrong";
		} finally {
			loading.value = false;
		}
	}

	async function login(params: { email: string; password: string }) {
		loading.value = true;
		try {
			const { error, data } = await supabase.auth.signInWithPassword(params);
			console.log(data);
			if (error) throw error;
		} catch (error) {
			errorMessage.value =
				error instanceof AuthError
					? error.message
					: "Oops! something went wrong";
		} finally {
			loading.value = false;
		}
	}

	async function signOut() {
		loading.value = true;
		try {
			const { error } = await supabase.auth.signOut();
			if (error) throw error;
		} catch (error) {
			errorMessage.value =
				error instanceof AuthError
					? error.message
					: "Oops! something went wrong";
		} finally {
			loading.value = false;
		}
	}

	return {
		login,
		signUp,
		signOut,
		loading,
		errorMessage,
	};
}
