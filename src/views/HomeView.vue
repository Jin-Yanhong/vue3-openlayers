<template>
	<div class="home">
		<button @click="toggleDark()">Is Dark: {{ isDark }}</button>
	</div>
</template>

<script lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import { defineComponent } from "vue";

export default defineComponent({
	name: "HomeView",
	components: {},
	setup() {
		const isDark = useDark({
			selector: "html",
			attribute: "prefers-color-scheme",
			valueDark: "dark",
			valueLight: "light",
		});

		const toggleDark = useToggle(isDark);
		return {
			isDark,
			toggleDark,
		};
	},

	mounted() {
		let _this = this;
		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", event => {
				_this.isDark = event.matches;
			});
	},
	beforeUnmount() {
		window
			.matchMedia("(prefers-color-scheme: dark)")
			.removeEventListener("change", () => {
				return;
			});
	},
});
</script>
