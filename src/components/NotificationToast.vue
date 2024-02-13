<template>
	<div class="toast toast-top toast-end right-10 pt-5">
		<div class="alert p-2" :class="{ notificationType }">
			<SuccessIcon v-if="props.type === 'success'" />
			<ErrorIcon v-if="props.type === 'error'" />
			<InfoIcon v-if="props.type === 'info'" />
			<span>{{ props.message }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import InfoIcon from "@/components/icons/Info.vue";
import ErrorIcon from "@/components/icons/Error.vue";
import SuccessIcon from "@/components/icons/Success.vue";

interface Props {
	message: string;
	type: "error" | "success" | "info";
}
const props = defineProps<Props>();

const notificationType = computed(() => ({
	"alert-success": props.type === "success",
	"alert-error": props.type === "error",
	"alert-info": props.type === "info",
}));
</script>
