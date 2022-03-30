import instance from "./request";
import qs from "qs";

// 发起获取用户信息请求
export const getUserInfoAPI = params => instance.get("/Mine/userinfo", { params });

// 发起获取用户信息请求
export const idGetUserInfoAPI = params => instance.get("/Mine/userinfo/id", { params });

// 上传头像
export const uploadHeadImgAPI = params => instance.post("/user/upheadPortrait", qs.stringify(params));

// 用户注册
export const userRegistrationAPI = params => instance.post("/Mine/adduser", qs.stringify(params));

// 获取用户购物车的数据
export const getShopCartAPI = params => instance.get("/ShoppingCart/search", { params });

// 获取商品列表
export const getProductInfoAPI = () => instance.get("/Product/search");

// 发送留言请求
export const submitMessageAPI = params => instance.post("/Mine/feedback", qs.stringify(params));

// 获取用户订单列表
export const getOrderFormAPI = params => instance.get("/Mine/orderform/search", { params });

// 获取用户收藏夹列表
export const getFavoritesAPI = params => instance.get("/Mine/favorites/search", { params });

// 发起取消收藏请求
export const unSellAPI = params => instance.post("/Mine/favorites/del", qs.stringify(params));
