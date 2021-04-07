import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from './UserContext';
import { Link, useHistory } from 'react-router-dom';
import { Input, Menu, Divider } from 'semantic-ui-react'

function Navbar() {
	const [activeItem, setActiveItem] = useState('Personal');

	const history = useHistory();

	function handleItemClick(e, { name, url }) {
		setActiveItem(name);
		history.push(`${url}`);
	}

	return (
		<div>
			<div className="p-3 pl-5">
				<Menu secondary>
					<div className="d-flex justify-content-center mr-5" style={{}}>
						<h2 className="my-auto">
							Intraliv
						</h2>
					</div>
					<Menu.Item
						name='Dashboard'
						url='/data/dashboard'
						active={activeItem === 'Dashboard'}
						onClick={handleItemClick}
					/>
					<Menu.Item
						name='Personal'
						url='/data/employees/view'
						active={activeItem === 'Personal'}
						onClick={handleItemClick}
					/>
					<Menu.Item
						name='Telefoner'
						url='/data/phones/view'
						active={activeItem === 'Telefoner'}
						onClick={handleItemClick}
					/>
					<Menu.Item
						name='Användare'
						url='/data/users/view'
						active={activeItem === 'Användare'}
						onClick={handleItemClick}
					/>
					<Menu.Menu position='right'>
						<Menu.Item>
							<Input icon='search' placeholder='Search...' />
						</Menu.Item>
						<Menu.Item
							name='Logga Ut'
							active={activeItem === 'logout'}
							onClick={handleItemClick}
						/>
					</Menu.Menu>
				</Menu>
			</div>
			<Divider className="mt-0" />
		</div>
	);
}

export default Navbar;