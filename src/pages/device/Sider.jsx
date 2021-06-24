import { Menu } from 'antd';
import React from 'react'
import {Link} from 'react-router-dom';

class Sider extends React.Component {
  render() {
    return (
      <Menu
        style={{ width: 256, "margin-right":"40px" }}
        defaultSelectedKeys={['1']}
        mode="inline"
      >
        <Menu.Item key="1">
          <Link to = "/home/device"> 设备上报数据 </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to = "/home/device/myDevice"> 管理设备 </Link>
        </Menu.Item>
      </Menu>

    );
  }
}

export default Sider
