import React, { Component } from "react";
import "./index.scss";
import NavHeader from "../../components/NavHeader";
import { getCurrentCity } from "../../utils/index";
// 导入局部样式
import styles from "./map.module.scss";
// 导入Toast
import { Toast } from "antd-mobile";
// import axios from "axios";

// 地图ak GGzj5ZZ9lLmRc3NAWA75IzAFuZzuReyD

export default class Map extends Component {
  state = {
    // 模拟获取的所有区的房子套数
    areahouse: [
      {
        coord: { latitude: "39.912338", longitude: "116.449979" },
        count: 566,
        label: "朝阳",
        value: "AREA|69cc5f6d-4f29-a77c",
      },
      {
        coord: { latitude: "39.858097", longitude: "116.292081" },
        count: 198,
        label: "丰台",
        value: "AREA|0dd58113-90ab-4d85",
      },
    ],
    // 模拟点击小区获得的详情数据
    list: [
      {
        desc: "一室/96/南|北/杨庄22号院",
        houseCode: "5cc46a721439630e5b438ef2",
        houseImg: "/newImg/7bik8l6mk.jpg",
        price: 3600,
        tags: ["近地铁", "集中供暖"],
        title: "整租· 杨庄22号院1室1厅36元",
      },
      {
        desc: "一室/96/南|北/杨庄22号院",
        houseCode: "5cc46a734439630e5b438ef2",
        houseImg: "/newImg/7bik8l6mk.jpg",
        price: 3600,
        tags: ["近地铁", "集中供暖"],
        title: "整租· 杨庄22号院1室1厅36元",
      },
    ],
    // 房子套数
    count: 0,
    isshow: false, // false 默认不显示  true 显示
  };

  componentDidMount() {
    this.initMap();
  }

  //  初始化百度地图
  async initMap() {
    // 1、创建地图
    this.map = new window.BMapGL.Map("container");

    // 补充地图的移动事件 使房子列表隐藏
    this.map.addEventListener("movestart", () => {
      this.setState({
        isshow: false,
      });
    });

    // 2、拿到本地城市信息
    let dingwei = await getCurrentCity();
    var myGeo = new window.BMapGL.Geocoder();
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      dingwei.label,
      (point) => {
        if (point) {
          // 3、移动视野到定位的经纬度
          this.map.centerAndZoom(point, 11); //11 市区  13 城镇  15街道
          this.map.addControl(new window.BMapGL.NavigationControl()); //加减号 地图缩放
          this.map.addControl(new window.BMapGL.ScaleControl()); // 比例尺
          // map.addControl(new window.BMapGL.OverviewMapControl());  //缩略地图
          this.map.addControl(new window.BMapGL.MapTypeControl());
        }

        // 如果不想传 map   把map给this  封装的里面直接拿this.map
        this.renderOverLays(dingwei.label, "cycle");
      },
      dingwei.label
    );
  }

  // 封装 renderOverlays---发送请求和循环生成覆盖物
  renderOverLays = (id, type) => {
    // 发送请求获取当前所有区的房子套数
    // let res = axios.get(""+id);

    // 循环所有区 生成覆盖物
    this.state.areahouse.forEach((item) => {
      var point = new window.BMapGL.Point(
        item.coord.longitude,
        item.coord.latitude
      );

      var opts = {
        position: point, // 指定文本标注所在的地理位置 point 经纬度
        offset: new window.BMapGL.Size(-35, -35), //设置文本偏移量
      };

      // 1、方法1
      var label = new window.BMapGL.Label("", opts); //创建文本标注对象

      // 2、方法2 需上面写''空
      // 圆形
      if (type === "cycle") {
        label.setContent(`
             <div class="${styles.bubble} ">
               <p class="${styles.name}">${item.label}</p>
               <p>${item.count}套</p>
             <div>
      `);
      } else {
        // 矩形
        label.setContent(`
              <div class="${styles.rect}">
               <span class="${styles.housename}">${item.label}</span>
               <span class="${styles.housenum}">${item.count}套</span>
               <i class="${styles.arrow}"></i>
              </div>
         `);
      }

      label.setStyle({
        fontSize: "12px",
        lineHeight: "20px",
        fontFamily: "微软雅黑",
      });

      label.addEventListener("click", (e) => {
        var zoom = this.map.getZoom();
        if (zoom === 15) {
          // 把小区移到地图中心
          // e.changedTouches[0].clientX  距离屏幕左上角
          // e.changedTouches[0].clientY  距离屏幕左上角

          // e.changedTouches[0].pageX  距离页面左上角
          // e.changedTouches[0].pageY  距离页面左上角

          // e.changedTouches[0].screenX  距离屏幕左上角
          // e.changedTouches[0].screenY  距离屏幕左上角

          //  获取中心点坐标
          // x宽度的一半 y (屏幕高-底部列表高)/2
          // window.innerWidth  (window.innerHeight-330)/2
          let centerX = window.innerWidth / 2;
          let centerY = (window.innerHeight - 330) / 2;

          // 移动到中心点所需要移动的距离
          let distanceX = e.changedTouches[0].clientX - centerX;
          let distanceY = e.changedTouches[0].clientY - centerY;

          //  移动小区到地图中心
          this.map.panBy(-distanceX, -distanceY);

          // 15的时候点击小区 查看小区详情 传小区id 获取小区的房子列表
          this.getHouseList(item.value);
        } else {
          // 1、放大地图 到下一级地区
          this.map.centerAndZoom(point, zoom + 2);

          // 2、清除地图上的覆盖物  最好加个延时
          setTimeout(() => {
            this.map.clearOverlays();
          }, 10);

          //  发送请求 获取二级地区的房源数据 循环生成覆盖物  递归

          if (zoom + 2 === 15) {
            type = "rect";
          }
          this.renderOverLays(item.value, type);
        }
      });
      label.setStyle({
        padding: 0,
        border: "none",
      });
      this.map.addOverlay(label);
    });
  };

  // 点击具体小区触发
  getHouseList(id) {
    Toast.loading("正在加载...", 0);
    //  let res= axios.get('')
    // this.setState({
    // count:res.data.body.count,
    // list:res.data.body.list
    // isshow:true //true 点击小区 就 显示房子列表 
    // })
    Toast.hide();
  }

  //渲染房子列表
  renderHouse() {
    return this.state.list.map((item) => {
      return (
        <div className={styles.house} key={item.houseCode}>
          <div className={styles.imgWrap}>
            <img
              className={styles.img}
              src={`http://api-haoke-dev.itheima.net${item.houseImg}`}
              alt=""
            />
          </div>
          <div className={styles.content}>
            <h3 className={styles.title}>{item.title}</h3>
            <div className={styles.desc}>{item.desc}</div>
            <div>
              {/* ['近地铁', '随时看房'] */}
              {/* tags 有几个 就显示几个span */}
              {item.tags.map((v, i) => {
                return (
                  <span key={i} className={[styles.tag, styles.tag1].join(" ")}>
                    {v}
                  </span>
                );
              })}
            </div>
            <div className={styles.price}>
              <span className={styles.priceNum}>{item.price}</span> 元/月
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="map">
        <NavHeader>地图找房</NavHeader>

        {/* map组件 */}
        <div id="container"></div>

        {/* 小区房子列表 结构样式 */}
        {/* styles.show 控制显示隐藏的 */}
        <div
          className={[
            styles.houseList,
            this.state.isshow ? styles.show : "",
          ].join(" ")}
        >
          {/* 头 */}
          <div className={styles.titleWrap}>
            <h1 className={styles.listTitle}>房屋列表</h1>
            <a className={styles.titleMore} href="/house/list">
              更多房源
            </a>
          </div>
          {/* 房子列表大盒子 */}
          <div className={styles.houseItems}>
            {/* house 每一个 房子 */}
            {/* 循环list 小区房子列表 渲染 房子 */}
            {this.renderHouse()}
          </div>
        </div>
      </div>
    );
  }
}
