import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "reset-css";
import Vant from "vant";
import "vant/lib/index.css";
import { AddressEdit } from "vant";
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from "vant";

Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);

Vue.use(AddressEdit);

Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app");
