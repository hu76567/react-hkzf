import React, { Component } from "react";
import { Flex } from "antd-mobile";

import { withRouter } from "react-router";
import PropTypes from "prop-types";

class SearchHeader extends Component {
  render() {
    return (
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
            <span className="name">{this.props.children}</span>
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
    );
  }
}

SearchHeader.propTypes = {
  children: PropTypes.string,
};

SearchHeader.defaultProps = {
  children: "默认",
};

export default withRouter(SearchHeader);
