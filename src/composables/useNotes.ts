import { supabase } from "@/supabase";

import INote from "@/interface/INote";

export default function useNotes() {
	async function fetchNotes(params: { user_id: number }) {
		const { data, error } = await supabase
			.from("notes")
			.select()
			.eq("user_id", params.user_id);
		if (data) return data as INote[];
		if (error) return error;
		else return null;
	}

	async function addNote(params: { user_id: string; note: INote }) {
		const { error } = await supabase.from("notes").insert({ ...params });
		if (error) return error;
		else return null;
	}

	async function updateNote(params: { user_id: string; note: INote }) {
		const { error } = await supabase
			.from("notes")
			.update(params.note)
			.eq("id", params.note.id);
		if (error) return error;
		else return null;
	}

	async function deleteNote(params: { id: number }) {
		const { error } = await supabase.from("notes").delete().eq("id", params.id);
		if (error) return error;
		else return null;
	}

	return {
		addNote,
		fetchNotes,
		updateNote,
		deleteNote,
	};
}
