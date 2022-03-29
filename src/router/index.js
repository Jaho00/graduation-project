import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/HomeView.vue";
import { Toast } from "vant";

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
        path: "/a",
        name: "a",
        component: () => import(/* webpackChunkName: "a" */ "../views/a.vue"),
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

// 路由守卫
router.beforeEach((to, from, next) => {
    // 什么时候执行这个函数?
    // console.log("to为:", to); // 要去到的路由对象
    // console.log("from为:", from); // 从哪个路由触发的路由对象

    // 需求: 在进去到/shop之前, 判断有没有token  有就放行, 没有就提示请先登录, 不放行
    if (to.path == "/shop") {
        let token = localStorage.getItem("token");
        if (token) {
            // 有就放行
            next();
        } else {
            Toast.fail("请先登录");
        }

        return; // 需要写return 防止上面的next()执行完,还继续执行下面的next()
    }
    next(); // 放行
});

export default router;
