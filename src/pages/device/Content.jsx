import React from 'react'
import {Route, Switch} from 'react-router-dom'

import MyDevice from "./MyDevice"
import DeviceData from "./DeviceData"

class MainContent extends React.Component {
	render() {
		return (
			<div>
				<Switch>
					<Route exact path='/home/device' component={ DeviceData }/>
					<Route exact path='/home/device/myDevice' component={ MyDevice }/>
				</Switch>
			</div>
		)
	}
}

export default MainContent