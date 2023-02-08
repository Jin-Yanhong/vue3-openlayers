import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import "normalize.css";

const pinia = createPinia();
const app = createApp(App);

app.config.globalProperties.foo = "foo";

app.use(pinia);
app.use(router);
app.mount("#app");
