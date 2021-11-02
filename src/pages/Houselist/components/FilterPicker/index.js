import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'

export default class FilterPicker extends Component {
  state={
    value:null,// 选择的值
  }
  render() {
    return (
      <>
        {/* 选择器组件： PickerView下拉选择
              data  数据数组 value  选择的值  cols   列数
         */}
        <PickerView 
          data={this.props.data} //传入data下拉数据 
          value={this.state.value}  // 选择的值 null 代表没选
          cols={this.props.cols}// 传入不同的列数
          onChange={(val)=>{//切换选择值 会执行
              console.log('切换选择值',val)
              this.setState({
                value:val // 选择了值之后 赋值给 value
              })
          }}
       />

        {/* 底部按钮-点击取消和确定在里面写好了 */}
        <FilterFooter 
         onCancel={this.props.onCancel} //取消
         //  点击确定 传 选择的值 给 Filter
        //  onSave={this.props.onSave()} 错误的
         onSave={()=>{ //确定 套上一个函数再调用 才可以传参数
           this.props.onSave(this.state.value)
         }} 
        />
      </>
    )
  }
}
