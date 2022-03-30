import axios from "axios";
import { Notify } from "vant";

// 创建axios实例(instance)
const instance = axios.create({
    baseURL: "/api",
    timeout: 5000,
});

// 请求拦截器
instance.interceptors.request.use(
    config => {
        // 在请求之前做的操作
        console.log(config);
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    res => {
        // 响应之后,做一些数据的统一处理
        let res_data = res.data;
        let arr = [200];

        if (!arr.includes(res_data.code)) {
            return false;
        }

        return res_data;
    },
    err => {
        Notify({ type: "danger", message: "响应错误" });
        return Promise.reject(err);
    }
);

export default instance;
