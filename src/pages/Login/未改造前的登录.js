import React, { Component } from "react";
import { Flex, WingBlank, WhiteSpace, Toast } from "antd-mobile";

import { Link } from "react-router-dom";

import NavHeader from "../../components/NavHeader";

import styles from "./index.module.css";

import { API } from "../../utils/api";
// 导入withFormik
import { ErrorMessage, withFormik } from "formik";
// 验证规则：
// const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
// const REG_PWD = /^[a-zA-Z_\d]{5,12}$/


class Login extends Component {
  state = {
    username: "", //用户名
    password: "", //密码
  };
  // onChange 文本框值改变时候执行的函数 在里面可以
  getUsername = (e) => {
    this.setState({
      username: e.target.value, //文本框值
    });
  };
  // onChange 文本框值改变时候执行的函数 在里面可以
  getPassword = (e) => {
    this.setState({
      password: e.target.value, //密码框值
    });
  };
  //按钮 submit 提交的 form 标签上的 onSubmit事件
  handleSubmit = async (e) => {
    e.preventDefault(); //阻止跳转
    // 发送 请求 去登录
    let res = await API.post("/user/login", {
      username: this.state.username,
      password: this.state.password,
    });
    if (res.data.status === 200) {
      //登录成功 存上token
      localStorage.setItem("my-token", res.data.body.token);
    } else {
      //失败 提示
      Toast.fail("登录失败啦~", 2);
    }
  };
  render() {
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavHeader className={styles.navHeader}>账号登录</NavHeader>
        {/* WhiteSpace 空白的高度 */}
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        {/* WingBlank 左右 15px的 margin */}
        <WingBlank>
          <form onSubmit={this.handleSubmit}>
            <div className={styles.formItem}>
              {/* 用户名 	需要自己 绑定 value +  onChange函数 实现类似的功能*/}

              <input
                value={this.state.username}
                onChange={this.getUsername}
                className={styles.input}
                name="username"
                placeholder="请输入账号"
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formItem}>
              {/* 密码 */}
              <input
                value={this.state.password}
                onChange={this.getPassword}
                className={styles.input}
                name="password"
                type="password"
                placeholder="请输入密码"
              />
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formSubmit}>
              {/* 
              按钮 1  type="button" 普通按钮 页面不会跳转提交  对应绑定 onClick事件就行
                   2   type="submit" 提交按钮 页面会跳转提交表单  在form标签对应绑定 onSubmit
                            还是会跳转  我们可以阻止跳转
              */}
              <button className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/registe">还没有账号，去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    );
  }
}

// export default Login   ---》 withRouter(Login)
// withFormik 高阶组件函数  使用 withFormik({ 表单相关配置 })(组件)
// export default withFormik({表单相关配置})(Login)
export default withFormik({
  mapPropsToValues: () => {
    return { name: "" };
  },
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
})(Login);
