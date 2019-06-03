import React ,{Component} from 'react';
import './App.css';


class App extends Component {

	render(){
		document.body.className = "app-back"
		return(
			<div class="app">
				<div id="app-cover"></div>
				<div id="app-intro"></div>
			</div>
		)

	}
}
export default App;
