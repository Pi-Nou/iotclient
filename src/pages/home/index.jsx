import React from 'react'

import Statistics from "./statistics"
import MessageBar from "./messageBar"
import AlertBar from "./alertBar"
import ValueLine from "./valueLine"

class HomePage extends React.Component {

    render() {
        return(
            <div>
                <Statistics />
                <MessageBar />
                <AlertBar />
                <ValueLine />
            </div>
        )
    }
}

export default HomePage