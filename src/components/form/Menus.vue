<template>
	<ul
		:class="[
			noteStore.getCurrentTheme === 'emerald' ? 'bg-slate-100' : 'bg-slate-800',
		]"
		class="px-3 py-1 border-2 rounded-xl cursor-pointer"
	>
		<li>
			<a
				data-tip="Edit"
				class="tooltip tooltip-right rounded-xl"
				@click="emit('onEdit')"
			>
				<EditIcon />
			</a>
		</li>
		<li>
			<a
				data-tip="Delete"
				class="tooltip tooltip-right rounded-xl"
				@click="emit('onDelete')"
			>
				<DeleteIcon />
			</a>
		</li>
	</ul>
</template>

<script setup lang="ts">
import EditIcon from "@/components/icons/Edit.vue";
import DeleteIcon from "@/components/icons/Delete.vue";

import { useNoteStore } from "@/store/NoteStore";
const noteStore = useNoteStore();

const emit = defineEmits<{ (e: "onEdit"): void; (e: "onDelete"): void }>();
</script>
