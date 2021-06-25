import React from 'react'
import { Table, Button,Space,Modal,Input,Select,Form,Tag,Popconfirm,message} from 'antd';
import axios from 'axios';

const { Option } = Select;

class MyDevice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      visible: false,
      choose: {},
      edit:false,
      deviceList: [],
      myDeviceList: [],
      columns : [
        {
          title: '设备编号',
          dataIndex: 'deviceID',
        },
        {
          title: '设备名称',
          dataIndex: 'deviceName',
        },
        {
          title: '设备状态',
          dataIndex: 'status',
          render: status => {
              let color = status === "0" ?  'green':'volcano';
              let text =  status === "0" ?  "正常":"告警";
              return (
                <Tag color={color} key={status}>
                  {text}
                </Tag>
              );
          },
        },
        {
          title: '操作',
          dataIndex: 'operation',
          render: (_, record) =>{
            return(
              <Space size="large">
                <a onClick = {() => this.openModifyModal(record.key)}> 修改 </a>
                <Popconfirm title="确认要删除吗?" onConfirm={() => this.handleDelete(record.key)}>
                  <a>删除</a>
                </Popconfirm>
              </Space>
            )
          }
        },
      ]
    };
  }

  componentDidMount(){
    this.getUserDevice()
  }

  // 删除单个设备
  handleDelete(key){
    var device = this.state.myDeviceList[key]
    var data = {
      userID: window.localStorage.getItem("id"),
      deviceID: device.deviceID,
      deviceName: device.deviceName
    }

    axios.defaults.baseURL = 'http://localhost:8989';
    axios.post('/device/removeDevice', data, { headers: { token: window.localStorage.getItem("token") }})
      .then(res=>{
          // 添加成功
          if(res.data.code === 200){
            message.success('删除成功');
          }
          else if(res.data.code === 400){
            message.error('删除失败');
          }
          else if(res.data.code === "50000"){
            // 无效token则重新登陆
            window.localStorage.clear()
            window.location.href = '/login' 
          }
      });

    // 重新获取设备信息
    setTimeout(this.getUserDevice,1000)
  }

  // 打开修改设备信息框
  openModifyModal(key){
    this.setState({
      choose: this.state.myDeviceList[key],
      edit: true
    })
  }

  // 更新设备名称
  updateDeviceInfo = (values) =>{
    var data = {
      userID: window.localStorage.getItem("id"),
      deviceID: this.state.choose.deviceID,
      deviceName: values.deviceName
    }

    axios.defaults.baseURL = 'http://localhost:8989';
    axios.post('/device/updateDevice', data, { headers: { token: window.localStorage.getItem("token") }})
      .then(res=>{
          // 添加成功
          if(res.data.code === 200){
            message.success('修改成功');
          }
          else if(res.data.code === "50000"){
            // token无效则跳转到登录
            window.localStorage.clear()
            window.location.href = '/login'
          }
          else {
            message.error('修改失败')
          }
      });

    this.setState({
      edit: false
    })

    setTimeout(this.getUserDevice,1000)
  }

  // 删除设备
  delete = () => {
    for(var i=0; i<this.state.selectedRowKeys.length; i++){
      var device = this.state.myDeviceList[this.state.selectedRowKeys[i]]
      var data = {
        userID: window.localStorage.getItem("id"),
        deviceID: device.deviceID,
        deviceName: device.deviceName
      }

      axios.defaults.baseURL = 'http://localhost:8989';
      axios.post('/device/removeDevice', data, { headers: { token: window.localStorage.getItem("token") }})
      .then(res=>{
          // 添加成功
          if(res.data.code === 200){
            message.success('删除成功');
          }
          else if(res.data.code === 400){
            message.error('删除失败')
          }
          else if(res.data.code === "50000"){
            window.localStorage.clear()
            window.location.href = '/login'
          }
        });
    }

    setTimeout(this.getUserDevice,1000)
  };

  // 获取存在的设备id
  getDeviceList = () =>{
    axios.defaults.baseURL = 'http://localhost:8989';
    axios.get('/device/getAll', {
        headers:{token: window.localStorage.getItem("token") }
      }).then(res=>{
          if(res.data.code === 200){
            this.setState({
              deviceList: res.data.payload
            })
          } else if(res.data.code === "50000"){
            window.localStorage.clear()
            window.location.href = '/login'
          }
      });
  }

  // 获取用户拥有的设备
  getUserDevice = () => {
    axios.defaults.baseURL = 'http://localhost:8989';
    axios.get('/device/getDevices', {
        params: { userID: window.localStorage.getItem("id") },
        headers: {token: window.localStorage.getItem("token") }
      }).then(res=>{
          if(res.data.code === 200){
            var list = res.data.payload
            for(var i=0; i<list.length; i++){
              list[i].key = i;
            }

            this.setState({
              myDeviceList: list,
              selectedRowKeys: [],
            })
            
          } else if(res.data.code === "50000"){
            window.localStorage.clear()
            window.location.href = '/login'
          }
      });
  }

  // 选择设备
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };
  
  // 添加新设备
  onCreate = (values) => {
    values.userID = window.localStorage.getItem("id")

    this.setState({
      visible:false
    })

    axios.defaults.baseURL = 'http://localhost:8989';
    axios.post('/device/addNewDevice',values, { headers: { token: window.localStorage.getItem("token") }})
      .then(res=>{
          console.log(res)
          // 添加成功
          if(res.data.code === 200){
            message.success('添加成功');
          }
          else if(res.data.code === 400){
            message.info("不能重复添加同一个设备")
          }
          else if(res.data.code === "50000"){
            window.localStorage.clear()
            window.location.href = '/login' // 注销则跳转到登录
          }
      });

    setTimeout(this.getUserDevice,1000)
  };

  // 打开添加设备的Modal
  onClick = () => {
    this.getDeviceList()

    this.setState({
      visible:true
    })
  };

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <div style = {{paddingTop: 20}}>
        <div style={{ marginBottom: 16, textAlign:'left' }}>
          <Button type="primary" style={{marginRight:20}} onClick={this.onClick}> 添加新设备 </Button>
          <Button type="primary" onClick={this.delete} disabled={!hasSelected}> 删除 </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `已选中 ${selectedRowKeys.length} 个设备` : ''}
          </span>

          <Table style={{width:1000 }} rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.myDeviceList} />

          <Modal visible={this.state.visible} title="添加新设备" footer={null} onCancel={() => this.setState({ visible: false})}>
            <Form onFinish={this.onCreate}>
              <Form.Item
                name="deviceID"
                label="设备编号"
                rules={[
                  {
                    required: true,
                    message: '请选择设备!',
                  },
                ]}
              >
                <Select placeholder="请选择设备" style={{ width: 120 }} >
                  {this.state.deviceList.map((item) => (<Option value={item} key={item}>{item}</Option>))}
                </Select>
              </Form.Item>
              <Form.Item name="deviceName" label="设备名称"  rules={[
                  {
                    required: true,
                    message: '请输入设备名称!',
                  },
                ]}>
                <Input type="textarea" placeholder="请输入设备名称" />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" > 确认 </Button>
                  <Button onClick = {() => this.setState({ visible: false})}> 取消 </Button>
                </Space>
              </Form.Item>
            </Form>
          </Modal>
          <Modal visible={this.state.edit} title="修改设备信息" destroyOnClose={true} footer={null} onCancel={() => this.setState({edit: false})}>
            <Form onFinish={this.updateDeviceInfo}>
              <Form.Item
                name="deviceID"
                label="设备编号"
              >
                <Input disabled defaultValue={this.state.choose.deviceID}/>
              </Form.Item>
              <Form.Item name="deviceName" label="设备名称"  rules={[
                  {
                    required: true,
                    message: '请输入设备名称!',
                  },
                ]}>
                <Input type="textarea" placeholder="请输入设备名称" />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" > 确认 </Button>
                  <Button onClick = {() => this.setState({ edit: false})}> 取消 </Button>
                </Space>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    );
  }
}

export default MyDevice