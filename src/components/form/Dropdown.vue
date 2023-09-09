<template>
	<select
		id="select"
		v-model="selectedItem"
		@change="handleSelection"
		:class="{
			'btn-sm': props.size === 'sm',
			'select-bordered': props.selectionType === 'bordered',
		}"
		class="select"
	>
		<option
			:key="index"
			:value="selectItem"
			v-for="(selectItem, index) in items"
		>
			{{ selectItem[props.label] }}
		</option>
	</select>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface SelectItems {
	_selected: boolean;
	[key: string]: any;
}
interface Props<T extends SelectItems> {
	items: Array<T>;
	label: string;
	size: "sm" | "lg" | "md" | "wide" | "block";
	selectionType:
		| "ghost"
		| "primary"
		| "secondary"
		| "success"
		| "warning"
		| "error"
		| "bordered";
}

const props = defineProps<Props<any>>();
const selectedItem = ref<SelectItems>(
	props.items.find((item) => item._selected)
);
const emit =
	defineEmits<(e: "onSelection", item: SelectItems | null) => void>();

function handleSelection(): void {
	emit("onSelection", selectedItem.value);
}
</script>
