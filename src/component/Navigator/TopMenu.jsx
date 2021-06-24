import React from 'react';
import {Link} from 'react-router-dom';
import { Menu } from 'antd';
import {BranchesOutlined, HomeOutlined,BookOutlined } from '@ant-design/icons';
import MenuItem from 'antd/lib/menu/MenuItem';

var storage = window.localStorage;

class TopMenu extends React.Component {
  state = {
    current: storage.getItem("TopbarKey"),
  };

  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <div className="TopBar">
             <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                <MenuItem key = "首页" icon={<HomeOutlined/>}>
                  <Link to = "/home"> 首页 </Link>
                </MenuItem>
                <MenuItem key = "设备管理" icon={<BookOutlined/>}>
                  <Link to = "/home/device"> 设备管理 </Link>
                </MenuItem>
                <MenuItem key = "设备轨迹" icon={<BranchesOutlined />}>
                  <Link to = "/home/map"> 设备轨迹 </Link>
                </MenuItem>
             </Menu>
      </div>
    );
  }
}

export default TopMenu