<template>
	<main>
		<AddNoteModal @add-note="handleAddNote"></AddNoteModal>
		<NotesGrid></NotesGrid>
	</main>
</template>

<script setup lang="ts">
/**
 * Components
 */
import AddNoteModal from "@/components/Modals/AddNoteModal.vue";
import NotesGrid from "@/components/Notes/NotesGrid.vue";

/**
 * Interface
 */
import INote from "@/interface/INote";

function handleAddNote(note: INote) {
	console.log(note);
}
</script>
