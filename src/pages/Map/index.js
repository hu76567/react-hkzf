import React, { Component } from 'react'
import './index.scss'

// 地图ak GGzj5ZZ9lLmRc3NAWA75IzAFuZzuReyD
let BMapGL = window.BMapGL
export default class Map extends Component {

   componentDidMount() {
      this.initMap()
   }

   //  初始化百度地图
   initMap() {
      var map = new BMapGL.Map("container")
      var point = new BMapGL.Point(116.404, 39.915);
      map.centerAndZoom(point, 12);
      map.enableScrollWheelZoom(true)
   }

   render() {
      return (
         <div className='map'>
            <div id="container"></div>
         </div>
      )
   }
}