<template>
	<div
		draggable="true"
		:class="{
			'bg-slate-800': noteStore.getCurrentTheme === 'night',
		}"
		class="card card-compact bg-slate-100 p-4 text-sm cursor-move max-w-xs shadow-md"
	>
		<div class="card-title font-bold pb-2 justify-between">
			<span>{{ props.note.title }}</span>
			<button
				type="button"
				name="menu"
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
				@on-edit="
					emit('onEdit');
					showMenu = false;
				"
				@on-delete="
					emit('onDelete');
					showMenu = false;
				"
			></Menu>
		</div>
		<p class="pb-4">{{ props.note.note }}</p>
		<div class="card-action">
			<div class="text-xs font-bold flex items-center gap-2">
				<Calender />
				<span>{{ props.note.createdAt }}</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import INote from "@/interface/INote";

import Menu from "@/components/form/Menus.vue";
import Calender from "@/components/icons/Calender.vue";

import { useNoteStore } from "@/store/NoteStore";
const noteStore = useNoteStore();

interface Props {
	note: INote;
}
const props = defineProps<Props>();
const emit = defineEmits<{
	(e: "onEdit"): void;
	(e: "onDelete"): void;
}>();

const showMenu = ref<boolean>(false);
</script>
