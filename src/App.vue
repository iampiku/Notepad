<template>
	<main>
		<ThemeSwitch
			class="absolute top-7 right-6"
			@onThemeChange="handleThemeChange"
		></ThemeSwitch>
		<AddNoteModal @onAddNote="handleAddNote"></AddNoteModal>
	</main>
</template>

<script setup lang="ts">
/**
 * Components
 */
import AddNoteModal from "@/components/Modals/AddNoteModal.vue";
import ThemeSwitch from "@/components/ThemeSwitch.vue";

/**
 * Interface
 */
import INote from "@/interface/INote";

function handleAddNote(note: INote) {
	console.log(note);
}

function handleThemeChange(isDark: boolean) {
	document.documentElement.setAttribute(
		"data-theme",
		isDark ? "night" : "fantasy"
	);
}
</script>
