import React, { Component } from 'react'
import './index.scss'

// 地图ak GGzj5ZZ9lLmRc3NAWA75IzAFuZzuReyD

export default class Map extends Component {

   componentDidMount() {
      this.initMap()
   }

   //  初始化百度地图
   initMap() {
      // 百度地图
      var map = new window.BMapGL.Map("container")
      var point = new window.BMapGL.Point(116.404, 39.915);
      map.centerAndZoom(point, 12);
      map.enableScrollWheelZoom(true)  //滚轮缩放
      var geolocation = new window.BMapGL.Geolocation();
      geolocation.getCurrentPosition(function(r){
          if(r!=={}){
              var mk = new window.BMapGL.Marker(r.point);
              map.addOverlay(mk);
              map.panTo(r.point);
          }
          else {
              alert('failed' + this.getStatus());
          }        
      });
   }

   render() {
      return (
         <div className='map'>
            <div id="container"></div>
         </div>
      )
   }
}
