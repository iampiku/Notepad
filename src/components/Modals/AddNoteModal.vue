<template>
	<button
		type="button"
		@click="notesModal.showModal()"
		class="btn btn-circle btn-primary cursor-pointer absolute bottom-6 right-6"
	>
		<div class="tooltip" data-tip="Add Notes">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		</div>
	</button>
	<dialog class="modal" ref="notesModal">
		<form method="dialog" class="modal-box">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
				✕
			</button>
			<h3 class="font-bold text-lg text-center">Add Note</h3>
			<form class="form-control flex flex-col gap-2">
				<label for="title" class="label-text">Title</label>
				<input
					type="text"
					name="title"
					id="title"
					autocomplete="off"
					class="input input-bordered w-full"
					v-model="title"
				/>
				<label for="note" class="label-text">Note</label>
				<textarea
					name="note"
					id="note"
					cols="30"
					rows="10"
					class="textarea input-bordered w-full"
					v-model="note"
				></textarea>
				<button
					type="button"
					class="btn btn-primary"
					:disabled="isDisabled"
					@click.prevent="handleSubmit"
				>
					Add
				</button>
			</form>
		</form>
	</dialog>
</template>

<script setup lang="ts">
/**
 * Vue
 */
import { ref, computed } from "vue";

/**
 * Interface
 */
import INote from "@/interface/INote";

const notesModal = ref<any>(null);
const title = ref<string>("");
const note = ref<string>("");

const emit = defineEmits<(e: "add-note", note: INote) => void>();

const isDisabled = computed(() => {
	return !(title.value.length > 3 && note.value.length > 5);
});

function handleSubmit(): void {
	emit("add-note", {
		title: title.value,
		note: note.value,
		status: "Todo",
		createdAt: new Date().toLocaleDateString(),
	});
}
</script>
