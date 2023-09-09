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
			<SunIcon class="swap-off fill-current w-8" />
			<MoonIcon class="swap-on fill-current w-8" />
		</label>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import SunIcon from "@/components/icons/Sun.vue";
import MoonIcon from "@/components/icons/Moon.vue";

const isDark = ref<boolean>(true);
const emit = defineEmits<(e: "onThemeChange", isDark: boolean) => void>();
</script>
