import React from 'react'

import { Flex } from 'antd-mobile'
import PropTypes from 'prop-types'

import styles from './index.module.css'
// props={ className, style, onCancel, onSave, cancelText }
//  在参数里面 直接解构了props
function FilterFooter({ className, style, onCancel, onSave, cancelText }) {
  return (
    <Flex style={style} className={[styles.root, className || ''].join(' ')}>
      {/* 取消按钮 */}
      <span
        className={[styles.btn, styles.cancel].join(' ')}
        onClick={onCancel} //取消按钮 点击调用filterPicker的onCancel方法
      >
        {cancelText}
      </span>

      {/* 确定按钮 */}
      <span className={[styles.btn, styles.ok].join(' ')} onClick={onSave}>
        确定
      </span>
    </Flex>
  )
}

// props校验
FilterFooter.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object
}

// 添加默认值
FilterFooter.defaultProps = {
  cancelText: '取消'
}

export default FilterFooter
