<template>
	<div
		id="todo-container"
		:class="[
			noteStore.getCurrentTheme === 'night' ? 'bg-slate-700' : 'bg-slate-50',
		]"
		class="grid gap-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-slate-50 p-6 my-20 md:mx-10 rounded-lg"
	>
		<div
			:key="index"
			v-for="(note, index) in notesContainer"
			class="card"
			:class="{
				'bg-gray-100': note.title === 'Todo',
				'bg-blue-100': note.title === 'In Progress',
				'bg-purple-100': note.title === 'Pending',
				'bg-green-100': note.title === 'Completed',
				'bg-gray-900':
					note.title === 'Todo' && noteStore.getCurrentTheme === 'night',
				'bg-blue-950':
					note.title === 'In Progress' && noteStore.getCurrentTheme === 'night',
				'bg-purple-950':
					note.title === 'Pending' && noteStore.getCurrentTheme === 'night',
				'bg-green-950':
					note.title === 'Completed' && noteStore.getCurrentTheme === 'night',
			}"
		>
			<div class="card-title flex justify-between px-5 pt-6">
				<span class="font-semibold text-lg"
					>{{ note.title }}
					<span class="badge badge-sm rounded-xl badge-accent font-bold">
						{{ note.notes.length }}</span
					></span
				>
				<div class="tooltip" data-tip="Add Note">
					<button
						type="button"
						class="btn btn-circle btn-xs btn-ghost"
						@click="handleAdd(note.title)"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 4.5v15m7.5-7.5h-15"
							/>
						</svg>
					</button>
				</div>
			</div>
			<div
				class="card-body p-4"
				@dragover.prevent
				@dragenter.prevent
				@drop="onDrop($event, note.title)"
			>
				<div
					:key="filteredNote.id"
					v-for="filteredNote in note.notes"
					@dragstart="handleDrag($event, filteredNote)"
				>
					<NoteCard
						:note="filteredNote"
						@on-edit="emit('onEdit', filteredNote)"
						@on-delete="emit('onDelete', filteredNote)"
					></NoteCard>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
/**
 * Vue
 */
import { computed } from "vue";

/**
 * Interface
 */
import INote from "@/interface/INote";

/**
 * Component
 */
import NoteCard from "@/components/notes/NoteCard.vue";

/**
 * Store
 */
import { useNoteStore } from "@/store/NoteStore";
const noteStore = useNoteStore();

const emit = defineEmits<{
	(e: "onAdd", status: string): void;
	(e: "onEdit", note: INote): void;
	(e: "onDelete", note: INote): void;
}>();

const notesContainer = computed(() => {
	return [
		{
			title: "Todo",
			notes: noteStore.todoNotes,
		},
		{
			title: "In Progress",
			notes: noteStore.inProgressNotes,
		},
		{
			title: "Pending",
			notes: noteStore.pendingNotes,
		},
		{
			title: "Completed",
			notes: noteStore.completedNotes,
		},
	];
});

function handleDrag(event: DragEvent, note: INote) {
	if (event.dataTransfer) {
		event.dataTransfer.dropEffect = "move";
		event.dataTransfer.effectAllowed = "move";
		event.dataTransfer.setData("noteId", note.id.toString());
	}
}

function onDrop(event: DragEvent, updatedStatus: string) {
	if (event.dataTransfer) {
		const noteId = event.dataTransfer.getData("noteId");
		const note = noteStore.allNotes.find(
			(note) => note.id === parseInt(noteId)
		);
		if (note) {
			switch (updatedStatus) {
				case "Todo":
					note.status = "Todo";
					break;
				case "In Progress":
					note.status = "Inprogress";
					break;
				case "Pending":
					note.status = "Pending";
					break;
				case "Completed":
					note.status = "Completed";
					break;
			}
			noteStore.updateNote(note);
		}
	}
}

function handleAdd(title: string) {
	title = title === "In Progress" ? "Inprogress" : title;
	emit("onAdd", title);
}
</script>
