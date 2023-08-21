import { Ref, ref } from "vue";

import INote from "@/interface/INote";

export default class UseLocalStorage {
	private readonly storageKey: string = "items";
	private notes = ref<INote[]>(
		JSON.parse(localStorage.getItem(this.storageKey) ?? "[]")
	) as Ref<INote[]>;

	private saveNote(): void {
		localStorage.setItem(this.storageKey, JSON.stringify(this.notes.value));
	}

	private throwError(message: string): never {
		throw new Error(message);
	}

	createNote(note: INote): number {
		try {
			this.notes.value.push(note);
			this.saveNote();
			return note.id;
		} catch {
			this.throwError("Error occurred while saving note in localStorage");
		}
	}

	updateItem(updatedNote: INote): number {
		try {
			const index = this.notes.value.findIndex(
				({ id }) => id === updatedNote.id
			);
			this.notes.value[index] = updatedNote;
			return updatedNote.id;
		} catch {
			this.throwError("Error occurred while updating item in localStorage");
		}
	}
}
