import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "../../utils/token";

export default class AuthRoute extends Component {
  render() {
    let { path, Page, exact } = this.props;
    return (
      <Route
        exact={exact}
        // 不能写死 其他的页面也要用
        path={path}
        render={(props) => {
          // Route里面  return this.props.render(xxx)
          if (isAuth()) {
            // 解构props然后传入
            return <Page {...props}></Page>;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      ></Route>
    );
  }
}
