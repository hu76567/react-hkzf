import React, { Component } from "react";

import FilterTitle from "../FilterTitle";
import FilterPicker from "../FilterPicker";
import FilterMore from "../FilterMore";

import styles from "./index.module.css";
import { API } from "../../../../utils/api"; // 导入API
import { getCurrentCity } from "../../../../utils/index";

// Filter 由三个 子组件组成  FilterTitle  FilterPicker  FilterMore

// 控制标题高亮状态
const titleSelected = {
  area: true, //区域
  mode: false, //方式
  price: false, //租金
  more: false, //筛选
};

export default class Filter extends Component {

  state = {
    titleSelected: titleSelected,
    openType: "", // 默认'' 代表 隐藏 他可以赋值为四个单词
    filtersData: {}, // 所有条件数据
  };

  componentDidMount() {
    this.getFilters();
  }

  //  发送请求 获取 所有 条件数据
  getFilters = async () => {
    let dingwei = await getCurrentCity();
    let res = await API.get("/houses/condition?id=" + dingwei.value);
    console.log("所有条件数据filtersData", res.data.body);
    // 赋值
    this.setState({
      filtersData: res.data.body,
    });
  };


  // 取消 的函数
  onCancel = () => {
    // 隐藏组件--怎么就隐藏了？openType为'' 就隐藏了
    this.setState({
      openType: "",
    });
  };

  // 确定 的 函数
  onSave = (value) => {
    console.log("确定执行了,选择的值是", value);
    // 隐藏组件--怎么就隐藏了？openType为'' 就隐藏了
    this.setState({
      openType: "",
    });
  };

  // 渲染 FilterPicker的函数
  renderPicker = () => {
    // FilterPicker 是 默认就显示吗？不是
    // 点击 area区域 mode方式 price租金 才显示
    // 点击标题的时候 怎么就能显示了？让openType 为 area区域 mode方式 price租金 对应的单词就行啊
    let { openType, filtersData } = this.state;
    // if(如果是 area区域 mode方式 price租金 ){
    if (openType === "area" || openType === "mode" || openType === "price") {
      // area 应该显示area的数据 mode应该显示mode的数据 price就是price的数据
      // 显示picker应该 传不同的下拉数据进去
      let data = [];
      let cols = 0;
      switch (openType) {
        case "area": //区域+地铁
          data = [filtersData.area, filtersData.subway];
          cols = 3;
          break;
        case "mode": //方式
          data = filtersData.rentType;
          cols = 1;
          break;
        case "price": //租金
          data = filtersData.price;
          cols = 1;
          break;
      }

      return (
        <FilterPicker
          data={data} //传入 下拉数据
          cols={cols} //传入不同的 列数
          onCancel={this.onCancel}
          onSave={this.onSave}
        />
      );
    } else {
      // 不是 就不显示
      return null; // null 不渲染内容
    }
  };

    // 父组件声明一个方法 用来接收子组件的值
    onTitleClick = (type) => {
      console.log("父亲Filter的onTitleClick函数");
      console.log("点击的标题单词", type);
      // 点击type 是 area mode price more 对应变成true
      // 我想 每次 都是 四个false 一个对应的变true
      // 先展开四个 false 后同键名的 覆盖
      this.setState({
        titleSelected: {
          ...titleSelected, // 展开四个false
          [type]: true, // 不能写死 属性写 [变量]
        },
        openType: type, // area mode price more等单词
      });
    };

  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {/* <div className={styles.mask} /> */}

        <div className={styles.content}>
          {/* 标题栏 */}
          {/* 向FilterTitle传递选择情况 */}
          <FilterTitle
            titleSelected={this.state.titleSelected}
            onTitleClick={this.onTitleClick}
          />

          {/* 前三个菜单对应的内容：弹出的 选择框 应该有个判断 */}
          {this.renderPicker()}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    );
  }
}
