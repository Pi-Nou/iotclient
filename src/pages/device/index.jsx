import React from 'react'

import Sider from "./Sider"
import Content from "./Content"

class Device extends React.Component {
	render() {
		return (
			<div style={{display:"flex"}} >
                <Sider/>
                <Content />
			</div>
		)
	}
}

export default Device