import React from "react";

import { Flex } from "antd-mobile";

import styles from "./index.module.css";

// 条件筛选栏标题数组：
const titleList = [
  { title: "区域", type: "area" },
  { title: "方式", type: "mode" },
  { title: "租金", type: "price" },
  { title: "筛选", type: "more" },
];

// 接收父组件传进来的值
// class类组件  this.props
// 函数组件 props
export default function FilterTitle(props) {
  let { titleSelected } = props; //解构
  return (
    <Flex align="center" className={styles.root}>
      {/* 循环titleList 生成四个标题 */}
      {titleList.map((item) => {
        // 通过属性  判断是否应该高亮 每循环一次判断一次
        let isSelected = titleSelected[item.type]; // area mode price more

        return (
          <Flex.Item
            key={item.type}
            onClick={() => {
              props.onTitleClick(item.type); // 点击哪个标题就让对应标题高亮变成true
            }}
          >
            {/* 选中类名： styles.selected  */}
            <span
              className={[
                styles.dropdown,
                isSelected ? styles.selected : "",
              ].join(" ")}
            >
              <span>{item.title}</span>
              <i className="iconfont icon-arrow" />
            </span>
          </Flex.Item>
        );
      })}
    </Flex>
  );
}
