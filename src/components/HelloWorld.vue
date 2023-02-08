<template>
	<div class="hello">
		<div></div>
		<h1>{{ msg }}</h1>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "HelloWorld",
	props: {
		msg: String,
	},
});
</script>
