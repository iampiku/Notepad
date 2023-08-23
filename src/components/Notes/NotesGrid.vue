<template>
	<div
		id="todo-container"
		class="grid gap-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-slate-50 p-6 my-20 rounded-lg"
	>
		<div
			:key="index"
			v-for="(note, index) in notes"
			:class="`card card-bordered  ${note.bgColor}`"
		>
			<div class="card-title flex justify-between px-7 pt-6">
				<span class="font-semibold text-base"
					>{{ note.title }}
					<span class="badge badge-sm rounded-xl badge-accent">
						{{ note.notes.length }}</span
					></span
				>
				<div class="tooltip" data-tip="Add Note">
					<button
						type="button"
						class="btn btn-circle btn-xs btn-ghost"
						@click="emit('onAdd')"
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
						@on-edit="handleEdit"
						@on-delete="handleDelete"
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
import NoteCard from "@/components/Notes/NoteCard.vue";

/**
 * Store
 */
import { useNoteStore } from "@/store/NoteStore";
const noteStore = useNoteStore();

const emit = defineEmits<{
	(e: "onAdd"): void;
	(e: "onEdit", note: INote): void;
	(e: "onDelete", note: INote): void;
}>();

const notes = computed(() => {
	return [
		{
			title: "Todo",
			bgColor: "bg-gray-100",
			notes: noteStore.todoNotes,
		},
		{
			title: "In Progress",
			bgColor: "bg-blue-100",
			notes: noteStore.inProgressNotes,
		},
		{
			title: "Pending",
			bgColor: "bg-purple-100",
			notes: noteStore.pendingNotes,
		},
		{
			title: "Completed",
			bgColor: "bg-green-100",
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
		const note = noteStore.notes.find((note) => note.id === parseInt(noteId));
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

function handleEdit(note: INote) {
	console.log(note);
}

function handleDelete(note: INote) {
	noteStore.removeNote(note.id);
}
</script>
