import React from 'react';

class BMap extends React.Component {
    componentDidMount(){
        var BMapGL = window.BMapGL//取出window中的BMap对象
        var BMapGLLib = window.BMapGLLib

        var bmap = new BMapGL.Map("allmap");                          // 创建Map实例
            bmap.centerAndZoom(new BMapGL.Point(116.297611, 40.047363), 17);    // 初始化地图，设置中心点坐标和地图级别
            bmap.enableScrollWheelZoom(true);                             // 开启鼠标滚轮缩放

            var path = [{
                'lng': 116.297611,
                'lat': 40.047363
            }, {
                'lng': 116.302839,
                'lat': 40.048219
            }, {
                'lng': 116.308301,
                'lat': 40.050566
            }, {
                'lng': 116.305732,
                'lat': 40.054957
            }, {
                'lng': 116.304754,
                'lat': 40.057953
            }, {
                'lng': 116.306487,
                'lat': 40.058312
            }, {
                'lng': 116.307223,
                'lat': 40.056379
            }];
            var point = [];
            for (var i = 0; i < path.length; i++) {
                point.push(new BMapGL.Point(path[i].lng, path[i].lat));
            }
            var pl = new BMapGL.Polyline(point);

            var trackAni = new BMapGLLib.TrackAnimation(bmap, pl, {
                overallView: true, // 动画完成后自动调整视野到总览
                tilt: 30,          // 轨迹播放的角度，默认为55
                duration: 20000,   // 动画持续时长，默认为10000，单位ms
                delay: 3000        // 动画开始的延迟，默认0，单位ms
            });

            setTimeout(trackAni.start,1000*10)
    }
    render() {
        return (
          <div id="allmap" style={{width:'100%',height:'100px'}} />
        )
      }
}

export default BMap