import { createRouter, createWebHashHistory } from "vue-router";

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

// router.beforeEach((to, from) => {
// 	to.name = "Notes" ? router.push({path: '/login'})
// })

export default router;
