import React, { Component } from "react";
import { Flex, WingBlank, WhiteSpace, Toast } from "antd-mobile";

import { Link } from "react-router-dom";

import NavHeader from "../../components/NavHeader";

import styles from "./index.module.css";

// import { API } from "../../utils/api";
// 导入withFormik
import { withFormik, Form, Field, ErrorMessage } from "formik";
// 导入yup --主要配合react  * as Yup 导入所有 并取一个 名字Yup
import * as Yup from "yup";

// 验证规则：
// const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
// const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {
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
          <Form>
            <div className={styles.formItem}>
              {/* 用户名 	需要自己 绑定 value +  onChange函数 实现类似的功能*/}
              <Field
                className={styles.input}
                name="username"
                placeholder="请输入账号"
              ></Field>
            </div>
            {/* 如果有错误 才显示错误div 长度为5到8位，只能出现数字、字母、下划线 
             errors={username: "用户名 必须5-8位", password: "密码必填！"}
            */}
            <ErrorMessage
              className={styles.error} // 样式
              name="username" // 对应的错误提示字段
              component="div" // 是一个div 标签
            ></ErrorMessage>

            <div className={styles.formItem}>
              {/* 密码 */}
              <Field
                className={styles.input}
                name="password"
                type="password"
                placeholder="请输入密码"
              ></Field>
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            <ErrorMessage
              className={styles.error} // 样式
              name="password" // 对应的错误提示字段
              component="div" // 是一个div 标签
            ></ErrorMessage>

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
          </Form>
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
// 配置后 this.props 就会多 很多 formik的功能代码
export default withFormik({
  // mapPropsToValues配置表单数据 相当于 替换 state
  //1 mapPropsToValues 把 values值 赋值 在props上
  mapPropsToValues: () => {
    // state
    return {
      username: "",
      password: "",
    };
  },
  //2 表单的提交函数 handleSubmit
  handleSubmit: async (values, { props }) => {
    // 默认就帮我们阻止跳转了
    console.log("数据在values", values); // {username: "123", password: "456"}
    // console.log('用户名',values.username)
    // console.log('密码',values.password)
    // 发送 请求 去登录
    // let res = await API.post("/user/login", {
    //   username: values.username,
    //   password: values.password,
    // });
    // console.log("登录结果", res);
    // if (res.data.status === 200) {
      //登录成功 存上token
      // localStorage.setItem("名字","值")
      // localStorage.setItem("my-token", res.data.body.token);
       localStorage.setItem("my-token", 'loginsuccess');
      Toast.success("登录成功啦~", 1);
      // 跳转回上一页
      props.history.go(-1);
    // } else {
    //   //失败 提示
    //   Toast.fail("登录失败啦~", 2);
    // }
  },
  //3 validationSchema:Yup 表单验证
  // Yup.matches(正则表达式,错误提示)  可以自己写正则表达式
  // 注意 做完验证之后 错误提示 会在 组件 props上errors里面	

  validationSchema: Yup.object().shape({
    // 名字: 任何验证  Yup.string().email().required('错误提示') 字符串 邮箱 必填
    username: Yup.string()
      .required("用户名必填！")
      .matches(/^\w{5,8}$/, "用户名 必须5-8位"),
    password: Yup.string()
      .required("密码必填！")
      .matches(/^\w{5,20}$/, "密码   必须5-20位"),
    // username:Yup.number()
  }),
})(Login);
