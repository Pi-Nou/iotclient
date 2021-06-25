import React from 'react'
import * as echarts from 'echarts';
import axios from 'axios';

class AlertBar extends React.Component {
    componentDidMount(){     
        this.drawChart()
        setInterval(this.drawChart, 1000*30)
    }

    drawChart = () => {
        let dom = document.getElementById('alert');
        if (dom){
            var myChart = echarts.init(document.getElementById('alert'));
            axios.defaults.baseURL = 'http://localhost:8989';
            axios.get('/message/getAlertCount', {
                params: { userID: window.localStorage.getItem("id") },
                headers: {token: window.localStorage.getItem("token") }
                }).then(res=>{
                    if(res.data.code === 200){
                        let legend = []
                        let xAxis = []
                        let series = []
                        
                        for(var key in res.data.payload) {
                            if (key === "date"){
                                xAxis = res.data.payload[key]
                            }else{
                                legend.push(key)
                                series.push({
                                    name: key,
                                    type: 'bar',
                                    data: res.data.payload[key]
                                })
                            }
                        }

                        var option = {
                            legend: {data: legend},
                            tooltip: {},
                            xAxis: {data: xAxis},
                            yAxis: {},
                            series: series
                        };

                            myChart.setOption(option,true)
                        
                    } else if(res.data.code === "50000"){
                        window.localStorage.clear()
                        window.location.href = '/login'
                    }
                });
        }
    }
    
    render() {
        return(
            <div>
                <div style={{textAlign:"left", fontSize:26, marginLeft: "10%", marginTop: 20, marginBottom:5}}> 每日告警统计 </div>
                <div id="alert" style={{margin:"auto", width: "100%", height: 400 }} > </div>
            </div>
        )
    }
}

export default AlertBar