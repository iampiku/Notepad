<template>
	<div
		class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-2/3"
	>
		<NoteCard
			:key="index"
			:note="note"
			@onEdit="handleEdit"
			@onRemove="handleRemove"
			v-for="(note, index) in noteStore.notes"
		></NoteCard>
	</div>
</template>

<script setup lang="ts">
/**
 * Component
 */
import NoteCard from "@/components/Notes/NoteCard.vue";

/**
 * Interface
 */
import INote from "@/interface/INote";

const emit = defineEmits<{
	(e: "onEdit", note: INote): void;
	(e: "onRemove", note: INote): void;
}>();

/**
 * Store
 */
import { useNoteStore } from "@/store/NoteStore";
const noteStore = useNoteStore();

function handleEdit(note: INote): void {
	emit("onEdit", note);
}

function handleRemove(note: INote): void {
	emit("onRemove", note);
}
</script>
