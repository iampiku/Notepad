<template>
	<Modal v-model="showModal">
		<template #body>
			<div class="card w-96 bg-base-100 shadow-xl text-neutral-content">
				<div class="card-body items-center text-center">
					<h2 class="card-title">Delete Note!</h2>
					<p>{{ props.message }}</p>
				</div>
			</div>
		</template>
	</Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/Modals/Modal.vue";

import { ref, watch } from "vue";
const showModal = ref<boolean>(false);

interface Props {
	message: string;
	showDeleteModal: boolean;
}
watch(
	() => props.showDeleteModal,
	(modalValue: boolean) => {
		showModal.value = modalValue;
	}
);
const props = defineProps<Props>();
</script>
