import { computed, ref, onMounted } from "vue";
import { defineStore } from "pinia";

import INote from "@/interface/INote";

import useNotes from "@/composables/useNotes";
import useLocalStorage from "@/composables/useLocalStorage";

import type { PostgrestError } from "@supabase/supabase-js";

function isPostGrestError(error: unknown): error is PostgrestError {
	return (
		typeof error === "object" &&
		error !== null &&
		"message" in error &&
		"details" in error &&
		"hint" in error &&
		"code" in error
	);
}

type Theme = "emerald" | "night";

export const useNoteStore = defineStore("note", () => {
	const loading = ref(false);
	const errorMessage = ref("");
	const notes = ref<INote[]>([]);

	const { getItem, setItem } = useLocalStorage<Theme>("theme");
	const { fetchNotes, addNote, deleteNote, updateNote } = useNotes();

	const currentTheme = ref<Theme>(getItem() ?? "emerald");

	function setLoading(value: boolean) {
		loading.value = value;
	}

	function setError(error: unknown) {
		errorMessage.value = isPostGrestError(error)
			? error.message
			: "Oops! something wend wrong";
	}

	/**
	 * A function to populate notes for a specific user.
	 *
	 * @param {{ user_id: number }} params - an object containing the user ID
	 * @return {Promise<void>}
	 */
	async function populateNotes(params: { user_id: number }): Promise<void> {
		setLoading(true);
		try {
			const response = await fetchNotes(params);
			if (Array.isArray(response)) notes.value = response;
			else throw response;
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}
	onMounted(() => {
		loadTheme();
	});

	async function createNewNote(note: INote, user_id: string) {
		setLoading(true);
		try {
			const error = await addNote({ note, user_id });
			if (error) throw error;
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}

	async function update(note: INote, user_id: string) {
		setLoading(true);
		try {
			const error = await updateNote({ note, user_id });
			if (error) throw error;
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}

	async function removeNote(noteId: number) {
		setLoading(true);
		try {
			const error = await deleteNote({ id: noteId });
			if (error) throw error;
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}

	function loadTheme() {
		const theme = getItem();
		updateAppTheme(theme);
	}

	function updateAppTheme(themeName: Theme | null) {
		currentTheme.value = themeName ?? "emerald";
		setItem(currentTheme.value);
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
		updateAppTheme,
	};
});
