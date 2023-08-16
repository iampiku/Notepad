<template>
	<button
		type="button"
		@click="showModal = true"
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

	<Modal
		:modal="modalSetup"
		v-model="showModal"
		@onModalClick="handleSubmit"
		@onModalClose="handleModalClose"
	>
		<template #body>
			<label for="title" class="label-text">Title</label>
			<input
				id="title"
				type="text"
				name="title"
				autocomplete="off"
				v-model.trim="title"
				class="input input-bordered w-full"
			/>
			<label for="status" class="label-text">Status</label>
			<select
				id="status"
				v-model="selectedStatus"
				class="select btn-md btn-ghost"
			>
				<option
					:key="index"
					:value="selectItem"
					:selected="selectItem._selected"
					v-for="(selectItem, index) in selectStatus"
				>
					{{ selectItem.label }}
				</option>
			</select>
			<label for="note" class="label-text">Note</label>
			<textarea
				name="note"
				id="note"
				cols="30"
				rows="10"
				class="textarea input-bordered w-full"
				v-model.trim="note"
			></textarea>
		</template>
		<template #action>
			<button
				type="button"
				class="btn btn-primary"
				:disabled="isDisabled"
				@click.prevent="handleSubmit"
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
import { ref, computed } from "vue";

/**
 * Interface
 */
import INote from "@/interface/INote";
import IStats from "@/interface/IStatus";

/**
 * Component
 */
import Modal from "@/components/Modals/Modal.vue";

/**
 * State
 */
const title = ref<string>("");
const note = ref<string>("");
const showModal = ref<boolean>(false);
const selectedStatus = ref<IStats>();
const modalSetup = ref<{ title: string }>({ title: "Add Note" });
const selectStatus = ref<IStats[]>([
	{ _selected: true, label: "Todo" },
	{ _selected: false, label: "Inprogress" },
	{ _selected: false, label: "Completed" },
]);

const emit = defineEmits<(e: "onAddNote", note: INote) => void>();

const isDisabled = computed(() => {
	return !(title.value.length > 3 && note.value.length > 5);
});

function handleSubmit(): void {
	emit("onAddNote", {
		title: title.value,
		note: note.value,
		status: selectedStatus.value?.label ?? "Todo",
		createdAt: new Date().toLocaleDateString(),
	});
	title.value = "";
	note.value = "";
	showModal.value = false;
}
function handleModalClose(): void {
	title.value = "";
	note.value = "";
	selectStatus.value[0]._selected = true;
}
</script>
