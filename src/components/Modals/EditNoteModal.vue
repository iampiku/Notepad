<template>
	<Modal :modal="{ title: 'Edit Note' }" v-model="showEditModal">
		<template #body>
			<label for="title" class="label-text">Title</label>
			<input
				type="text"
				name="title"
				id="title"
				autocomplete="off"
				v-model="internalNote.title"
				class="input input-bordered w-full"
			/>
			<label for="status" class="label-text">Status</label>
			<Dropdown
				size="sm"
				label="label"
				:items="selectStatus"
				selectionType="bordered"
				@onSelection="handleStatusChange"
			/>
			<label for="note" class="label-text">Note</label>
			<textarea
				name="note"
				id="note"
				cols="30"
				rows="10"
				v-model="internalNote.note"
				class="textarea input-bordered w-full"
			></textarea>
		</template>
		<template #action>
			<button
				type="button"
				name="delete-note"
				class="btn btn-primary"
				:disabled="isDisabled"
				@click="emit('onSave', internalNote)"
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
import Dropdown from "@/components/form/Dropdown.vue";

interface Props {
	editNote: INote;
	modelValue: boolean;
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
	modelValue: false,
});

const emit = defineEmits<{
	(e: "onSave", note: INote): void;
	(e: "update:modelValue", value: boolean): void;
}>();

const selectStatus = ref<IStatus[]>([
	{ _selected: false, label: "Todo" },
	{ _selected: false, label: "Inprogress" },
	{ _selected: false, label: "Completed" },
	{ _selected: false, label: "Pending" },
]);
watch(
	() => props.editNote.status,
	(selectedStatus) => {
		selectStatus.value.forEach((status) => {
			if (status.label === selectedStatus) status._selected = true;
			else status._selected = false;
		});
	}
);

const isDisabled: ComputedRef<boolean> = computed(() => {
	return !(
		internalNote.value.title.length > 3 && internalNote.value.note.length > 5
	);
});

const showEditModal = computed({
	get: function () {
		return props.modelValue;
	},
	set: function (value: boolean) {
		emit("update:modelValue", value);
	},
});

const internalNote = computed(() => {
	return {
		...props.editNote,
		updatedAt: new Date().toLocaleDateString(),
	};
});

function handleStatusChange(selectedStatus: any): void {
	selectStatus.value.forEach((status) => {
		if (status.label === selectedStatus) status._selected = true;
		else status._selected = false;
	});
}
</script>
