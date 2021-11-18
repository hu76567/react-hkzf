import React, { Component } from "react";

import FilterTitle from "../FilterTitle";
import FilterPicker from "../FilterPicker";
import FilterMore from "../FilterMore";

import styles from "./index.module.css";
// import { API } from "../../../../utils/api"; // 导入API
// import { getCurrentCity } from "../../../../utils/index";

// Filter 由三个 子组件组成  FilterTitle  FilterPicker  FilterMore

// 控制标题高亮状态
const titleSelected = {
  area: false, //区域
  mode: false, //方式
  price: false, //租金
  more: false, //筛选
};

export default class Filter extends Component {
  state = {
    titleSelected: titleSelected,
    openType: "", // 默认'' 代表 隐藏 他可以赋值为四个单词
    filtersData: {}, // 所有条件数据
    selectedValues: {
      area: ["null", "null"],
      mode: ["null"],
      price: ["null"],
      more: [],
    },
  };

  componentDidMount() {
    this.getFilters();
  }
  // 获取所有筛选条件
  getFilters = async () => {
    // let dingwei = await getCurrentCity();
    // let res = await API.get("/houses/condition?id=" + dingwei.value);
    this.setState({
      filtersData: {
        area: {
          label: "区域",
          value: "area",
          children: [
            {
              label: "北京",
              value: "01",
              children: [
                {
                  label: "东城区",
                  value: "01-1",
                },
                { label: "西城区", value: "01-2" },
                { label: "崇文区", value: "01-3" },
                { label: "宣武区", value: "01-4" },
              ],
            },
            {
              label: "浙江",
              value: "02",
              children: [
                {
                  label: "杭州",
                  value: "02-1",
                  children: [
                    { label: "西湖区", value: "02-1-1" },
                    { label: "上城区", value: "02-1-2" },
                    { label: "江干区", value: "02-1-3" },
                  ],
                },
              ],
            },
            {
              label: "辽宁",
              value: "03",
              children: [
                {
                  label: "沈阳",
                  value: "03-1",
                  children: [
                    { label: "铁西区", value: "03-1-1" },
                    { label: "和平区", value: "03-1-2" },
                    { label: "沈河区区", value: "03-1-3" },
                  ],
                },
              ],
            },
          ],
        },
        subway: {
          label: "地铁",
          value: "subway",
          children: [
            {
              label: "1号线",
              value: "01",
              children: [
                { label: "赵家庄", value: "01-1" },
                { label: "李家庄", value: "01-2" },
                { label: "高老庄", value: "01-3" },
              ],
            },
            {
              label: "2号线",
              value: "02",
              children: [
                { label: "盘丝洞", value: "02-1" },
                { label: "女儿国", value: "02-2" },
                { label: "火焰山", value: "03-3" },
              ],
            },
            { label: "3号线", value: "03" },
            { label: "4号线", value: "04" },
            { label: "5号线", value: "05" },
            { label: "6号线", value: "06" },
          ],
        },
        rentType: [
          { label: "不限", value: "01" },
          { label: "整租", value: "02" },
          { label: "合租", value: "03" },
        ],
        price: [
          { label: "不限", value: "01" },
          { label: "1000及一下", value: "02" },
          { label: "1000-2000", value: "03" },
          { label: "2000-3000", value: "04" },
          { label: "3000-4000", value: "05" },
          { label: "4000-5000", value: "06" },
        ],
        characteristic: [
          { label: "近地铁", value: "CHAR|1" },
          { label: "精装", value: "CHAR|2" },
          { label: "新上", value: "CHAR|3" },
        ],
        floor: [
          { label: "高", value: "FLOOR|1" },
          { label: "中", value: "FLOOR|2" },
          { label: "低", value: "FLOOR|3" },
        ],
        oriented: [
          { label: "东", value: "ORIEN|d4a692e4-a177-34fd" },
          { label: "西", value: "ORIEN|d4a692e4-a177-35fd" },
          { label: "南", value: "ORIEN|d4a692e4-a177-36fd" },
          { label: "北", value: "ORIEN|d4a692e4-a177-37fd" },
        ],
        roomType: [
          { label: "一室", value: "ROOM|d4a692e4-a177-37fd" },
          { label: "两室", value: "ROOM|d4a692e4-a277-37fd" },
          { label: "三室", value: "ROOM|d4a692e4-a377-37fd" },
          { label: "四室", value: "ROOM|d4a692e4-a477-37fd" },
          { label: "四室+", value: "ROOM|d4a692e4-a577-37fd" },
        ],
      },
    });
  };

  // 1、父组件声明一个方法 用来接收子组件的值 监听标题子组件的点击事件
  onTitleClick = (type) => {
    this.setState({
      // 修改对象里面的值 先展开,然后同名的自动覆盖
      titleSelected: {
        ...titleSelected, // 展开四个false
        [type]: true, // 属性写 [变量]
      },
      openType: type, // area mode price more等单词
    });
  };

  // 2、渲染 FilterPicker的函数
  renderPicker = () => {
    // 根据filtertitle组件传过来的type决定是否显示
    // 为 area区域 mode方式 price租金 时显示
    let { openType, filtersData } = this.state;

    if (openType === "area" || openType === "mode" || openType === "price") {
      // area 应该显示area的数据 mode应该显示mode的数据 price就是price的数据
      // 显示picker应该 传不同的下拉数据进去
      let data = [];
      let cols = 0;

      // 打开picker的时候 ，传入之前的选中值

      let defaultValues = this.state.selectedValues[openType];

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

        default:
          break;
      }

      return (
        <FilterPicker
          // 给FilterPicker组件添加key值为openType
          // 这样，在不同标题之间切换时候，key值都不相同都会重新创建
          // React内部会在key不同时候，重新创建该组件
          key={openType}
          data={data} //传入 下拉数据
          cols={cols} //传入不同的 列数
          defaultValues={defaultValues}
          onCancel={this.onCancel}
          onSave={this.onSave}
        />
      );
    } else {
      // 不是 就不显示
      return null; // null 不渲染内容
    }
  };

  // 5、渲染 FilterMore的函数
  renderMore = () => {
    let openType = this.state.openType;
    if (openType === "more") {
      // 将数据解构
      let {
        filtersData: { roomType, oriented, floor, characteristic },
      } = this.state;
      let data = {
        roomType,
        oriented,
        floor,
        characteristic,
      };
      let defaultValues = this.state.selectedValues[openType];

      return (
        <FilterMore
          data={data}
          defaultValues={defaultValues}
          onCancel={this.onCancel}
          onSave={this.onSave}
        />
      );
    } else {
      return null;
    }
  };

  // 3、取消
  onCancel = () => {
    this.setState({
      openType: "",
    });
  };

  // 4、确定
  onSave = (value) => {
    let openType = this.state.openType;
    this.setState(
      {
        // 点击保存的时候修改 selectedValues
        selectedValues: {
          ...this.state.selectedValues,
          [openType]: value,
        },
        openType: "",
      },
      () => {
        // 格式化当前选择的条件
        let { area, mode, more, price } = this.state.selectedValues;
        let filters = {};

        // area 中  2位置上有值，就用2位置上的  没有值 就用 1位置上的
        let areaValue = "null";
        if (area.length === 3) {
          areaValue = area[2] !== "null" ? area[2] : area[1];
        }
        let areaName = area[0]; // 取出 当前是 area还是subway
        filters[areaName] = areaValue;
        filters.mode = mode[0];
        filters.price = price[0];
        filters.more = more.join(",");
        console.log("组装好的条件", filters); //组装好的条件
        this.props.getCondition(filters);
      }
    );
  };

  renderMask = () => {
    let { openType } = this.state;
    if (openType === "area" || openType === "mode" || openType === "price") {
      return <div className={styles.mask} />;
    } else {
      return null;
    }
  };

  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {this.renderMask()}

        <div className={styles.content}>
          {/* 向FilterTitle传递选择情况 */}
          <FilterTitle
            titleSelected={this.state.titleSelected}
            onTitleClick={this.onTitleClick}
          />

          {/* 前三个菜单对应的内容：弹出的 选择框 应该有个判断 */}
          {this.renderPicker()}

          {/* 最后一个菜单对应的内容： */}
          {this.renderMore()}
        </div>
      </div>
    );
  }
}
