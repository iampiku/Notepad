import { computed, ref, onMounted } from "vue";
import { defineStore } from "pinia";

import INote from "@/interface/INote";

import useNotes from "@/composables/useNotes";

export const useNoteStore = defineStore("note", () => {
	const currentTheme = ref<"emerald" | "night">("emerald");
	const loading = ref<boolean>(false);
	// const errorMessage = ref<string>("");
	const notes = ref<INote[]>([]);

	const { fetchNotes, addNote, deleteNote, updateNote } = useNotes();

	async function populateNotes(params: { user_id: number }) {
		loading.value = true;
		try {
			const response = await fetchNotes(params);
			if (Array.isArray(response)) notes.value = response;
			else throw new Error(response?.message ?? "Oops! something wend wrong");
		} catch (error) {
			console.error(error);
		} finally {
			loading.value = false;
		}
	}

	onMounted(() => {
		currentTheme.value =
			(localStorage.getItem("theme") as "emerald" | "night") ?? "emerald";
		document.documentElement.setAttribute("data-theme", currentTheme.value);
	});

	async function createNewNote(note: INote, user_id: string) {
		loading.value = true;
		try {
			const response = await addNote({ note, user_id });
			if (response) throw new Error(response.message);
		} catch (error) {
			console.error(error);
		} finally {
			loading.value = false;
		}
	}

	async function update(note: INote, user_id: string) {
		loading.value = true;
		try {
			const response = await updateNote({ note, user_id });
			if (response) throw new Error(response.message);
		} catch (error) {
			console.error(error);
		} finally {
			loading.value = false;
		}
	}

	async function removeNote(noteId: number) {
		loading.value = true;
		try {
			const response = await deleteNote({ id: noteId });
			if (response) throw new Error(response.message);
		} catch (error) {
			console.error(error);
		} finally {
			loading.value = false;
		}
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
		return notes.value.filter((note) => note.status === "Todo");
	});

	const inProgressNotes = computed(() => {
		return notes.value.filter((note) => note.status === "Inprogress");
	});

	const pendingNotes = computed(() => {
		return notes.value.filter((note) => note.status === "Pending");
	});

	const completedNotes = computed(() => {
		return notes.value.filter((note) => note.status === "Completed");
	});

	const allNotes = computed(() => {
		return notes.value;
	});

	return {
		allNotes,
		todoNotes,
		pendingNotes,
		completedNotes,
		inProgressNotes,
		removeNote,
		populateNotes,
		update,
		createNewNote,
		getCurrentTheme,
		updateCurrentTheme,
	};
});
