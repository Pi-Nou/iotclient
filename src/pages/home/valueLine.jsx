import React from 'react'
import * as echarts from 'echarts';
import axios from 'axios';

class ValueLine extends React.Component {
    componentDidMount(){        
        this.drawChart()
        setInterval(this.drawChart, 1000*30)
    }

    drawChart = () => {
        let dom = document.getElementById('value');
        if (dom) {
            var myChart = echarts.init(document.getElementById('value'));
            axios.defaults.baseURL = 'http://localhost:8989';
            axios.get('/message/getValue', {
                params: { userID: window.localStorage.getItem("id") },
                headers: {token: window.localStorage.getItem("token") }
                }).then(res=>{
                    if(res.data.code === 200){
                        let legend = []
                        let series = []

                        for(var key in res.data.payload) {
                            legend.push(key)
                            series.push({
                                name: key,
                                type: 'line',
                                data: res.data.payload[key]
                            })
                        }

                        var option = {
                                tooltip : { trigger: "axis",},
                                toolbox : {},
                                dataZoom: [
                                    {
                                        show: true,
                                        realtime: true,
                                        start: 90,
                                        end: 100,
                                        xAxisIndex: [0, 1]
                                    },
                                ],
                                legend: {data: legend},
                                calculable : true,
                                xAxis: [ { 
                                    type:"time",
                                    axisLabel :{
                                        formatter: function (value){
                                            var D = new Date(value);
                                            var year = D.getFullYear();
                                            var month = D.getMonth()+1;
                                            month = month<10?('0'+month):month;
                                            var day = D.getDate();
                                            day = day<10?('0'+day):day;
                                            var hours = D.getHours();
                                            hours = hours<10?('0'+hours):hours;
                                            var minutes = D.getMinutes();
                                            minutes = minutes<10?('0'+minutes):minutes;
                                            var seconds = D.getSeconds();
                                            seconds = seconds<10?('0'+seconds):seconds;
                                        
                                            let now_time = year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds;

                                            return now_time }
                                        }
                                }],
                                yAxis: [ { type: "value", } ],
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
                <div style={{textAlign:"left", fontSize:26, marginLeft: "10%", marginTop: 20, marginBottom:5}}> 消息值统计 </div>
                <div id="value" style={{margin:"auto", width: "100%", height: 400 }} > </div>
            </div>
        )
    }
}

export default ValueLine