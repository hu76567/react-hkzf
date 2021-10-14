import React, { Component } from "react";
import "./index.scss";
import NavHeader from "../../components/NavHeader";
import { getCurrentCity } from "../../utils/index";
// 导入局部样式
import styles from "./map.module.scss";
import axios from "axios";

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
  };

  componentDidMount() {
    this.initMap();
    console.log(this)
  }

  // 封装 renderOverlays---发送请求和循环生成覆盖物
  renderOverLays = (id, map) => {
    // 发送请求获取当前所有区的房子套数
    // let res = axios.get(""+id);

    // 循环所有区 生成覆盖物
    this.state.areahouse.forEach((item) => {
      var opts = {
        position: {
          lng: item.coord.longitude,
          lat: item.coord.latitude,
        }, // 指定文本标注所在的地理位置 point 经纬度
        offset: new window.BMapGL.Size(-35, -35), //设置文本偏移量
      };

      // 1、方法1
      var label = new window.BMapGL.Label(
        `
              <div class="${styles.bubble} ">
                <p class="${styles.name}">${item.label}</p>
                <p>${item.count}套</p>
              <div>
              `,
        opts
      ); //创建文本标注对象

      // 2、方法2 需上面写''空
      // label.setContent(`
      // <div class="${styles.bubble}">
      //   <p class="${styles.name}">通州区</p>
      //   <p>120套</p>
      // <div>
      // `);
      label.setStyle({
        fontSize: "12px",
        lineHeight: "20px",
        fontFamily: "微软雅黑",
      });
      label.addEventListener("click", () => {
        
      });
      label.setStyle({
        padding:0,
        border:'none'
      });
      map.addOverlay(label);
    });
  };

  //  初始化百度地图
  async initMap() {
    // 1、创建地图
    var map = new window.BMapGL.Map("container");
    // 2、拿到本地城市信息
    let dingwei = await getCurrentCity();
    var myGeo = new window.BMapGL.Geocoder();
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      dingwei.label,
      (point) => {
        if (point) {
          // 3、移动视野到定位的经纬度
          map.centerAndZoom(point, 11); //11 市区  13 城镇  15街道
          console.log(window.BMapGL);
          map.addControl(new window.BMapGL.NavigationControl()); //加减号 地图缩放
          map.addControl(new window.BMapGL.ScaleControl()); // 比例尺
          // map.addControl(new window.BMapGL.OverviewMapControl());  //缩略地图
          map.addControl(new window.BMapGL.MapTypeControl());
        }

        // 如果不想传 map   把map给this  封装的里面直接拿this.map
        this.renderOverLays(dingwei.label, map);
      },
      dingwei.label
    );
  }

  render() {
    return (
      <div className="map">
        <NavHeader>地图找房</NavHeader>
        <div id="container"></div>
      </div>
    );
  }
}
