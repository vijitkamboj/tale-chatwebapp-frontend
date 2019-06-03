import React ,{Component} from 'react';
import './App.css';
import Nav from '../components/Nav/Nav'


class App extends Component {

	render(){
		document.body.className = "app-back"
		return(
			<div className="app">
				<Nav />
				<div id="app-cover"></div>
				<div id="app-intro"></div>
			</div>
		)

	}
}
export default App;
