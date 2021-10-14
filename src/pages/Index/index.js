import React, { Component } from "react";
import { Carousel, Flex, WingBlank, Grid } from "antd-mobile";
// import axios from 'axios'
import "./index.scss";

import nav1 from "../../assets/images/nav-1.png";
import nav2 from "../../assets/images/nav-2.png";
import nav3 from "../../assets/images/nav-3.png";
import nav4 from "../../assets/images/nav-4.png";

import swiper1 from "../../assets/images/swiper1.jpg";
import swiper2 from "../../assets/images/swiper2.jpg";
import swiper3 from "../../assets/images/swiper3.jpg";
import swiper4 from "../../assets/images/swiper4.jpg";
import swiper5 from "../../assets/images/swiper5.jpg";

import news1 from "../../assets/images/news1.jpg";
import news2 from "../../assets/images/news2.jpg";
import news3 from "../../assets/images/news3.jpg";

import { getCurrentCity } from "../../utils/index";

// 导航菜单的数据
const navItems = [
  {
    id: 0,
    img: nav1,
    title: "整租",
    path: "/home/houselist",
  },
  {
    id: 1,
    img: nav2,
    title: "合租",
    path: "/home/houselist",
  },
  {
    id: 2,
    img: nav3,
    title: "地图找房",
    path: "/map",
  },
  {
    id: 3,
    img: nav4,
    title: "去出租",
    path: "/rent/add",
  },
];

export default class Index extends Component {
  state = {
    swipers: [], //轮播图
    groups: [
      {
        // 租房小组
        id: 1,
        title: "家住回龙观",
        desc: "归属的感觉",
        img: "",
      },
      {
        id: 2,
        title: "宜居四五环",
        desc: "大都市生活",
        img: "",
      },
      {
        id: 3,
        title: "喧嚣三里屯",
        desc: "繁华的背后",
        img: "",
      },
      {
        id: 4,
        title: "比邻十号线",
        desc: "地铁心连心",
        img: "",
      },
    ],
    news: [],
    imgHeight: 176,
    isplay: false,
    cityName: "",
  };

  async getSwipers() {
    // let res = await axios.get("http://api-haoke-dev.itheima.net/home/swiper")
    // console.log('轮播图数据',res)
    this.setState(
      {
        // swipers: res.data.body
        swipers: [
          { imgurl: swiper1 },
          { imgurl: swiper2 },
          { imgurl: swiper3 },
          { imgurl: swiper4 },
          { imgurl: swiper5 },
        ],
      },
      () => {
        this.setState({
          isplay: true, // 数据有了之后 设置为true
        });
      }
    );
  }

  async getGroup() {
    // let res = await axios.get("http://api-haoke-dev.itheima.net/home/groups?area=AREA%7C88cff55c-aaa4-e2e0")
    // if (res.data.status === 200) {
    //    this.setState({
    //       groups: res.data.body
    //    })
    // }
  }

  async getNews() {
    //  let res= await axios.get("http://api-haoke-dev.itheima.net/home/news?area=AREA%7C88cff55c-aaa4-e2e0")
    this.setState({
      news: [
        {
          date: "两天前",
          from: "新华网",
          imgSrc: news1,
          title: "置业佳选  |  安贞西里 三室一厅 河间的古雅别院",
        },
        {
          date: "三天前",
          from: "新华网",
          imgSrc: news2,
          title: "置业佳选  |  大理王宫 苍山洱海 河间的古雅别院",
        },
        {
          date: "五天前",
          from: "新华网",
          imgSrc: news3,
          title: "置业佳选  |  安居小屋 花园洋房 清新别墅",
        },
      ],
    });
  }

  async componentDidMount() {
    this.getSwipers(); //获取轮播图
    this.getGroup(); //获取租房小组
    this.getNews(); //获取最新资讯
    // 百度定位
    // var myCity = new window.BMapGL.LocalCity();
    // myCity.get((res) => {
    //   this.setState({
    //     cityName: res.name,
    //   });
    // });
    // 用封装好的
    let res = await getCurrentCity();
    this.setState({
      cityName: res.label,
    });
  }

  //渲染轮播图
  renderSwiper() {
    return this.state.swipers.map((item, index) => (
      <a
        key={index}
        href="http://www.alipay.com"
        style={{
          display: "inline-block",
          width: "100%",
          height: this.state.imgHeight,
        }}
      >
        <img
          src={item.imgurl}
          alt=""
          style={{ width: "100%", verticalAlign: "top" }}
          onLoad={() => {
            // fire window resize event to change height
            window.dispatchEvent(new Event("resize"));
            this.setState({ imgHeight: "auto" });
          }}
        />
      </a>
    ));
  }

  //渲染导航栏
  renderNavs() {
    return navItems.map((item) => {
      return (
        <Flex.Item
          key={item.id}
          onClick={() => {
            this.props.history.push(item.path);
          }}
        >
          <img src={item.img} alt=""></img>
          <p>{item.title}</p>
        </Flex.Item>
      );
    });
  }

  // 渲染租房小组
  /**
   *  hasLine 是否有边框
   *  square 是否固定为正方形
   *  activeStyle  点击是否有灰色反馈
   */
  renderGroup() {
    return (
      <Grid
        data={this.state.groups}
        activeStyle={true}
        columnNum={2}
        hasLine={false}
        square={false}
        renderItem={(item) => (
          <Flex className="grid-item" justify="between">
            <div className="desc">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
            {/* <img src={`http://api-haoke-dev.itheima.net${item.imgSrc}`} alt=""></img> */}
            <img src={nav3} alt=""></img>
          </Flex>
        )}
      />
    );
  }

  // 渲染 最新资讯
  renderNews() {
    return this.state.news.map((item, index) => {
      return (
        <ul key={index}>
          <li>
            <div className="imgBox">
              <img src={item.imgSrc} alt=""></img>
            </div>
            <div className="news-text">
              <h4>{item.title}</h4>
              <p>
                <span>{item.from}</span>
                <span>{item.date}</span>
              </p>
            </div>
          </li>
        </ul>
      );
    });
  }

  render() {
    return (
      <div className="index">
        {/* 顶部搜索导航栏 */}
        <Flex className=" search-box">
          {/* 左侧白色区域 */}
          <Flex className="search">
            {/* 位置 */}
            <div
              className="location"
              onClick={() => {
                this.props.history.push("/citylist");
              }}
            >
              <span className="name">
                {this.state.cityName !== "" ? this.state.cityName : "定位中"}
              </span>
              <i className="iconfont icon-arrow" />
            </div>

            {/* 搜索表单 */}
            <div className="form">
              <i className="iconfont icon-seach" />
              <span className="text">请输入小区或地址</span>
            </div>
          </Flex>
          {/* 右侧地图图标 */}
          <i
            onClick={() => {
              this.props.history.push("/map");
            }}
            className="iconfont icon-map"
          />
        </Flex>

        {/* 轮播图 */}
        <Carousel
          autoplay={this.state.isplay} //是否自动轮播
          infinite //是否循环播放
        >
          {this.renderSwiper()}
        </Carousel>

        {/* nav导航 */}
        <Flex className="nav">{this.renderNavs()}</Flex>

        {/* 租房小组 */}
        <div className="group">
          <div className="group-title">
            <h3> 租房小组</h3>
            <p>更多</p>
          </div>
          {this.renderGroup()}
        </div>

        <div className="news">
          <h3>最新资讯</h3>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>
      </div>
    );
  }
}
