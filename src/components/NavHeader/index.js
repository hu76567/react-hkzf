/**
 * 封装顶部导航栏
 */

import React, { Component } from "react";
import { NavBar, Icon} from "antd-mobile";
import { withRouter } from "react-router";
import  PropTypes  from "prop-types";
import './navheader.scss'

 class NavHeader extends Component {
  render() {
    return (
      <NavBar
        className="navbar"
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => this.props.history.go(-1)}
      >
        {this.props.children}
      </NavBar>
    );
  }
}


NavHeader.propTypes = {
  children: PropTypes.string.isRequired
}

NavHeader.defaultProps={
  children:'默认导航标题'
}

export default withRouter(NavHeader)
