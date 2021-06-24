import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import '../../assets/css/Menu.css';

import MainContent from "../MainContent/index";
import TopBar from '../Navigator/TopBar';

var storage = window.localStorage;

class MainPage extends Component {
	constructor(props) {
        super(props);
        this.state = {
            isLoggined:storage.hasOwnProperty("token"),
        };
    }

	render() {
		if (this.state.isLoggined){
			return (
				<div>
					<TopBar/>
					<MainContent/>
				</div>
			);
		}
		else {
			return <Redirect to = {{pathname:'/login'}}/>
		}
	}
}
export default MainPage;