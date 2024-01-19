import { supabase } from "@/supabase/index";
import { AuthError } from "@supabase/supabase-js";

import { ref } from "vue";

export default function useAuth() {
	const loading = ref(false);
	const errorMessage = ref("");
	const successMessage = ref("");

	function setError(error: unknown): void {
		errorMessage.value =
			error instanceof AuthError
				? error.message
				: "Oops! something went wrong.";
	}

	function setLoading(value: boolean): void {
		loading.value = value;
	}

	async function signUp(params: {
		email: string;
		phone: string;
		password: string;
	}) {
		setLoading(true);
		try {
			const { error, data } = await supabase.auth.signUp(params);
			if (error) throw error;
			successMessage.value = "Registration successful!";
			errorMessage.value = "";
			return data;
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}

	async function login(params: { email: string; password: string }) {
		setLoading(true);
		try {
			const { error, data } = await supabase.auth.signInWithPassword(params);
			if (error) throw error;
			else return data;
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}

	async function signOut() {
		setLoading(true);
		try {
			const { error } = await supabase.auth.signOut();
			if (error) throw error;
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
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
