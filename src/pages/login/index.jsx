import React from 'react';
import { Form, Input, Button, Tabs } from 'antd';
import { UserOutlined, LockOutlined} from '@ant-design/icons';
import axios from 'axios';
import Logo from '../../assets/logo.jpg';
import background from '../../assets/login.png'
import "../../assets/css/Login.css";

const { TabPane } = Tabs;
var storage = window.localStorage;


class Login extends React.Component{

    // 登录按钮
    onFinish = (values) => {
        axios.defaults.baseURL = 'http://localhost:8989';
        axios.post('/user/login',values)
        .then(res=>{
            console.log(res)
            // 登陆成功
            if(res.data.code === 200){
                storage.setItem("name", res.data.payload.user);
                storage.setItem("token", res.data.payload.token);
                storage.setItem("id", res.data.payload.id);

                // 跳转到首页
                window.location.href = '/home'
            }
            else{
                alert("用户名或密码错误")
            }
        });
    };

    render(){
        return (
            <div class="login">
                <img class="login_img" src={background} />
                <div class="login_form">
                    <div class="login_head">
                        <img class="logo" src= {Logo} />
                        <div class="title"> 物联网应用平台 </div>
                    </div>

                    <Form id="formLogin" class="user-layout-login" onFinish={this.onFinish}>
                        <Tabs defaultActiveKey="tab1">
                            <TabPane key="tab1" tab="登录">
                                <Form.Item
                                    name="userName"
                                    rules={[{ required: true, message: '请输入用户名!' }]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} size="large" placeholder="用户名" />
                                </Form.Item>
                                
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: '请输入密码!' }]}
                                >
                                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} size="large" placeholder="密码" />
                                </Form.Item>
                            
                                <Form.Item>
                                    <Button size="large" type="primary" htmlType="submit" class="login-button" block> 登录 </Button>
                                    或者 <a href="http://localhost:3000/register"> 注册账号 </a>
                                </Form.Item>
                            </TabPane>
                        </Tabs>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login