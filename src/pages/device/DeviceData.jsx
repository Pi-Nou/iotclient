import { Table, Tag } from 'antd';
import React from 'react'
import axios from 'axios';

class DeviceData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      filters: []
    }
  }

  componentDidMount(){
    this.getUserMessage()
    this.getDeviceList()

    setInterval(this.getUserMessage, 1000*30)
  }

  // 获取所有消息
  getUserMessage = () =>{
    axios.defaults.baseURL = 'http://localhost:8989';
    axios.get('/message/getFullMessage', {
        params: { userID: window.localStorage.getItem("id") },
        headers: { token: window.localStorage.getItem("token") }
      }).then(res=>{
          if(res.data.code === 200){
            this.setState({ 
              messages: res.data.payload
            })
          } else if(res.data.code === "50000"){
            window.localStorage.clear()
            window.location.href = '/login'
          }
      });
  }

  getDeviceList(){
    axios.defaults.baseURL = 'http://localhost:8989';
    axios.get('/device/getDevices', {
        params: { userID: window.localStorage.getItem("id") },
        headers: {token: window.localStorage.getItem("token") }
      }).then(res=>{
          if(res.data.code === 200){
            var list = res.data.payload
            var filter = []
            for(var i=0; i<list.length; i++){
              filter.push({
                text: list[i].deviceID,
                value: list[i].deviceID
              })
            }
            this.setState({
              filters: filter,
            })
          } else if(res.data.code === "50000"){
            window.localStorage.clear()
            window.location.href = '/login'
          }
      });
  }

  render() {
    const columns = [
      {
        title: '设备编号',
        dataIndex: 'deviceID',
        filters: this.state.filters,
        onFilter: (value, record) => record.deviceID.indexOf(value) === 0},
      {
        title: '上报信息',
        dataIndex: 'info',
      },
      {
        title: '设备数据',
        dataIndex: 'value',
        align: 'center',
        sorter: (a, b) => a.value - b.value,
      },
      {
        title: '状态',
        dataIndex: 'alert',
        filters: [
          {
            text: '正常',
            value: 0
          },
          {
            text: '告警',
            value: 1
          }
        ],
        onFilter: (value, record) => record.alert === value,
        render: status => {
          let color = status === 0 ?  'green':'volcano';
          let text =  status === 0 ?  "正常":"告警";
          return (
            <Tag color={color} key={status}>
              {text}
            </Tag>
          );
        },
      },
      {
        title: '纬度',
        dataIndex: 'lng',
      },
      {
        title: '经度',
        dataIndex: 'lat',
      },
      {
        title: '上报时间',
        dataIndex: 'timestamp',
        render: timestamp => {
            var D = new Date(timestamp);
            var year = D.getFullYear();
            var month = D.getMonth() + 1;
            month = month<10 ? ('0'+month) : month;
            var day = D.getDate();
            day = day<10?('0'+day):day;
            var hours = D.getHours();
            hours = hours<10?('0'+hours):hours;
            var minutes = D.getMinutes();
            minutes = minutes<10?('0'+minutes):minutes;
            var seconds = D.getSeconds();
            seconds = seconds<10?('0'+seconds):seconds;
      
            let now_time = year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds;
          return (
            <div>{now_time}</div>
          );
        },
      }
    ]
    
    return (
      <div>
        <Table style={{marginLeft:50, marginTop:25}} columns={columns} dataSource={this.state.messages} bordered />
      </div>
    );
  }
}

export default DeviceData