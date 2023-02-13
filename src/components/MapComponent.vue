<template>
	<div class="MapComponent">
		<div ref="mapContainer" class="mapContainer"></div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import GeoJSON from "ol/format/GeoJSON";
import Map from "ol/Map";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import View from "ol/View";
import "ol/ol.css";
export default defineComponent({
	setup() {
		let mapIns: any = {};

		return {
			mapIns,
		};
	},
	name: "mapComponent",
	methods: {
		mapInit() {
			const mapContainer = this.$refs.mapContainer as HTMLDivElement;
			this.mapIns = new Map({
				target: mapContainer,
				layers: [
					new VectorLayer({
						source: new VectorSource({
							format: new GeoJSON(),
							url:
								process.env.NODE_ENV === "production"
									? "/vue3-openlayers/assets/countries.json"
									: "../assets/countries.json",
						}),
					}),
				],
				view: new View({
					center: [0, 0],
					zoom: 2,
				}),
			});
			this.$emit("mapReady", this.mapIns);
		},
	},
	mounted() {
		this.mapInit();
	},
});
</script>
<style lang="less" scoped>
.mapContainer {
	width: 100%;
	height: calc(100vh - 40px);
}
</style>
