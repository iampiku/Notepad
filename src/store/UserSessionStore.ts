import { Session } from "@supabase/supabase-js";
import { defineStore } from "pinia";

import { ref, computed } from "vue";

export const userSessionStore = defineStore("userSession", () => {
	const userSession = ref<Session | null>(null);

	function setUserSession(session: Session) {
		userSession.value = session;
	}

	const getUserSession = computed(() => userSession.value);

	return {
		setUserSession,
		getUserSession,
	};
});
