<template>
	<Modal
		:modal="{ title: 'Edit Note' }"
		v-model="showModal"
		@onModalClick="handleSave"
		@onModalClose="showModal = false"
	>
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
			<label for="status" class="label-text">Status</label>
			<Dropdown
				size="sm"
				label="label"
				:items="selectStatus"
				selectionType="bordered"
				@onSelection="handleStatusChange"
			></Dropdown>
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
		<template #action>
			<button
				type="button"
				class="btn btn-primary"
				:disabled="isDisabled"
				@click.prevent="handleSave"
			>
				Edit
			</button>
		</template>
	</Modal>
</template>

<script setup lang="ts">
/**
 * Vue
 */
import { computed, ref, ComputedRef, watch } from "vue";

/**
 * Interface
 */
import INote from "@/interface/INote";
import IStatus from "@/interface/IStatus";

/**
 * Component
 */
import Modal from "@/components/Modals/Modal.vue";
import Dropdown from "@/components/Dropdown.vue";

interface Props {
	editNote: INote;
	showEditModal: boolean;
}
const props = withDefaults(defineProps<Props>(), {
	editNote: () => ({
		id: 0,
		title: "",
		note: "",
		status: "Todo",
		createdAt: "",
		updatedAt: "",
	}),
	showEditModal: false,
});

const emit = defineEmits<(e: "onEditNote", note: INote) => void>();
const selectStatus = ref<IStatus[]>([
	{ _selected: false, label: "Todo" },
	{ _selected: false, label: "Inprogress" },
	{ _selected: false, label: "Completed" },
]);
const showModal = ref<boolean>(false);

const isDisabled: ComputedRef<boolean> = computed(() => {
	return !(
		internalNote.value.title.length > 3 && internalNote.value.note.length > 5
	);
});

watch(
	() => props.showEditModal,
	(modalValue: boolean) => {
		showModal.value = modalValue;
	}
);

const internalNote = computed(() => {
	return {
		...props.editNote,
		updatedAt: new Date().toLocaleDateString(),
	};
});

function handleStatusChange(status: any): void {
	console.log(status);
}

function handleSave(): void {
	emit("onEditNote", internalNote.value);
}
</script>
