import React, { lazy, Suspense } from "react";

import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Rent from "./pages/Rent";
import RentAdd from "./pages/Rent/Add";
import RentSearch from "./pages/Rent/Search";

import AuthRoute from "./components/AuthRoute";


const Home = lazy(() => import("./pages/Home"));
const Map = lazy(() => import("./pages/Map"));
const CityList = lazy(() => import("./pages/CityList"));
const HouseDetail = lazy(() => import("./pages/HouseDetail"));
const Login = lazy(() => import("./pages/Login"));

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={<div style={{height:"400px",background:'red'}}>正在加载...</div>}>
          <div className="App">
            {/* App.js配置一级路由*/}
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
            <Route path="/detail/:id" component={HouseDetail}></Route>
            <Route exact path="/login" component={Login}></Route>

            {/* 上面的写法无法判断，下面的可以控制跳转 */}
            {/* 鉴权 */}
            {/* <Route
            exact
            path="/rent"
            render={(props) => {
              //  return this.props.render(xxx) 
              if (isAuth()) {
                return <Rent></Rent>;
              } else {
                return <Redirect to="/login" />;
              }
            }}
          ></Route> */}
            <AuthRoute path="/rent" Page={Rent} exact={true}></AuthRoute>
            <AuthRoute path="/rent/add" Page={RentAdd} exact={true}></AuthRoute>
            <AuthRoute
              path="/rent/search"
              Page={RentSearch}
              exact={true}
            ></AuthRoute>
          </div>
        </Suspense>
      </BrowserRouter>
    );
  }
}
