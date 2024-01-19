<template>
	<main class="flex justify-center items-center min-h-screen">
		<div class="flex flex-col text-center" v-if="!noteStore.allNotes.length">
			<EmptyNotes class="pb-6 mb-4" />
			<p class="text-xl font-medium">No notes found 📝</p>
		</div>

		<template v-else>
			<NotesGrid
				@onAdd="handleAddNote"
				@onEdit="handleEditNote"
				@onDelete="handleDeleteNote"
			/>
			<AddNoteModal
				:status="status"
				v-model="showAddModal"
				@onAddNote="handleAddNote"
			/>
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
		</template>
		<ThemeSwitch
			class="absolute top-6 right-8"
			@onThemeChange="handleThemeSwitch"
		/>
	</main>
</template>

<script setup lang="ts">
/**
 * Vue
 */
import { ref } from "vue";

/**
 * Interface
 */
import INote from "@/interface/INote";

/**
 * Interface
 */
import { useNoteStore } from "@/store/NoteStore";
const noteStore = useNoteStore();

/**
 * Components
 */
import ThemeSwitch from "@/components/ThemeSwitch.vue";
import NotesGrid from "@/components/Notes/NotesGrid.vue";
import EmptyNotes from "@/components/icons/EmptyNotes.vue";
import AddNoteModal from "@/components/Modals/AddNoteModal.vue";
import EditNoteModal from "@/components/Modals/EditNoteModal.vue";
import DeleteNoteModal from "@/components/Modals/DeleteNoteModal.vue";

const status = ref<string>("Todo");
const showAddModal = ref<boolean>(false);
function handleAddNote(eventValue: string | INote) {
	if (typeof eventValue === "string") {
		status.value = eventValue;
		showAddModal.value = true;
	} else {
		// noteStore.createNewNote(eventValue);
		showAddModal.value = false;
	}
}

const editNote = ref<INote>();
const showEditModal = ref<boolean>(false);
function handleEditNote(note: INote, isEdit = false) {
	if (isEdit) {
		showEditModal.value = false;
		// noteStore.updateNote(note);
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
	noteStore.updateAppTheme(isDark ? "night" : "emerald");
}
</script>
