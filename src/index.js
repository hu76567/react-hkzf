import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
// 全局样式
import './index.css';
// 导入字体图标
import '../src/assets/fonts/iconfont.css'
// antd 样式
import 'antd-mobile/dist/antd-mobile.css';

ReactDOM.render(<App />,document.getElementById('root'))