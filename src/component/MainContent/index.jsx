import React from 'react'
import {Route, Switch,Redirect} from 'react-router-dom'

import DeviceRoute from "../../pages/map/index"
import Device from "../../pages/device/index"
import HomePage from "../../pages/home/index"

class MainContent extends React.Component {
	render() {
		return (
			<div>
				<Switch>
                    <Route path="/" exact render={() => <Redirect to="/home"/>}/>
					<Route exact path='/home' component={HomePage}/>
					<Route exact path='/home/map' component={DeviceRoute}/>
					<Route path='/home/device' component={Device}/>
				</Switch>
			</div>
		)
	}
}

export default MainContent