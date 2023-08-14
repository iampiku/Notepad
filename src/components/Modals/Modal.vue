<template>
	<dialog class="modal" ref="notesModal">
		<form method="dialog" class="modal-box">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
				✕
			</button>
			<h3 class="font-bold text-lg text-center">{{ props.modal.title }}</h3>
			<form class="form-control flex flex-col gap-2">
				<slot name="body" :notesModal="notesModal"></slot>
				<button
					type="button"
					class="btn btn-primary modal-action"
					:disabled="props.modal.disabled"
					@click.prevent="$emit('onDialogClick')"
				>
					{{ props.modal.label }}
				</button>
			</form>
		</form>
	</dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const notesModal = ref(null);

interface ModalSetup {
	title: string;
	label: string;
	disabled: boolean;
}
interface Props {
	modal: ModalSetup;
}
const props = withDefaults(defineProps<Props>(), {
	modal: () => ({
		label: "Save",
		title: "Default Title",
		disabled: false,
	}),
});
</script>
