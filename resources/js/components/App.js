import React, { useState, useContext, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Link, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './Login';
import LoggedIn from './LoggedIn';
import Dashboard from './data/Dashboard';
import DataEmployeesView from './data/employees/view';
//import DataEmployeesView2 from './data/employees/view2';
import DataPhonesView from './data/phones/view';
import DataUsersView from './data/users/view';
import DataClientsView from './data/clients/view';
import Vehicles from './data/vehicles/view';
import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css'
import { UserContext } from './components/UserContext';
import { Image } from 'semantic-ui-react';
import { createBrowserHistory } from 'history';
import PrivateRoute from './PrivateRoute';

function App() {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
	const [url, setUrl] = useState(false);
	const userObject = JSON.parse(localStorage.getItem('user'));

	const value = useMemo(() => ({ user, setUser }), [user, setUser]);

	const Logo = React.forwardRef((props, ref) => (
		<p ref={ref} {...props}>
			<Image src="/livara_logga_0.png" size="small" alt="Livara Logga" />
		</p>
	))

	function setParentUrl() {
		//setUrl(!url);
	}

	return (
		<Router history={createBrowserHistory()}>
			<>
				<header className="">
					<Navbar updateUrl={setUrl}/>
				</header>
				<div id="app">

					<UserContext.Provider value={value}>
						<Switch>
							<Route path="/login" component={Login} exact />
							<Route path="/" component={Login} exact />
							<Route path="/undefined" component={Login} exact />
							<PrivateRoute path="/loggedin" component={LoggedIn} exact />
							<PrivateRoute path="/data/employees/view" component={DataEmployeesView} exact />
							<PrivateRoute path="/data/phones/view" component={DataPhonesView} exact />
							<PrivateRoute path="/data/users/view" component={DataUsersView} exact />
							<PrivateRoute path="/data/clients/view" component={DataClientsView} exact />
							<PrivateRoute path="/data/dashboard" component={Dashboard} exact updateParentUrl={setParentUrl}/>
							<PrivateRoute path="/login" component={Login} exact />
							<PrivateRoute path="/data/vehicles" component={Vehicles} exact />


							{/*<Route component={Error} />*/}
						</Switch>
					</UserContext.Provider>

					<footer style={{ backgroundColor: 'rgb(0, 0, 0, 0.9)', width: '' }} className="mt-5">
						<center className="p-4">
							<div className="w-25">
								<Link to={'/'}>
									<Image src="/livara_logga_0.png" size="small" alt="Livara Logga" />
								</Link>
							</div>
							<br />
							<div style={{ width: '50%', color: 'white' }} className="d-flex justify-content-center">
							</div>
							<br />
							<p className="text-white">Livara © 2021</p>
						</center>
					</footer>
				</div>
			</>
		</Router>
	);
}

export default App;

if (document.getElementById('root')) {
	ReactDOM.render(<App />, document.getElementById('root'));
}