import React, { Component } from "react";

import FilterFooter from "../../../../components/FilterFooter";

import styles from "./index.module.css";

export default class FilterMore extends Component {
  state = {
    // 关闭再打开要显示之前选中的
    moreValues: this.props.defaultValues,
  };

  // 渲染标签
  renderFilters(arr) {

    return arr.map((item) => {

      let isSelected = this.state.moreValues.indexOf(item.value) !== -1;

      return (
        <span
          // styles.tagActive
          className={[styles.tag, isSelected ? styles.tagActive : ""].join(" ")}
          key={item.value}
          onClick={() => {
            // 点击每个span
            let newmoreValues = [...this.state.moreValues];

            let index = newmoreValues.indexOf(item.value);
            // 查找有就添加，没有就删除
            if (index === -1) {
              newmoreValues.push(item.value);
            } else {
              newmoreValues.splice(index, 1);
            }

            console.log("选择的span", newmoreValues);

            this.setState({
              moreValues: newmoreValues,
            });
          }}
        >
          {item.label}
        </span>
      );
    });
  }

  render() {
    let { data } = this.props;
    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div className={styles.mask} />

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(data.roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(data.oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(data.floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>
              {this.renderFilters(data.characteristic)}
            </dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter
          className={styles.footer}
          cancelText='清除'
          onCancel={()=>{ //取消
            this.setState({
              moreValues:[]
            })
          }} 
          onSave={()=>{ //确定
            this.props.onSave(this.state.moreValues)
          }}
        />
      </div>
    );
  }
}
