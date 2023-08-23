import { reactive, computed } from "vue";
import { defineStore } from "pinia";

import INote from "@/interface/INote";

export const useNoteStore = defineStore("note", () => {
	const notes: INote[] = reactive<INote[]>([
		{
			id: 1,
			note: "Learn about Java and SpringBoot and use MySQL as Database",
			title: "Backend Development",
			createdAt: "2023-08-23T08:00:00Z",
			updatedAt: "2023-08-23T08:00:00Z",
			status: "Inprogress",
		},
		{
			id: 2,
			note: "Consectetur adipiscing elit.",
			title: "Note 2",
			createdAt: "2023-08-23T09:00:00Z",
			updatedAt: "2023-08-23T09:00:00Z",
			status: "Completed",
		},
		{
			id: 3,
			note: "Lorem ipsum dolor sit amet.",
			title: "Note 1",
			createdAt: "2023-08-23T08:00:00Z",
			updatedAt: "2023-08-23T08:00:00Z",
			status: "Todo",
		},
		{
			id: 4,
			note: "Consectetur adipiscing elit.",
			title: "Note 2",
			createdAt: "2023-08-23T09:00:00Z",
			updatedAt: "2023-08-23T09:00:00Z",
			status: "Pending",
		},
		{
			id: 5,
			note: "Lorem ipsum dolor sit amet.",
			title: "Note 1",
			createdAt: "2023-08-23T08:00:00Z",
			updatedAt: "2023-08-23T08:00:00Z",
			status: "Todo",
		},
		{
			id: 6,
			note: "Consectetur adipiscing elit.",
			title: "Note 2",
			createdAt: "2023-08-23T09:00:00Z",
			updatedAt: "2023-08-23T09:00:00Z",
			status: "Completed",
		},
	]);

	function createNewNote(note: INote): void {
		notes.push(note);
	}

	function updateNote(note: INote): number {
		const index = notes.findIndex(({ id }) => id === note.id);
		notes[index] = note;
		return note.id;
	}

	function removeNote(index: number): INote[] {
		return notes.splice(index, 1);
	}

	const noteCount = computed(() => {
		return notes.length;
	});

	const todoNotes = computed(() => {
		return notes.filter((note) => note.status === "Todo");
	});

	const inProgressNotes = computed(() => {
		return notes.filter((note) => note.status === "Inprogress");
	});

	const pendingNotes = computed(() => {
		return notes.filter((note) => note.status === "Pending");
	});

	const completedNotes = computed(() => {
		return notes.filter((note) => note.status === "Completed");
	});

	return {
		notes,
		noteCount,
		todoNotes,
		pendingNotes,
		completedNotes,
		inProgressNotes,
		removeNote,
		updateNote,
		createNewNote,
	};
});
