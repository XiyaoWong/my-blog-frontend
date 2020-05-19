import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "./http";
import VueAxios from "vue-axios";
import VueToasted from "vue-toasted";
const toastedOptions = {
  theme: "toasted-primary",
  position: "top-center",
  duration: 2000,
};
// import

Vue.use(VueAxios, axios);

Vue.use(VueToasted, toastedOptions);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
