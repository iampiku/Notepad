<template>
	<dialog class="modal" :open="modelValue" v-if="modelValue">
		<form method="dialog" class="modal-box">
			<button
				class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
				@click.prevent="handleModalClose"
			>
				✕
			</button>
			<h3 class="font-bold text-lg text-center">{{ props.modal.title }}</h3>
			<form class="form-control flex flex-col gap-2">
				<slot name="body"></slot>
				<slot name="action">
					<button
						type="button"
						class="btn btn-primary"
						:disabled="modal.disabled"
						@click.prevent="$emit('onModalClick')"
					>
						{{ props.modal.label }}
					</button>
				</slot>
			</form>
		</form>
	</dialog>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface ModalSetup {
	title: string;
	label?: string;
	disabled?: boolean;
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
	modelValue: false,
});

const emit = defineEmits<{
	(e: "update:modelValue", value: boolean): void;
	(e: "onModalClick"): void;
	(e: "onModalClose"): void;
}>();

function handleModalClose(): void {
	showModal.value = false;
	emit("onModalClose");
}

const showModal = computed({
	get: function () {
		return props.modelValue;
	},
	set: function (value: boolean) {
		emit("update:modelValue", value);
	},
});
</script>
