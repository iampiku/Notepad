import { createRouter, createWebHashHistory } from "vue-router";

import { userSessionStore } from "@/store/UserSessionStore";

/**
 * Views
 */
import Notes from "@/views/Notes.vue";
import Login from "@/views/Login.vue";
import Signup from "@/views/Signup.vue";

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: "/",
			name: "Notes",
			component: Notes,
		},
		{
			path: "/login",
			name: "Login",
			component: Login,
		},
		{
			path: "/signup",
			name: "Signup",
			component: Signup,
		},
	],
});

router.beforeEach((to, _, next) => {
	const userSession = userSessionStore();
	if (to.path === "/" && !userSession?.getUserSession?.user)
		next({ name: "Login" });
	else next();
});

export default router;
