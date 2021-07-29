import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from './UserContext';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Input, Menu, Divider } from 'semantic-ui-react';


function Navbar(props) {
	const [activeItem, setActiveItem] = useState('Personal');
	const { user, setUser } = useContext(UserContext);
	const userObject = JSON.parse(localStorage.getItem('user'));
	const [oldPathName, setOldPathName] = useState(window.location.pathname);
	const location = useLocation();

	const history = useHistory();

	useEffect(() => {
		if (window.location.pathname === '/' || window.location.pathname === '/undefined') {
			setActiveItem('/login');
		} else {
			setActiveItem(window.location.pathname);
		}
	}, [window.location.pathname, props.updateUrl, location])

	function handleItemClick(e, { name, url }) {
		setActiveItem(name);
		history.push(`${url}`);
	}

	function handleLogout(e, { name, url }) {
		setActiveItem(name);
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		history.push('/login');
	}

	return (
		<div>
			<div className="p-3 pl-5">
				<Menu secondary>
					<div className="d-flex justify-content-center mr-5" style={{}}>
						<h2 className="my-auto">
							Intraliv <pre>{JSON.stringify(user, 0, '.')}</pre>
						</h2>
					</div>
					<Menu.Item
						name='Hem'
						url='/data/dashboard'
						active={activeItem === '/data/dashboard'}
						onClick={handleItemClick}
					/>
					<Menu.Item
						name='Personal'
						url='/data/employees/view'
						active={activeItem === '/data/employees/view'}
						onClick={handleItemClick}
					/>
					<Menu.Item
						name='Kunder'
						url='/data/clients/view'
						active={activeItem === '/data/clients/view'}
						onClick={handleItemClick}
					/>
					<Menu.Item
						name='Telefoner'
						url='/data/phones/view'
						active={activeItem === '/data/phones/view'}
						onClick={handleItemClick}
					/>


					<Menu.Menu position='right'>
						<Menu.Item>
							<Input icon='search' placeholder='Search...' />
						</Menu.Item>
						{userObject !== null &&
							<>
								<Menu.Item
									name='Användare'
									url='/data/users/view'
									active={activeItem === '/data/users/view'}
									onClick={handleItemClick}
								/>{/*
								<Menu.Item
									name={userObject.name}
									active={activeItem === '/login'}
									onClick={handleItemClick}
								/>*/}
								<Menu.Item
									name='Logga Ut'
									active={activeItem === '/login'}
									onClick={handleLogout}
								/>
							</>
						}
						{userObject === null &&
							<Menu.Item
								name='Logga In'
								active={activeItem === '/login'}
								onClick={handleItemClick}
							/>
						}
					</Menu.Menu>
				</Menu>
			</div>
			<Divider className="mt-0" />
		</div>
	);
}

export default Navbar;