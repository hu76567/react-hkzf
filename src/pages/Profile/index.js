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

// 默认头像
const DEFAULT_AVATAR = baseURL + "/img/profile/avatar.png";

export default class Profile extends Component {
  //  token 存在 localStorage  后面会经常操作 localStorage 封装一下
  state = {
    islogin: isAuth(), // 判断当前是否是登录状态  false 未登录 true代表登录
    userInfo: {
      avatar: "",
      nickname: "",
    },
  };

  componentDidMount() {
    this.getUserinfo();
  }

  // 如果登录了 发送请求获取 用户头像昵称
  getUserinfo = async () => {
    if (!this.state.islogin) {
      return; // 未登录 不执行后面代码
    }
    let res = await API.get("/user", {
      //  headers:{//  名字:值
      //    authorization : getToken() // 设置token 头
      //  }
    });
    console.log("用户信息", res);
    // 判断成功
    if (res.data.status === 200) {
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

  // 退出登录
  logout = () => {
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
          let res = await API.post("/user/logout", null, {
            headers: {
              authorization: getToken(),
            },
          });

          if (res.data.status === 200) {
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
              {this.state.islogin ? (
                //登录了 两个div 整体 用一个div包裹  外层大div 是会在页面显示的
                // <> 可以包裹整体 但是不 显示 类似 vue的 tempate   小程序的 block
                // <> 只是 包裹起来 当成一个整体的作用
                // 登录时 显示的
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
