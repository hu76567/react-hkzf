/**
 * 获取token
 * @returns
 */
let getToken = () => {
  return localStorage.getItem("my-token");
};


/**
 * 设置token
 * @param {*} val 
 */
let setToken = (val) => {
  localStorage.setItem("my-token", val);
};


/**
 * 删除token
 */
let removeToken = () => {
  localStorage.removeItem("my-token");
};


/**
 * 判断当前登录状态
 * @returns 
 */
let isAuth = () => {
  return !!getToken(); // !!值  转换成对应 true 或false
};

// 导出
export { getToken, setToken, removeToken, isAuth };
