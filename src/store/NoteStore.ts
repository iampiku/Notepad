import { reactive, computed } from "vue";
import { defineStore } from "pinia";

import INote from "@/interface/INote";

export const useNoteStore = defineStore("note", () => {
	/**
	 * State
	 */
	const notes: INote[] = reactive<INote[]>([]);
	const selectedNote: INote = reactive<INote>({
		note: "",
		title: "",
		createdAt: "",
		status: "Todo",
	});

	function sanitizeNotes(note: INote): boolean {
		return Object.keys(note).every((key: string) => {
			return note[key].trim().length;
		});
	}

	function createNewNote(note: INote): void {
		if (sanitizeNotes(note)) notes.push(note);
		else throw new Error("All the properties of notes must be populated.");
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
		selectedNote,
		filterNotes,
		removeNote,
		sanitizeNotes,
		createNewNote,
	};
});
