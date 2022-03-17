import Vue from "vue";
import Vuex from "vuex";
import commodity from "./commodity";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: { commodity },
});
