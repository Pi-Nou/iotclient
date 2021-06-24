import React from 'react';
import { Form, Input, Button, Tabs } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined,PhoneOutlined } from '@ant-design/icons';
import axios from 'axios';
import Logo from '../../assets/logo.jpg';
import background from '../../assets/login.png'
import "../../assets/css/Login.css";
const { TabPane } = Tabs;

class Register extends React.Component{

    // 注册按钮
    onFinish = (values) => {
        axios.defaults.baseURL = 'http://localhost:8989';
        axios.post('/user/register', values)
        .then(res=>{
            // 注册成功
            if(res.data.code === 200){
                alert("注册成功")
                // 注册成功则跳转到登录
                window.location.href = '/login' 
            }
            else{
                alert("注册失败，该用户名/邮箱/电话号码已被注册")
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
                            <TabPane key="tab1" tab="注册">
                                <Form.Item
                                    name="email"
                                    rules={[{ required: true, message: '请输入邮箱地址!' }]}
                                >
                                    <Input prefix={<MailOutlined className="site-form-item-icon" />} size="large" type="email" placeholder="邮箱地址" />
                                </Form.Item>

                                <Form.Item
                                    name="phone"
                                    rules={[{ required: true, message: '请输入电话号码!' }, 
                                            { pattern: /^1(3[0-9]|4[01456879]|5[0-3,5-9]|6[2567]|7[0-8]|8[0-9]|9[0-3,5-9])\d{8}$/, message: '请输入正确的手机号'}]}
                                >
                                    <Input prefix={<PhoneOutlined className="site-form-item-icon" />} size="large" placeholder="电话号码" />
                                </Form.Item>

                                <Form.Item
                                    name="userName"
                                    rules={[{ required: true, message: '请输入用户名!' }]}    
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} size="large" placeholder="用户名" minLength="6" />
                                </Form.Item>
                                    
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: '请输入密码!' }]}
                                >
                                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} size="large" placeholder="密码" minLength="6"/>
                                </Form.Item>

                                <Form.Item>
                                    <Button size="large" type="primary" htmlType="submit" class="login-button" block> 注册 </Button>
                                    或者 <a href="http://localhost:3000/login"> 已有账号，去登录 </a>
                                </Form.Item>
                            </TabPane>
                        </Tabs>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Register