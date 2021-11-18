import React, { Component } from "react";
import SearchBHeader from "../../components/SearchHeader";

import "./houselist.scss";
import { getCurrentCity } from "../../utils";
import {
  List,
  AutoSizer,
  WindowScroller,
  InfiniteLoader,
} from "react-virtualized";

// import { API } from "../../utils/api"; // 导入API

import styles from "./house.module.scss"; // 导入局部样式

// 模拟数据
import nav1 from "../../assets/images/news1.jpg";

// 导入 Filter 筛选组件
import Sticky from "../../components/Sticky";
import Filter from "./components/Filter";

import { Spring } from "react-spring/renderprops"; //导入spring动画

export default class HouseList extends Component {
  state = {
    cityname: "",
    count: 0, //房子总数
    list: [], //房子列表
  };

  async componentDidMount() {
    let res = await getCurrentCity();
    this.setState({
      cityname: res.label,
    });
    this.filters = {};
    this.getHoustList();
  }

  // 接收条件
  getCondition = (value) => {
    this.filters = value; //直接放到 this上
    this.getHoustList();
  };

  // 根据条件获取房子列表
  getHoustList = () => {
    // let dingwei = getCurrentCity();
    // let res = await API.get("/house", {
    //   params: {
    //     cityId: dingwei.value, // 当前城市id
    //     ...this.filters, // 展开4个条件
    //     start: 1, //从第1条开始
    //     end: 20, //到第20条结束
    //   },
    // });

    var tempList = [];
    for (var i = 0; i < 100; i++) {
      let obj = {
        houseImg: nav1,
        title: "汤臣一品 5室3厅 1000元",
        desc: "一室/114/南/宝鼎花园",
        tags: ["近地铁", "随时看房"],
        price: "1000",
      };
      obj.houseCode = "5cc4a51b1439630e5b50d953";
      // obj.houseCode = i;
      tempList.push(obj);
    }

    this.setState({
      // count: res.data.body.count, //房子总数
      // list: res.data.body.list, //房子列表
      count: 20,
      list: tempList,
    });
  };

  // 渲染列表
  rowRenderer = ({
    key, //键值
    index, //索引
    isScrolling, //是否正在滚动
    isVisible, // 是否可见
    style,
  }) => {
    let house = this.state.list[index]; //每一项
    if (!house) {
      return (
        <div key={key} style={style} className={styles.loading}>
          正在加载中...
        </div>
      );
    }

    return (
      <div
        onClick={() => {
          this.props.history.push("/detail/" + house.houseCode);
        }}
        className={styles.house}
        key={key}
        style={style}
      >
        {/* 左侧图片 */}
        <div className={styles.imgWrap}>
          <img className={styles.img} src={house.houseImg} alt="" />
        </div>
        {/* 右侧四行文字 */}
        <div className={styles.content}>
          <h3 className={styles.title}>{house.title}</h3>
          <div className={styles.desc}>{house.desc}</div>
          <div>
            {/* ['近地铁', '随时看房'] */}
            {house.tags.map((item, index) => {
              return (
                <span
                  key={index}
                  className={[styles.tag, styles.tag1].join(" ")}
                >
                  {item}
                </span>
              );
            })}
          </div>
          <div className={styles.price}>
            <span className={styles.priceNum}>{house.price}</span> 元/月
          </div>
        </div>
      </div>
    );
  };

  // 判断每一行数据是否加载完毕
  isRowLoaded = ({ index }) => {
    // !! 可以转换成布尔值
    return !!this.state.list[index];
  };

  // 用来获取更多房屋列表数据
  // 注意，该方法的返回值是一个 Promise 对象，并且，这个对象应该在数据加载完成时，来调用 resolve让 Promise对象的状态变为已完成
  loadMoreRows = ({ startIndex, stopIndex }) =>
    new Promise((resolve) => {
      // let dingwei = getCurrentCity();
      // let res = await API.get("/house", {
      //   params: {
      //     cityId: dingwei.value, // 当前城市id
      //     ...this.filters, // 展开4个条件
      //     start: startIndex, //从第1条开始
      //     end: stopIndex, //到第20条结束
      //   },
      // });
      // this.setState({
      // count: res.data.body.count, //房子总数
      // list: [...this.state.list,...res.data.body.list], //房子列表
      // });
      // this.getHoustList()
      resolve(); //上面请求后resolve
    });

  render() {
    return (
      <div className="houselist">
        {/* Spring 内部接收样式并作用于包裹的组件上 return this.props.children(this.prop.from、this.prop.to、this.prop.congfig) */}
        <Spring
          from={{ opacity: 0, background: "red" }} //开始样式
          to={{ opacity: 1, background: "green" }} //结束样式
          config={{ duration: 3000 }} //动画时间
        >
          {(props) => {
            return (
              <div className="header" style={props}>
                <i className="iconfont icon-back"></i>
                <SearchBHeader>{this.state.cityname}</SearchBHeader>
              </div>
            );
          }}
        </Spring>

        {/* 吸顶包裹 */}
        <Sticky height={40}>
          <Filter getCondition={this.getCondition}></Filter>
        </Sticky>

        {/* 房子列表 */}
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded} //当前数据是否加载完成
          loadMoreRows={this.loadMoreRows} //加载更多数据
          rowCount={this.state.count} //总条数
        >
          {({ onRowsRendered, registerChild }) => (
            <WindowScroller>
              {/* 让整个页面一起滚动 */}
              {({ height, isScrolling, onChildScroll, scrollTop }) => (
                <AutoSizer>
                  {(
                    { width } // width、height autoSizer自动算出的沾满屏幕的宽高
                  ) => (
                    <List
                      autoHeight // 自动适应窗口宽高 height给WindowScroller List 需要加autoHeight
                      width={width}
                      height={height}
                      isScrolling={isScrolling} //是否滚动
                      rowCount={this.state.count} //总条数
                      rowHeight={120} //行高
                      rowRenderer={this.rowRenderer} //渲染函数
                      onScroll={onChildScroll} // 监听List 跟着窗口滚动
                      scrollTop={scrollTop} //页面滚动上去的区里
                      onRowsRendered={onRowsRendered} //监听滚动
                      ref={registerChild} //InfiniteLoader 获取对应List
                    ></List>
                  )}
                </AutoSizer>
              )}
            </WindowScroller>
          )}
        </InfiniteLoader>
      </div>
    );
  }
}
