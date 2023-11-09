import { supabase } from "@/supabase/index";

import { ref } from "vue";

export default function useAuth() {
	const loading = ref<boolean>(false);
	const error = ref<string>("Oops! something went wrong");

	async function signUp(params: {
		email: string;
		phone: string;
		password: string;
	}) {
		loading.value = true;
		try {
			const { error } = await supabase.auth.signUp({
				...params,
			});
			if (error) throw new Error(error.message);
		} catch (error) {
			console.error(error);
		} finally {
			loading.value = false;
		}
	}

	async function login(params: { email: string; password: string }) {
		loading.value = true;
		try {
			const { error } = await supabase.auth.signInWithPassword({
				...params,
			});
			if (error) throw new Error(error.message);
		} catch (error) {
			console.error(error);
		} finally {
			loading.value = false;
		}
	}

	async function signOut() {
		loading.value = true;
		try {
			const { error } = await supabase.auth.signOut();
			if (error) throw new Error(error.message);
		} catch (error) {
			console.error(error);
		} finally {
			loading.value = false;
		}
	}

	return {
		error,
		login,
		signUp,
		signOut,
		loading,
	};
}
