import React, { Component } from "react";

import { Link } from "react-router-dom";

import { baseURL } from "../../utils/baseURL";

import styles from "./index.module.css";
// 导入 封装的token.js
import { isAuth, getToken, removeToken } from "../../utils/token";
// 导入API
import { API } from "../../utils/api";

import { Grid, Button, Modal } from "antd-mobile";
// 菜单数据
const menus = [
  { id: 1, name: "我的收藏", iconfont: "icon-coll", to: "/favorate" },
  { id: 2, name: "我的出租", iconfont: "icon-ind", to: "/rent" },
  { id: 3, name: "看房记录", iconfont: "icon-record" },
  { id: 4, name: "成为房主", iconfont: "icon-identity" },
  { id: 5, name: "个人资料", iconfont: "icon-myinfo" },
  { id: 6, name: "联系我们", iconfont: "icon-cust" },
];
// 赋值了就用 alert 没有赋值直接用 Modal.alert
// const alert = Modal.alert;

// 默认头像
const DEFAULT_AVATAR = baseURL + "/img/profile/avatar.png";

export default class Profile extends Component {
  // islogin 不应该写死 应该看 有没有登录
  // 有token就是登录了 没有token 就是未登录
  //  token 存在 localStorage  后面会经常操作 localStorage 封装一下
  state = {
    islogin: isAuth(), // false 未登录 true代表登录
    userInfo: {
      // 用户信息
      avatar: "",
      nickname: "",
    },
  };
  
  componentDidMount() {
    // 判断如果登录了  就发送请求获取 用户头像昵称
    this.getUserinfo();
  }
  //判断如果登录了  就发送请求获取 用户头像昵称
  getUserinfo = async () => {
    if (!this.state.islogin) {
      //没有登录
      return; //不执行后面代码
    }
    //登录了    就发送请求获取 用户头像昵称
    // 需要一个 header  token 请求头
    // API.get("地址",{参数 header请求头})
    let res = await API.get("/user", {
      //  headers:{//  名字:值
      //    authorization : getToken() // 设置token 头
      //  }
    });
    console.log("用户信息", res);
    // 判断成功
    if (res.data.status == 200) {
      // 赋值 昵称 与 头像
      this.setState({
        userInfo: {
          avatar: res.data.body.avatar,
          nickname: res.data.body.nickname,
        },
      });
    } else {
      console.log("获取用户信息失败");
    }
  };
  // 退出
  logout = () => {
    // 1 弹框  提示是否退出
    Modal.alert("提示", "你确定退出吗???", [
      {
        text: "取消",
        onPress: () => {
          console.log("取消");
        },
      },
      {
        text: "确定退出", // 按钮文字
        onPress: async () => {
          // 点击事件
          console.log("确定退出");
          // 2 点击退出  发送请求 退出 并跳转到登录页面
          //  API.post("​地址",数据,{请求头})
          let res = await API.post("/user/logout", null, {
            headers: {
              authorization: getToken(),
            },
          });

          console.log("退出", res);
          if (res.data.status == 200) {
            //退出成功
            removeToken(); //删除token
            // 重置还原 游客 默认头像  去登陆按钮
            this.setState({
              islogin: false,
              userInfo: {
                avatar: "",
                nickname: "",
              },
            });
          } else {
            console.log("退出失败");
          }
        },
      },
    ]);
  };

  render() {
    const { history } = this.props;
    let { userInfo } = this.state;
    return (
      <div className={styles.root}>
        {/* 个人信息 */}
        <div className={styles.title}>
          <img
            className={styles.bg}
            src={baseURL + "/img/profile/bg.png"}
            alt="背景图"
          />
          <div className={styles.info}>
            <div className={styles.myIcon}>
              {/* 头像 有显示 没有显示默认头像 */}
              <img
                className={styles.avatar}
                src={userInfo.avatar || DEFAULT_AVATAR}
                alt="icon"
              />
            </div>
            <div className={styles.user}>
              {/* 有昵称显示 没有 显示游客
                  userInfo.nickname || '游客'
               */}
              <div className={styles.name}>{userInfo.nickname || "游客"}</div>

              {/* 判断 如果登录 显示 退出+编辑个人资料
                      未登录 显示 去登录按钮
               */}
              {/* 登录后展示： */}
              {this.state.islogin ? (
                //登录了 两个div 整体 用一个div包裹  外层大div 是会在页面显示的
                //                    <> 可以包裹整体 但是不 显示 类似 tempate block
                // <> 只是 包裹起来 当成一个整体的作用
                <>
                  <div className={styles.auth}>
                    <span onClick={this.logout}>退出</span>
                  </div>
                  <div className={styles.edit}>
                    编辑个人资料
                    <span className={styles.arrow}>
                      <i className="iconfont icon-arrow" />
                    </span>
                  </div>
                </>
              ) : (
                //没有登录
                <div className={styles.edit}>
                  <Button
                    type="primary"
                    size="small"
                    inline
                    onClick={() => history.push("/login")}
                  >
                    去登录
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 九宫格菜单 */}
        <Grid
          data={menus}
          columnNum={3}
          hasLine={false}
          renderItem={(item) =>
            item.to ? (
              <Link to={item.to}>
                <div className={styles.menuItem}>
                  <i className={`iconfont ${item.iconfont}`} />
                  <span>{item.name}</span>
                </div>
              </Link>
            ) : (
              <div className={styles.menuItem}>
                <i className={`iconfont ${item.iconfont}`} />
                <span>{item.name}</span>
              </div>
            )
          }
        />

        {/* 加入我们 */}
        <div className={styles.ad}>
          <img src={baseURL + "/img/profile/join.png"} alt="" />
        </div>
      </div>
    );
  }
}
