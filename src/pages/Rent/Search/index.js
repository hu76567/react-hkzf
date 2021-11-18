import React, { Component } from "react";

import { SearchBar } from "antd-mobile";

import { getCurrentCity } from "../../../utils/index";

import styles from "./index.module.css";
import { API } from "../../../utils/api";

export default class Search extends Component {
  // 当前城市id

  state = {
    // 搜索框的值
    searchTxt: "",
    tipsList: [],
  };

  // 渲染搜索结果列表
  renderTips = () => {
    const { tipsList } = this.state;

    return tipsList.map((item) => (
      // 点击列表
      <li
        key={item.community}
        className={styles.tip}
        onClick={() => {
          // 传参
          this.props.push("/rent/add", {
            name: item.communityName, // 小区名
            id: item.community, //小区id
          });
        }}
      >
        {item.communityName}
      </li>
    ));
  };

  // 输入框的内容改变时
  handleSearchTxt = (val) => {
    this.setState({
      searchTxt: val,
    });
    if (!val) {
      this.setState({
        tipsList: [],
      });
      return;
    }
    //  获取小区数据
    clearTimeout(this.timer);
    this.timer = setTimeout(async () => {
      let dingwei = await getCurrentCity();
      let res = await API.get("/area/community", {
        params: {
          name: val,
          id: dingwei.value,
        },
      });
      this.setState({
        tipsList: res.data.body,
      });
    }, 1000);
  };

  render() {
    const { history } = this.props;
    const { searchTxt } = this.state;

    return (
      <div className={styles.root}>
        {/* 搜索框 */}
        <SearchBar
          placeholder="请输入小区或地址"
          value={searchTxt}
          onChange={this.handleSearchTxt}
          showCancelButton={true}
          onCancel={() => history.replace("/rent/add")}
        />

        {/* 搜索提示列表 */}
        <ul className={styles.tips}>{this.renderTips()}</ul>
      </div>
    );
  }
}
