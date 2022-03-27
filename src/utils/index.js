// 手机号码验证
export const validatePhoneNumber = value => {
    let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    return reg.test(value);
};

// 用户名验证
export const validateUserName = value => {
    let reg = /^[a-zA-Z][a-zA-Z0-9_]{4,7}$/;
    return reg.test(value);
};

// 密码验证
export const validatePassword = value => {
    let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,15}$/;
    return reg.test(value);
};
