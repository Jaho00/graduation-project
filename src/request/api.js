import instance from "./request";
import qs from "qs";

// 发起获取用户信息请求(使用用户名查询)
export const getUserInfoAPI = params => instance.get("/Mine/userinfo", { params });

// 发起获取用户信息请求(使用id查询)
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

// 修改用户地址
export const updateAddressAPI = params => instance.post("/Mine/addAddress", qs.stringify(params));

// 删除订单
export const deleteOrderformAPI = params => instance.post("/Mine/orderform/delete", qs.stringify(params));

// 删除购物车中的商品
export const deleteShoppingCarProductAPI = params => instance.post("/ShoppingCart/del", qs.stringify(params));

// 提交订单
export const submitOrderAPI = params => instance.post("/Mine/orderform/add", qs.stringify(params));

// 根据商品id获取商品信息
export const idGetProductInfoAPI = params => instance.get("/Product/search/id", { params });

// 购物车添加商品
export const addShoppingAPI = params => instance.post("/ShoppingCart/add", qs.stringify(params));

// 添加收藏
export const addFavoritesAPI = params => instance.post("/Mine/favorites/add", qs.stringify(params));

// 删除收藏
export const deleteFavoritesAPI = params => instance.post("/Mine/favorites/del", qs.stringify(params));

// 根据id获取收藏商品
export const idGetFavoritesAPI = params => instance.get("/Mine/favorites/search/id", { params });
