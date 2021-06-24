import React from 'react';
import {Map, NavigationControl, Polyline} from 'react-bmap'
import { Tag, Divider } from 'antd';
import axios from 'axios';

class DeviceRoute extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            colors: ['#f5222d', '#ff7a45','#ffec3d','#bae637','#40a9ff','#9254de'],
            deviceList: [],
            selectedTags: [],
            paths: {},
        }
    }

    componentDidMount(){
        this.getPosition()
        setInterval(this.getPosition, 1000*30)
    }

    getRoute = () =>{
        let paths = this.state.paths
        let devices = this.state.deviceList
        let elements = []

        for(let i=0; i<devices.length; i++){
            let color = this.state.colors[i]

            if(this.state.selectedTags.includes(devices[i])){
                elements.push(<Polyline strokeColor= {color} path={paths[devices[i]]} />);}
        }

        return elements
    }

    handleChange(tag) {
        const { selectedTags } = this.state;
        const nextSelectedTags = selectedTags.includes(tag) ? selectedTags.filter(t => t !== tag):[...selectedTags, tag];
        this.setState({ 
            selectedTags: nextSelectedTags 
        });
      }

    getTags = () =>{
        let elements=[];
        let selectedTags = this.state.selectedTags

        for(let i=0; i<this.state.deviceList.length; i++){
            let color = this.state.colors[i]
            let tag = this.state.deviceList[i]
            
            elements.push(
                <Tag key={tag} checked={selectedTags.indexOf(tag) > -1} color={color} style={{marginBottom:"8px"}}> 
                    <a onClick={() => this.handleChange(tag)}> {tag} </a>
                </Tag>);
        }
        return elements
    }

    getPosition = () => {
        axios.defaults.baseURL = 'http://localhost:8989';
        axios.get('/message/getPosition', {
            params: { userID: window.localStorage.getItem("id") },
            headers: {token: window.localStorage.getItem("token") }
            }).then(res=>{
                if(res.data.code === 200){
                    let paths = {}
                    let deviceList = []
                    let selectedTags = []

                    for(var key in res.data.payload){
                        let messages = res.data.payload[key]
                        deviceList.push(key)
                        selectedTags.push(key)
                        
                        var routes = []
                        for(var index=0; index < messages.length; index++){
                            routes.push({
                                lng: messages[index].lng,
                                lat: messages[index].lat,
                                alert: messages[index].alert
                            })
                        }
                        paths[key] = routes
                    }
                    this.setState({ 
                        paths: paths,
                        deviceList: deviceList,
                        selectedTags: selectedTags
                    })
    
                } else if(res.data.code === "50000"){
                    window.localStorage.clear()
                    window.location.href = '/login'
                }     
        });
    }

    render(){
        return(
            <div style={{display:"flex"}}>
                <div style={{"margin-left":"20px", width:"10%"}}>
                    <Divider orientation="left">设备列表</Divider>
                    <p> 点击标签可以隐藏/显示对应颜色的设备轨迹线 </p>
                    <div id="tags" style={{"margin-left":"20px"}}>
                        {this.getTags()}
                    </div>
                </div>
            
                <div id="map" style={{width:"80%", margin:"auto"}}>
                    <Map center={{lng: 120.402544, lat: 30.258216}} zoom="11" style={{height:700}}>
                        <NavigationControl /> 
                        {this.getRoute()}
                    </Map>
                </div>
            </div>
        )
    }
}

export default DeviceRoute