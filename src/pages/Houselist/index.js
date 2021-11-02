import React, { Component } from "react";
import SearchBHeader from "../../components/SearchHeader";

import "./houselist.scss";
import { getCurrentCity } from "../../utils";

// 导入 Filter 筛选组件
import Filter from "./components/Filter";

export default class HouseList extends Component {
  state = {
    cityname: "",
  };

  async componentDidMount() {
    let res = await getCurrentCity();

    this.setState({
      cityname: res.label,
    });
  }

  render() {
    return (
      <div className="houselist">
        <div className="header">
          <i className="iconfont icon-back"></i>
          <SearchBHeader>{this.state.cityname}</SearchBHeader>
        </div>
        <Filter></Filter>
      </div>
    );
  }
}
