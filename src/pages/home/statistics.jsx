import React from 'react'
import { Row, Col,Statistic } from 'antd';
import axios from 'axios';

class Statistics extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }

    componentDidMount(){
        this.getMessageData()
        setInterval(this.getMessageData, 1000*30)
    }

    getMessageData = () => {
        axios.defaults.baseURL = 'http://localhost:8989';
        axios.get('/message/getMessageStatistics', {
            params: { userID: window.localStorage.getItem("id") },
            headers: {token: window.localStorage.getItem("token") }
            }).then(res=>{
                if(res.data.code === 200){
                    this.setState({
                        data: res.data.payload
                    })
                
                } else if (res.data.code === "50000"){
                    window.localStorage.clear()
                    window.location.href = '/login'
                }
            });
    }

    render() {

        return(
            <div>
                <div style={{textAlign:"left", fontSize:26, marginLeft: "10%", marginTop: 20, marginBottom:5}}> 统计信息 </div>
                <Row gutter={24}>
                    <Col span={6}>
                    <Statistic title="设备总量" value={this.state.data.totalDevice} />
                    </Col>
                    <Col span={6}>
                    <Statistic title="在线总量" value={this.state.data.totalDevice} />
                    </Col>
                    <Col span={6}>
                    <Statistic title="今日消息数" value={this.state.data.todayMessage} />
                    </Col>
                    <Col span={6}>
                    <Statistic title="总消息数" value={this.state.data.allMessage} />
                    </Col>
                </Row>
            </div>
        )
    }

}

export default Statistics