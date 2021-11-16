// token.js 
// 因为 token 存在localStorage 
// 后面会经常操作 localStorage token 我打算封装一下
// 增删改查
// 获取token
let getToken=()=>{ 
    return localStorage.getItem("my-token")
  }
  // 设置token
  let setToken=(val)=>{
    //  localStorage.setItem("名字",值)
    localStorage.setItem("my-token",val)
  }
  // 删除token
  let removeToken=()=>{
    // localStorage.removeItem("名字")
    localStorage.removeItem("my-token")
  }
  
  // 判断是否登录 有token代表登录  true  没有false
  let isAuth=()=>{
      // if(如果有token){
      // if( getToken() ){
      //    return true //有token代表登录
      // }else{
      //   return false // 没有token  未登录
      // }
      // 有token  true  没有false
     return !!getToken()  // !!值  转换成对应 true 或false
  }
  
  // 导出多个
  export { getToken, setToken,removeToken,isAuth}