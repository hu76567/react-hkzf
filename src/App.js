import React from 'react'

import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import Home from './pages/Home'
import Map from './pages/Map'
import CityList from './pages/CityList'

export default class App extends React.Component {
  render() {
    return <BrowserRouter>
      <div className="App">
        {/* App.js配置一级路由  home中配置二级路由 */}
        {/* <Route exact path="/home" render={(props) => {return <Redirect to="/home/index" />}}></Route> */}
        <Route exact path="/" render={(props) => {return <Redirect to="/home/index" />}}></Route>
        <Route path="/home" component={Home}></Route>
        <Route path="/map" component={Map}></Route>
        <Route path='/citylist' component={CityList}></Route>
      </div>
    </BrowserRouter>
  }
}