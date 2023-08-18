<template>
	<div class="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-2/3">
		<template v-if="noteStore.noteCount !== 0">
			<NoteCard
				:key="index"
				:note="note"
				@onEdit="handleEdit"
				@onRemove="handleRemove"
				v-for="(note, index) in noteStore.notes"
			></NoteCard>
		</template>
		<template v-else>
			<EmptyNotes class="col-span-full"></EmptyNotes>
		</template>
	</div>
</template>

<script setup lang="ts">
/**
 * Component
 */
import NoteCard from "@/components/Notes/NoteCard.vue";
import EmptyNotes from "@/components/Notes/EmptyNotes.vue";

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
