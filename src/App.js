import React from "react";

import { BrowserRouter, Route, Redirect } from "react-router-dom";

import Home from "./pages/Home";
import Map from "./pages/Map";
import CityList from "./pages/CityList";
import HouseDetail from "./pages/HouseDetail";
import Login from "./pages/Login";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {/* App.js配置一级路由*/}
          {/* <Route exact path="/home" render={(props) => {return <Redirect to="/home/index" />}}></Route> */}
          <Route
            exact
            path="/"
            render={(props) => {
              return <Redirect to="/home/index" />;
            }}
          ></Route>
          <Route path="/home" component={Home}></Route>
          <Route exact path="/map" component={Map}></Route>
          <Route exact path="/citylist" component={CityList}></Route>
          {/* 配置路由参数 */}
          <Route  path="/detail/:id" component={HouseDetail}></Route>
          <Route exact path="/login" component={Login}></Route>
        </div>
      </BrowserRouter>
    );
  }
}
