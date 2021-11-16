import React, { Component } from "react";

export default class Sticky extends Component {
  pRef = React.createRef();
  cRef = React.createRef();

  handerScroll = () => {
    let pDiv = this.pRef.current;
    let cDiv = this.cRef.current;
    let pTop = pDiv.getBoundingClientRect().top;
    if (pTop <= 0) {
      // 到顶部 fixed 定位 会脱离标准流 列表会一下子跳上去
      // 因此要给 placeholder 一个高度 填补空缺
      cDiv.style.position = "fixed";
      cDiv.style.top = 0;
      cDiv.style.left = 0;
      cDiv.style.width = "100%";
      cDiv.style.zIndex = 9999;
      pDiv.style.height = this.props.height + "px";
    } else {
      cDiv.style.position = "static";
      pDiv.style.height = 0;
    }
  };

  // 滚动事件
  componentDidMount() {
    window.addEventListener("scroll", this.handerScroll);
  }

  // 组件卸载取消事件
  componentWillUnmount(){
    window.removeEventListener('scroll',this.handerScroll)
  }

  render() {
    return (
      <div className="sticky">
        {/* placeholder 用来专门判断 是否距离顶部为0 不影响原来的组件 */}
        <div ref={this.pRef} id="placeholder"></div>
        <div ref={this.cRef} id="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
