import { reactive, computed, ref, onMounted } from "vue";
import { defineStore } from "pinia";

import INote from "@/interface/INote";

export const useNoteStore = defineStore("note", () => {
	const currentTheme = ref<"emerald" | "night">("emerald");
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

	onMounted(() => {
		currentTheme.value =
			(localStorage.getItem("theme") as "emerald" | "night") ?? "emerald";
		document.documentElement.setAttribute("data-theme", currentTheme.value);
	});

	function createNewNote(note: INote): void {
		notes.push(note);
	}

	function updateNote(note: INote): number {
		const index = notes.findIndex(({ id }) => id === note.id);
		notes[index] = note;
		return note.id;
	}

	function removeNote(noteId: number): INote[] {
		const noteIndex = notes.findIndex((note) => note.id === noteId);
		return notes.splice(noteIndex, 1);
	}

	function updateCurrentTheme(themeName: "emerald" | "night") {
		if (localStorage.length === 0)
			localStorage.setItem("theme", themeName || "emerald");
		else {
			localStorage.setItem("theme", themeName);
			currentTheme.value = themeName;
		}

		document.documentElement.setAttribute("data-theme", currentTheme.value);
	}

	const getCurrentTheme = computed(() => {
		return currentTheme.value;
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

	const allNotes = computed(() => {
		return notes;
	});

	return {
		allNotes,
		todoNotes,
		pendingNotes,
		completedNotes,
		inProgressNotes,
		removeNote,
		updateNote,
		createNewNote,
		getCurrentTheme,
		updateCurrentTheme,
	};
});
