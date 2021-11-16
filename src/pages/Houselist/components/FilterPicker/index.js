import React, { Component } from "react";

import { PickerView } from "antd-mobile";

import FilterFooter from "../../../../components/FilterFooter";

export default class FilterPicker extends Component {
  state = {
    value: this.props.defaultValues, // 选择的值
  };
  render() {
    return (
      <>
        {/* 选择器组件： PickerView下拉选择
              data  数据数组 value  选择的值  cols   列数
         */}
        <PickerView
          data={this.props.data} //传入data下拉数据
          value={this.state.value} // 选择的值 null 代表没选
          cols={this.props.cols} // 传入不同的列数
          onChange={(val) => {
            this.setState({
              value: val, // 赋值当前选中值
            });
          }}
        />

        {/* 底部按钮-点击取消和确定在里面写好了 */}
        <FilterFooter
          onCancel={this.props.onCancel} //取消
          onSave={() => {
            // 用本组件的函数调用执行 才能向上传参 , 否则就是直接调用了
            this.props.onSave(this.state.value);
          }}
        />
      </>
    );
  }
}
