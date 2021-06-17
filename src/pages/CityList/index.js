import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile'
import './index.scss'
// import axios from 'axios'

export default class CityList extends Component {
    state = {
        citylist: [{ label: "北京", value: "AREA|88cff55c-aaa4-e2e0", pinyin: "beijing", short: "bj" },
        { label: "安庆", value: "AREA|b4e8be1a-2de2-e039", pinyin: "anqing", short: "aq" },
        { label: "北海", value: "AREA|2bc437ca-b3d2-5c3c", pinyin: "beihai", short: "bh" },
        { label: "长沙", value: "AREA|98b03413-6f84-c263", pinyin: "changsha", short: "cs" },
        { label: "宝鸡", value: "AREA|27e414ce-a7e1-fd99", pinyin: "baoji", short: "bj" }]
    }
    async getCityList() {
        // let res = await axios.get("http://wohaoshuai.net/area/city?level=1")
        // this.setState({
        //     citylist: res.data.body
        // })
        let citylist = {}
        // res.data.data.body.forEach(item => {
        this.state.citylist.forEach(item => {
            // 例 ：citylist 中有 a 就push进数组,没有就重新赋值为一个新数组
            let key = item.short.substr(0, 1)
            if (citylist.key) {
                citylist[key].push(item)
            } else {
                citylist[key] = [item]
            }
        })
    }
    componentDidMount() {
        this.getCityList()
    }
    render() {
        return (
            <div className="citylist">
                <NavBar
                    className='navbar'
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.go(-1)}
                >城市选择</NavBar>
            </div>
        )
    }
}