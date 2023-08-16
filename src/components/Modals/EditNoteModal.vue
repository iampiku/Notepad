<template>
	<Modal :modal="modalSetup" v-modal="showModal" @onModalClick="handleSave">
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
			<select
				class="select btn-ghost btn-sm pr-7 join-item"
				v-model="note.status"
			>
				<option
					v-for="({ _selected, label }, index) in selectStatus"
					:key="index"
					:selected="_selected"
				>
					{{ label }}
				</option>
			</select>
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
import { computed, ref, ComputedRef } from "vue";

/**
 * Interface
 */
import INote from "@/interface/INote";

/**
 * Component
 */
import Modal from "@/components/Modals/Modal.vue";

interface Props {
	editNote: INote;
}
const props = withDefaults(defineProps<Props>(), {
	editNote: () => ({ title: "", note: "", status: "Todo", createdAt: "" }),
});

const emit = defineEmits<(e: "onEditNote", note: INote) => void>();

const status = ref<"Todo" | "Completed" | "Inprogress">("Todo");
const showModal = ref<boolean>(false);
const selectStatus = ref<{ _selected: boolean; label: string }[]>([
	{ _selected: false, label: "Todo" },
	{ _selected: false, label: "Inprogress" },
	{ _selected: false, label: "Completed" },
]);

const isDisabled: ComputedRef<boolean> = computed(() => {
	return !(
		internalNote.value.title.length > 3 && internalNote.value.note.length > 5
	);
});

const modalSetup = ref<{ title: string }>({
	title: "Edit Note",
});

const internalNote = computed(() => {
	return {
		...props.editNote,
		status: status.value,
		createdAt: new Date().toLocaleDateString(),
	};
});

function handleSave(): void {
	emit("onEditNote", internalNote.value);
}
</script>
