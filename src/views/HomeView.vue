<template>
	<div class="home">
		<MapComponent :params="{ a: 1, b: 2 }" @mapReady="mapReady" />
	</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Map from "ol/Map";
import ZoomSlider from "ol/control/ZoomSlider.js";
import ZoomToExtent from "ol/control/ZoomToExtent.js";
import MapComponent from "@/components/MapComponent.vue";
export default defineComponent({
	setup() {
		let mapIns: any = {};
		return {
			mapIns,
		};
	},
	components: {
		MapComponent,
	},
	name: "HomeView",
	methods: {
		mapReady(ins: Map) {
			this.mapIns = ins;
			this.mapIns.addControl(new ZoomSlider());
		},
	},
	mounted() {},
});
</script>
<style lang="less" scoped>
.mapContainer {
	width: 100%;
	height: calc(100vh - 40px);
}
</style>
