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
