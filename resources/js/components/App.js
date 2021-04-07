import React, { useState, useContext, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './Login';
import LoggedIn from './LoggedIn';
import DataEmployeesView from './data/employees/view';
import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css'
import { UserContext } from './components/UserContext';

function App() {
	const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('user')) || null);
	const value = useMemo(() => ({ user, setUser }), [user, setUser]);
	return (
		<Router>
			<header  className="">
				<Navbar />
			</header>
			<div id="app">
				<Switch>
					<UserContext.Provider value={value}>
						<Route path="/login" component={Login} exact />
						<Route path="/loggedin" component={LoggedIn} exact />
						<Route path="/data/employees/view" component={DataEmployeesView} exact />
						{/*<Route component={Error} />*/}
					</UserContext.Provider>
				</Switch>
			</div>
		</Router>
	);
}

export default App;

if (document.getElementById('root')) {
	ReactDOM.render(<App />, document.getElementById('root'));
}