<template>
	<!-- <dialog class="modal" ref="notesModal">
		<form method="dialog" class="modal-box">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
				✕
			</button>
			<h3 class="font-bold text-lg text-center">Edit Note</h3>
			<form class="form-control flex flex-col gap-2">
				<label for="title" class="label-text">Title</label>
				<input
					type="text"
					name="title"
					id="title"
					autocomplete="off"
					class="input input-bordered w-full"
					v-model="internalNote.title"
				/>
				<label for="note" class="label-text">Note</label>
				<textarea
					name="note"
					id="note"
					cols="30"
					rows="10"
					class="textarea input-bordered w-full"
					v-model="internalNote.note"
				></textarea>
				<button
					type="button"
					class="btn btn-primary"
					:disabled="isDisabled"
					@click.prevent="handleSave"
				>
					Save
				</button>
			</form>
		</form>
	</dialog> -->
	<Modal :modal="modalSetup" @onDialogClick="handleSave">
		<template #body>
			<label for="title" class="label-text">Title</label>
			<input
				type="text"
				name="title"
				id="title"
				autocomplete="off"
				class="input input-bordered w-full"
				v-model="internalNote.title"
			/>
			<label for="note" class="label-text">Note</label>
			<textarea
				name="note"
				id="note"
				cols="30"
				rows="10"
				class="textarea input-bordered w-full"
				v-model="internalNote.note"
			></textarea>
		</template>
	</Modal>
</template>

<script setup lang="ts">
/**
 * Vue
 */
import { computed, ref, ComputedRef } from "vue";

/**
 * Interface
 */
import INote from "@/interface/INote";

import Modal from "@/components/Modals/Modal.vue";

interface Props {
	editNote: INote;
}

const props = withDefaults(defineProps<Props>(), {
	editNote: () => ({ title: "", note: "", status: "Todo", createdAt: "" }),
});
const emit = defineEmits<(e: "edit-note", note: INote) => void>();

const status = ref<"Todo" | "Completed" | "Inprogress">("Todo");

const isDisabled: ComputedRef<boolean> = computed(() => {
	return !(
		internalNote.value.title.length > 3 && internalNote.value.note.length > 5
	);
});

const modalSetup = ref<{ title: string; label: string; disabled: boolean }>({
	title: "Edit Note",
	label: "Save",
	disabled: isDisabled.value,
});

const internalNote = computed(() => {
	return {
		...props.editNote,
		status: status.value,
		createdAt: new Date().toLocaleDateString(),
	};
});

function handleSave(): void {
	emit("edit-note", internalNote.value);
}
</script>
