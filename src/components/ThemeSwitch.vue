<template>
	<div class="tooltip tooltip-left" data-tip="Theme Switch">
		<label for="theme-switch" class="swap swap-rotate">
			<input
				v-model="isDark"
				type="checkbox"
				id="theme-switch"
				name="theme-switch"
				@click="emit('onThemeChange', isDark)"
			/>
			<Component :is="icon" />
		</label>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import SunIcon from "@/components/icons/Sun.vue";
import MoonIcon from "@/components/icons/Moon.vue";

import { useNoteStore } from "@/store/NoteStore";
const noteStore = useNoteStore();

const isDark = ref(noteStore.getCurrentTheme === "night");
const emit = defineEmits<(e: "onThemeChange", isDark: boolean) => void>();

const icon = computed(() => (isDark.value ? MoonIcon : SunIcon));
// const iconClass = computed(() =>
// 	isDark.value ? "swap-on fill-current w-8" : "swap-off fill-current w-8"
// );
</script>
