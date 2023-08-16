<template>
	<main class="flex justify-center pt-20">
		<ThemeSwitch
			class="absolute top-7 right-6"
			@onThemeChange="handleThemeChange"
		></ThemeSwitch>
		<AddNoteModal @onAddNote="handleAddNote"></AddNoteModal>
		<EditNoteModal @onEditNote="handleEditNote"></EditNoteModal>
		<NotesGrid></NotesGrid>
	</main>
</template>

<script setup lang="ts">
/**
 * Components
 */
import AddNoteModal from "@/components/Modals/AddNoteModal.vue";
import ThemeSwitch from "@/components/ThemeSwitch.vue";
import NotesGrid from "@/components/Notes/NotesGrid.vue";

/**
 * Interface
 */
import INote from "@/interface/INote";

/**
 * Store
 */
import { useNoteStore } from "@/store/NoteStore";
const noteStore = useNoteStore();

function handleAddNote(note: INote) {
	noteStore.createNewNote(note);
}

function handleEditNote(note: INote) {
	console.log(note);
}

function handleThemeChange(isDark: boolean) {
	document.documentElement.setAttribute(
		"data-theme",
		isDark ? "night" : "fantasy"
	);
}
</script>
