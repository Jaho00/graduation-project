import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "/home",
    },
    {
        path: "/home",
        name: "home",
        component: home,
    },
    {
        path: "/shop",
        name: "shop",
        component: () => import(/* webpackChunkName: "shop" */ "../views/ShopView.vue"),
    },
    {
        path: "/mine",
        name: "mine",
        component: () => import(/* webpackChunkName: "mine" */ "../views/Mine/MineView.vue"),
        children: [
            {
                path: "collect",
                name: "collect",
                component: () => import(/* webpackChunkName: "collect" */ "../views/Mine/collectView.vue"),
            },
            {
                path: "feedback",
                name: "feedback",
                component: () => import(/* webpackChunkName: "feedback" */ "../views/Mine/feedbackView.vue"),
            },
            {
                path: "order",
                name: "order",
                component: () => import(/* webpackChunkName: "order" */ "../views/Mine/orderFormView.vue"),
            },
            {
                path: "address",
                name: "address",
                component: () => import(/* webpackChunkName: "address" */ "../views/Mine/addressManagementView.vue"),
            },
        ],
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
