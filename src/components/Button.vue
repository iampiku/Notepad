<template>
	<button
		type="button"
		class="btn btn-sm btn-secondary"
		:disabled="props.disabled"
	>
		<template v-if="loading">
			<span class="loading loading-spinner"></span>
		</template>
		<template v-else>
			<slot
				><span>{{ props.label }}</span></slot
			>
		</template>
	</button>
</template>

<script setup lang="ts">
interface Props {
	label?: string;
	loading: boolean;
	disabled: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	label: "Click Me",
	loading: false,
	disabled: false,
});
</script>
