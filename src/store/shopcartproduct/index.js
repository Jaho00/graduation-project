import { getShopCartAPI } from "@/request/api";

export default {
    namespaced: true,
    state: {
        productinfo: [],
    },
    getters: {},
    mutations: {
        chanProductinfo(state, payload) {
            state.productinfo = payload;
        },
    },
    actions: {
        async asyncgetShopCartProduct({ commit }) {
            let userid = localStorage.getItem("id");
            let res = await getShopCartAPI({
                userid,
            });
            if (res.code == 200) {
                commit("chanProductinfo", res.data);
            } else {
                console.log("查询失败");
            }
        },
    },
};
