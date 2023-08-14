import INote from "../interface/INote";

import { useNoteStore } from "./NoteStore";
import { setActivePinia, createPinia } from "pinia";

import { describe, beforeEach, it, expect } from "vitest";

describe("noteStore", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	it("should return true for valid note object", () => {
		const noteStore = useNoteStore();
		const note: INote = {
			title: "New note added.",
			note: "Writing test case using vitest",
			status: "Todo",
			createdAt: "2/6/2022",
		};
		const isValid: boolean = noteStore.sanitizeNotes(note);
		expect(isValid).toBe(true);
	});

	it("should return false for an invalid note object with empty title and createdAt", () => {
		const noteStore = useNoteStore();
		const note: INote = {
			title: "",
			note: "Writing test case using vitest",
			status: "Todo",
			createdAt: "",
		};
		const isValid: boolean = noteStore.sanitizeNotes(note);
		expect(isValid).toBe(false);
	});

	it("should add a new note in notes", () => {
		const { createNewNote, notes } = useNoteStore();
		const note: INote = {
			title: "New note added.",
			note: "Writing test case using vitest",
			status: "Todo",
			createdAt: "2/6/2022",
		};
		createNewNote(note);
		expect(notes).toHaveLength(1);
	});

	it("should not add invalid note into notes", () => {
		const { createNewNote } = useNoteStore();
		const note: INote = {
			title: "",
			note: "Writing test case using vitest",
			status: "Todo",
			createdAt: "2/6/2022",
		};
		expect(() => {
			createNewNote(note);
		}).toThrowError("All the properties of notes must be populated.");
	});

	it("should return filter notes with status 'Todo'", () => {
		const { createNewNote, filterNotes } = useNoteStore();
		const notes: INote[] = [
			{
				title: "New note added.",
				note: "Writing test case using vitest",
				status: "Todo",
				createdAt: "2/6/2022",
			},
			{
				title: "New note added.",
				note: "Writing test case using vitest",
				status: "Completed",
				createdAt: "2/6/2022",
			},
			{
				title: "New note added.",
				note: "Writing test case using vitest",
				status: "Inprogress",
				createdAt: "2/6/2022",
			},
		];
		notes.forEach((note) => {
			createNewNote(note);
		});
		expect(filterNotes("Todo")).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					title: expect.any(String),
					note: expect.any(String),
					status: expect.stringMatching("Todo"),
					createdAt: expect.any(String),
				}),
			])
		);
	});
});
