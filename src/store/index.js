import Vue from "vue";
import Vuex from "vuex";
import shopcartproduct from "./shopcartproduct";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: { shopcartproduct },
});
