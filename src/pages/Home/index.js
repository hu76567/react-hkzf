import React, { Component } from 'react'
import { TabBar } from 'antd-mobile';
import './index.css'
import { Route } from 'react-router-dom'

import Index from '../Index'
import News from '../News'
import Mine from '../Mine'
import Houselist from '../Houselist'

// 写死的数据
const tabItems = [{
    title: '首页',
    icon: 'icon-ind',
    path: '/home/index'
},
{
    title: '找房',
    icon: 'icon-findHouse',
    path: '/home/houselist'
},
{
    title: '资讯',
    icon: 'icon-infom',
    path: '/home/news'
},
{
    title: '我的',
    icon: 'icon-my',
    path: '/home/mine'
}]

export default class Home extends Component {
    state = {
        selectedTab: '/home/index',
        hidden: false,
    };

    // 将渲染tab 封装成函数
    renderTab() {
        return tabItems.map((item, index) => {
            return <TabBar.Item
                title={item.title}
                key={index}
                icon={<i className={`iconfont ${item.icon}`}></i>}
                selectedIcon={<i className={`iconfont ${item.icon}`}></i>}
                selected={this.state.selectedTab === item.path}
                // badge={1}
                // onPress 点击
                onPress={() => {
                    this.setState({
                        selectedTab: item.path,
                    });
                    this.props.history.push(item.path)
                }}
                data-seed="logId"
            >
            </TabBar.Item>
        })
    }

    render() {
        return (
            <div className="home">
                {/* 二级路由*/}
                <Route path='/home/index' component={Index}></Route>
                <Route path='/home/houselist'  component={Houselist}></Route>
                <Route path='/home/news'  component={News}></Route>
                <Route path='/home/mine'  component={Mine}></Route>
                

                <TabBar
                    unselectedTintColor="#939393"  //未选中的文字颜色
                    tintColor="#21b97a"  //选中的文字颜色
                    barTintColor="white" //tab 背景颜色
                    hidden={this.state.hidden} //是否隐藏tabBar标签
                    noRenderContent={true}  //不渲染自身内容
                >
                    {this.renderTab()}
                </TabBar>
            </div>
        );
    }
}