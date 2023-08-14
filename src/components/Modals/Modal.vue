<template>
	<dialog class="modal" ref="notesModal">
		<form method="dialog" class="modal-box">
			<button
				class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
				@click="handleModalClose"
			>
				✕
			</button>
			<h3 class="font-bold text-lg text-center">{{ props.modal.title }}</h3>
			<form class="form-control flex flex-col gap-2">
				<slot name="body"></slot>
				<button
					type="button"
					class="btn btn-primary"
					:disabled="props.modal.disabled"
					@click.prevent="$emit('onModalClick')"
				>
					{{ props.modal.label }}
				</button>
			</form>
		</form>
	</dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

const notesModal = ref<HTMLDialogElement | null>(null);

interface ModalSetup {
	title: string;
	label: string;
	disabled: boolean;
}
interface Props {
	modal: ModalSetup;
	modelValue: boolean;
}
const props = withDefaults(defineProps<Props>(), {
	modal: () => ({
		label: "Save",
		title: "Default Title",
		disabled: false,
	}),
});
const emit = defineEmits<{
	(e: "update:modalValue", value: boolean): void;
	(e: "onModalClick"): void;
	(e: "onModalClose"): void;
}>();

const value = computed({
	get: function () {
		return props.modelValue;
	},
	set: function (value: boolean) {
		emit("update:modalValue", value);
	},
});

watch(value, (newValue) => {
	if (newValue) notesModal.value?.showModal();
});

function handleModalClose(): void {
	value.value = false;
	emit("onModalClose");
}
</script>
