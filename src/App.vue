<template>
	<main class="flex justify-center pt-20 pb-6 min-h-screen">
		<ThemeSwitch
			class="absolute top-7 right-6"
			@onThemeChange="handleThemeChange"
		></ThemeSwitch>
		<AddNoteModal @onAddNote="handleAddNote"></AddNoteModal>
		<EditNoteModal
			:editNote="editNote"
			:showEditModal="showEditModal"
			@onEditNote="handleEditNote"
		></EditNoteModal>
		<DeleteNoteModal
			:message="deleteMessage"
			:showDeleteModal="showDeleteModal"
			@onDelete="handleDeleteNote"
		></DeleteNoteModal>
		<NotesGrid
			@onEdit="handleEditAction"
			@onRemove="handleRemoveAction"
		></NotesGrid>
		<NotificationToast
			type="success"
			v-if="showNotification"
			message="Note added Successfully"
		></NotificationToast>
	</main>
</template>

<script setup lang="ts">
/**
 * vue
 */
import { ref } from "vue";

/**
 * Components
 */
import AddNoteModal from "@/components/Modals/AddNoteModal.vue";
import EditNoteModal from "@/components/Modals/EditNoteModal.vue";
import DeleteNoteModal from "@/components/Modals/DeleteNoteModal.vue";
import ThemeSwitch from "@/components/ThemeSwitch.vue";
import NotesGrid from "@/components/Notes/NotesGrid.vue";
import NotificationToast from "@/components/NotificationToast.vue";

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
	showToast();
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

const showNotification = ref<boolean>(false);
function showToast() {
	showNotification.value = true;
	setTimeout(() => {
		showNotification.value = false;
	}, 3000);
}

const showEditModal = ref<boolean>(false);
const editNote = ref<INote>();
function handleEditAction(note: INote) {
	editNote.value = note;
	showEditModal.value = true;
}

const showDeleteModal = ref<boolean>(false);
const deleteMessage = ref<string>("");
const noteToBeDeleted = ref<INote>();
function handleRemoveAction(note: INote) {
	showDeleteModal.value = true;
	noteToBeDeleted.value = note;
	deleteMessage.value = `Are you sure, you want to delete ${note.title} ?`;
}
function handleDeleteNote() {
	if (noteToBeDeleted.value) {
		const index: number = noteStore.notes.indexOf(noteToBeDeleted.value);
		noteStore.removeNote(index);
		showDeleteModal.value = false;
		deleteMessage.value = "";
	}
}
</script>
