<template>
	<Modal
		:modal="{ title: 'Add Note' }"
		v-model="showAddModal"
		@onModalClose="resetModal"
	>
		<template #body>
			<label for="title" class="label-text font-semibold">Title</label>
			<input
				id="title"
				type="text"
				name="title"
				autocomplete="off"
				v-model.trim="title"
				class="input input-bordered w-full"
			/>
			<label for="status" class="label-text">Status</label>
			<Dropdown
				size="sm"
				label="label"
				:items="status"
				selectionType="bordered"
				@onSelection="handleStatusChange"
			></Dropdown>
			<label for="note" class="label-text">Note</label>
			<textarea
				name="note"
				id="note"
				cols="30"
				rows="6"
				class="textarea input-bordered w-full"
				v-model.trim="note"
			></textarea>
		</template>
		<template #action>
			<button
				type="button"
				name="add-note"
				class="btn btn-primary"
				:disabled="isDisabled"
				@click="handleSubmit"
			>
				Add Note
			</button>
		</template>
	</Modal>
</template>

<script setup lang="ts">
/**
 * Vue
 */
import { ref, computed, watch } from "vue";

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

/**
 * State
 */
const title = ref<string>("");
const note = ref<string>("");
const status = ref<IStatus[]>([
	{ _selected: true, label: "Todo" },
	{ _selected: false, label: "Inprogress" },
	{ _selected: false, label: "Pending" },
	{ _selected: false, label: "Completed" },
]);

const emit = defineEmits<{
	(e: "onAddNote", note: INote): void;
	(e: "update:modelValue", value: boolean): void;
}>();

interface Props {
	status: string;
	modelValue: boolean;
}
const props = defineProps<Props>();

watch(
	() => props.status,
	(selectedStatus) => {
		status.value.forEach((item) => {
			if (item.label === selectedStatus) item._selected = true;
			else item._selected = false;
		});
	}
);

const showAddModal = computed({
	get: function () {
		return props.modelValue;
	},
	set: function (value: boolean) {
		emit("update:modelValue", value);
	},
});

const isDisabled = computed(() => {
	return !(title.value.length > 3 && note.value.length > 5);
});

function handleSubmit(): void {
	emit("onAddNote", {
		id: Date.now(),
		title: title.value,
		note: note.value,
		status: status.value.find((item) => item._selected)?.label ?? "Todo",
		createdAt: new Date().toLocaleString(),
		updatedAt: new Date().toLocaleString(),
	});
	resetModal();
}

function resetModal(): void {
	title.value = "";
	note.value = "";
}

function handleStatusChange(selectedStatus: any) {
	status.value.forEach((item) => {
		if (item.label === selectedStatus?.label) item._selected = true;
		else item._selected = false;
	});
}
</script>
