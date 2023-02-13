import { clearStorage, getStorage } from "@/utils/index";
import { defineStore } from "pinia";

export const useAppStore = defineStore({
	id: "user",
	state: () => ({
		token: getStorage("token"),
	}),
	getters: {
		getToken: (state) => {
			return state.token;
		},
	},
	// modules: {},
	actions: {
		handleLogout() {
			this.$patch({
				token: "",
			});
			clearStorage();
		},
	},
});
