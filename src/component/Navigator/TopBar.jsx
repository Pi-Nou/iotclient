import React from 'react';
import {Menu, Dropdown} from 'antd';
import { DownOutlined } from '@ant-design/icons';

import TopMenu from './TopMenu';
import Logo from '../../assets/logo.jpg';
import '../../assets/css/Menu.css';
var storage = window.localStorage;

class TopBar extends React.Component{

    render(){
        const menu = (
            <Menu>
              <Menu.Item onClick={(e) => {
                  storage.clear()
                  window.location.href = '/login' // 注销则跳转到登录
              }}>
                <a>
                  退出
                </a>
              </Menu.Item>
            </Menu>
          );

        return(
            <div class = "header">
                <img class = "logo" src = {Logo} alt="校徽" />
                <div class = "title" style={{fontSize:"20pt"}}> 物联网应用平台 </div>
                <div style = {{alignSelf:'flex-end'}}> <TopMenu /> </div>
                <div style = {{marginLeft: "auto", marginRight:30}}>
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        用户: {storage.getItem("name")} 
                        <DownOutlined />
                        </a>
                    </Dropdown>
                </div>
            </div>
        );
    }
}

export default TopBar