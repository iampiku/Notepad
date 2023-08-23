<template>
	<div
		draggable="true"
		class="card card-bordered bg-white p-4 text-sm cursor-move max-w-xs"
	>
		<div class="card-title font-bold pb-2 justify-between">
			<span>{{ props.note.title }}</span>
			<button
				type="button"
				class="btn btn-xs btn-ghost btn-circle"
				@click="showMenu = !showMenu"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
					/>
				</svg>
			</button>
			<Menu
				v-if="showMenu"
				class="absolute right-1 top-11"
				@on-edit="handleAction('edit')"
				@on-delete="handleAction('delete')"
			></Menu>
		</div>
		<p class="pb-4">{{ props.note.note }}</p>
		<div class="card-action">
			<div class="text-xs font-bold flex items-center gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
					/>
				</svg>
				<span>{{ props.note.createdAt }}</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import INote from "@/interface/INote";

import Menu from "@/components/Menus.vue";

interface Props {
	note: INote;
}
const props = defineProps<Props>();
const emit = defineEmits<{
	(e: "onEdit", note: INote): void;
	(e: "onDelete", note: INote): void;
}>();

const showMenu = ref<boolean>(false);

function handleAction(actionType: "edit" | "delete") {
	if (actionType === "edit") emit("onEdit", props.note);
	else emit("onDelete", props.note);
	showMenu.value = false;
}
</script>
