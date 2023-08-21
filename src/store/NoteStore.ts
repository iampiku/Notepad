import { reactive, computed } from "vue";
import { defineStore } from "pinia";

import INote from "@/interface/INote";

export const useNoteStore = defineStore("note", () => {
	const notes: INote[] = reactive<INote[]>([]);

	function createNewNote(note: INote): void {
		notes.push(note);
	}

	function updateNote(note: INote): number {
		const index = notes.findIndex(({ id }) => id === note.id);
		notes[index] = note;
		return note.id;
	}

	function filterNotes(type: "Todo" | "Completed" | "Inprogress"): INote[] {
		return notes.filter(({ status }) => type === status);
	}

	function removeNote(index: number): INote[] {
		return notes.splice(index, 1);
	}

	const noteCount = computed(() => {
		return notes.length;
	});

	return {
		notes,
		noteCount,
		removeNote,
		updateNote,
		filterNotes,
		createNewNote,
	};
});
