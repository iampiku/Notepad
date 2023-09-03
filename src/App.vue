<template>
	<main class="flex justify-center min-h-screen">
		<NotesGrid
			@onAdd="handleAddNote"
			@onEdit="handleEditNote"
			@onDelete="handleDeleteNote"
		/>
		<AddNoteModal v-model="showAddModal" @on-add-note="handleAddNote" />
		<EditNoteModal
			:editNote="editNote"
			v-model="showEditModal"
			@onSave="handleEditNote($event, true)"
		/>
		<DeleteNoteModal
			:message="deleteMessage"
			v-model="showDeleteModal"
			@onDelete="handleDeleteNote"
		/>
		<ThemeSwitch
			class="absolute top-6 right-8"
			@onThemeChange="handleThemeSwitch"
		/>
	</main>
</template>

<script setup lang="ts">
import { ref } from "vue";

import INote from "@/interface/INote";
// import IStatus from "@/interface/IStatus";

import { useNoteStore } from "@/store/NoteStore";
const noteStore = useNoteStore();

import NotesGrid from "@/components/Notes/NotesGrid.vue";
import ThemeSwitch from "@/components/ThemeSwitch.vue";
import AddNoteModal from "@/components/Modals/AddNoteModal.vue";
import EditNoteModal from "@/components/Modals/EditNoteModal.vue";
import DeleteNoteModal from "@/components/Modals/DeleteNoteModal.vue";

const showAddModal = ref<boolean>(false);
// const selectedStatus = ref<IStatus>();
function handleAddNote(eventValue: string | INote) {
	if (typeof eventValue === "string") {
		// selectedStatus.value = { _selected: true, label: eventValue };
		showAddModal.value = true;
		console.log(eventValue);
	} else {
		noteStore.createNewNote(eventValue);
		showAddModal.value = false;
	}
}

const editNote = ref<INote>();
const showEditModal = ref<boolean>(false);
function handleEditNote(note: INote, isEdit = false) {
	if (isEdit) {
		showEditModal.value = false;
		noteStore.updateNote(note);
	} else {
		editNote.value = note;
		showEditModal.value = true;
	}
}

const deleteNote = ref<INote>();
const deleteMessage = ref<string>("");
const showDeleteModal = ref<boolean>(false);
function handleDeleteNote(note?: INote) {
	if (note) {
		deleteNote.value = note;
		deleteMessage.value = `Are you sure, you want to delete ${note.title} note?`;
		showDeleteModal.value = true;
	} else {
		if (deleteNote.value) noteStore.removeNote(deleteNote.value?.id);
		showDeleteModal.value = false;
	}
}

function handleThemeSwitch(isDark: boolean) {
	noteStore.updateCurrentTheme(isDark ? "night" : "emerald");
}
</script>
