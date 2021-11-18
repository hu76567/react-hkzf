import React, { Component } from "react";
import { Toast } from "antd-mobile";
import "./index.scss";
// import axios from 'axios'
import { getCurrentCity } from "../../utils";
import List from "react-virtualized/dist/commonjs/List"; //可视区域渲染
import AutoSizer from "react-virtualized/dist/commonjs/List"; //可视区域渲染

import NavHeader from "../../components/NavHeader";
// react ref 使用
/**
 * 1、创建ref  listRef=React.createRef()
 * 2、给对应组件 写上ref  ref={this.listRef}
 * 3、直接使用   this.listRef  拿到对应Dom
 */

export default class CityList extends Component {
  state = {
    //  模拟后端城市列表数据
    citylist1: [
      {
        label: "北京",
        value: "AREA|88cff55c-aaa4-e2e0",
        pinyin: "beijing",
        short: "bj",
      },
      {
        label: "安庆",
        value: "AREA|b4e8be1a-2de2-e039",
        pinyin: "anqing",
        short: "aq",
      },
      {
        label: "北海",
        value: "AREA|2bc437ca-b3d2-5c3c",
        pinyin: "beihai",
        short: "bh",
      },
      {
        label: " 长沙",
        value: "AREA|98b03413-6f84-c263",
        pinyin: "changsha",
        short: "cs",
      },
      {
        label: "武汉",
        value: "AREA|27e414ce-a7e1-fd99",
        pinyin: "wuhan",
        short: "wh",
      },
      {
        label: "重庆",
        value: "AREA|df130a14-79c9-a2ca",
        pinyin: "chongqing",
        short: "cq",
      },
      {
        label: "青岛",
        value: "AREA|0941e83b-fe11-b392",
        pinyin: "wuhan",
        short: "wh",
      },
      {
        label: "郑州",
        value: "AREA|37d79dc2-f02d-0233",
        pinyin: "zhengzhou",
        short: "zz",
      },
      {
        label: "沈阳",
        value: "AREA|d7233472-6b89-e7e5",
        pinyin: "shenyang",
        short: "sy",
      },
      {
        label: "佛山",
        value: "AREA|0ee75d32-8a95-3f73",
        pinyin: "foshan",
        short: "fs",
      },
      {
        label: "成都",
        value: "AREA|27a05931-1701-4e74",
        pinyin: "chengdu",
        short: "cd",
      },
      {
        label: "杭州",
        value: "AREA|19b39d4f-8a36-d6f8",
        pinyin: "wuhan",
        short: "hz",
      },
      {
        label: "西安",
        value: "AREA|57c882ca-7b1b-afcc",
        pinyin: "xian",
        short: "xa",
      },
      {
        label: "广州",
        value: "AREA|e4940177-c04c-303d",
        pinyin: "guangzhou",
        short: "gz",
      },
      {
        label: "廊坊",
        value: "AREA|0233f220-a4e2-8a00",
        pinyin: "langfang",
        short: "lf",
      },
      {
        label: "济南",
        value: "AREA|8b1d0441-81ab-e9cb",
        pinyin: "jinan",
        short: "jn",
      },
      {
        label: "徐州",
        value: "AREA|de16-0fec-919760e4",
        pinyin: "xuzhou",
        short: "xz",
      },
      {
        label: "南京",
        value: "AREA|93dec481-bd0b-577e",
        pinyin: "nanjing",
        short: "nj",
      },
    ],
    // 模拟后端热门城市数据
    hotList: [
      {
        label: "北京",
        value: "AREA|88cff55c-aaa4-e2e0",
        pinyin: "beijing",
        short: "bj",
      },
      {
        label: "上海",
        value: "AREA|dbf46b32-7e76-1196",
        pinyin: "shanghai",
        short: "sh",
      },
      {
        label: "广州",
        value: "AREA|e4940177-c04c-383d",
        pinyin: "guangzhou",
        short: "gz",
      },
      {
        label: "深圳",
        value: "AREA|a6649a11-b198-b150",
        pinyin: "shenzhen",
        short: "sz",
      },
    ],
    citylist: {},
    cityindex: [],
    activeIndex: 0, //默认索引0选中
  };

  listRef = React.createRef();

  // 初始化 请求城市列表
  componentDidMount() {
    this.getCityList();
  }

  // 处理 城市列表和右侧首字母
  async getCityList() {
    // let res = await axios.get("http://wohaoshuai.net/area/city?level=1")  //线上数据
    // 城市列表
    let { citylist, cityindex } = this.formatCity(this.state.citylist1); //模拟数据

    // let hotList =await axios.get('http://api-haoke-dev.itheima.net/area/hot')
    // 热门城市

    citylist["hot"] = this.state.hotList;
    cityindex.unshift("hot");

    // 当前定位城市
    let city = await getCurrentCity();
    citylist["#"] = [city];
    cityindex.unshift("#");

    this.setState({
      citylist,
      cityindex,
    });
  }

  // 封装 formatCity 格式化城市散装数据
  formatCity(citylists) {
    let citylist = {};
    citylists.forEach((item) => {
      let key = item.short.substr(0, 1);
      if (citylist[key]) {
        citylist[key].push(item);
      } else {
        citylist[key] = [item];
      }
    });
    let cityindex = Object.keys(citylist).sort();
    return {
      cityindex,
      citylist,
    };
  }

  // 循环渲染城市列表数据
  rowRenderer = ({
    key, // 唯一key
    index, // 索引号
    isScrolling, // 当前项是否正在滚动中
    isVisible, // 当前项在List中是可见的
    style, // 重点属性：每行的行内样式
  }) => {
    let word = this.state.cityindex[index];
    let citys = this.state.citylist[word];
    return (
      <div className="city" key={key} style={style}>
        {/* 这里其实有一层循环 */}
        <div className="title">{this.formatWord(word)}</div>
        {citys.map((item) => {
          return (
            <div
              className="name"
              key={item.value}
              onClick={() => {
                // 北上广深可以点击切换   其他的显示暂无房源
                const HOST_CITY = ["北京", "上海", "广州", "深圳"];
                if (HOST_CITY.indexOf(item.label) !== -1) {
                  localStorage.setItem("location", JSON.stringify(item));
                  this.props.history.go(-1);
                } else {
                  Toast.info("该城市暂无房源", 2);
                }
              }}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    );
  };

  // 动态计算高度
  getHeight = ({ index }) => {
    // 用到了this 如果出现问题首先考虑 this有问题 改造成箭头函数
    let word = this.state.cityindex[index];
    let citys = this.state.citylist[word];
    return 36 + 50 * citys.length;
  };

  // 格式化单词
  formatWord = (word) => {
    switch (word) {
      case "#":
        return "定位城市";
      case "hot":
        return "热门城市";
      default:
        return word.toUpperCase();
    }
  };

  // 渲染右侧单词索引
  renderIndex = () => {
    return this.state.cityindex.map((item, index) => {
      return (
        <li
          key={index}
          className={this.state.activeIndex === index ? "active" : ""}
          onClick={() => {
            console.log(1);
            // List组件滚动到对应单词 只要list 调用 scrollTORow 方法 并且穿一个索引，就可以滚动到对应索引
            this.listRef.current.scrollToRow(index);
          }}
        >
          {item === "hot" ? "热" : item.toUpperCase()}
        </li>
      );
    });
  };

  // 列表滚动时触发
  onRowsRendered = ({
    overscanStartIndex, //预渲染的开始索引
    overscanStopIndex, //预渲染的结束索引
    startIndex, //在顶部的索引
    stopIndex, //在底部的索引
  }) => {
    if (this.state.activeIndex !== startIndex) {
      this.setState({
        activeIndex: startIndex,
      });
    }
  };

  // 渲染
  render() {
    return (
      <div className="citylist">
        <NavHeader>城市选择</NavHeader>

        <AutoSizer>
          {({ height, width }) => (
            <List
              ref={this.listRef}
              width={width} // 组件的宽度
              height={height} // 组件的高度
              rowCount={this.state.cityindex.length} // 渲染总条数
              rowHeight={this.getHeight} // 每行的高度
              rowRenderer={this.rowRenderer} //渲染每行的内容
              onRowsRendered={this.onRowsRendered}
              scrollToAlignment="start"
            />
          )}
        </AutoSizer>

        <ul className="city-index">{this.renderIndex()}</ul>
      </div>
    );
  }
}
