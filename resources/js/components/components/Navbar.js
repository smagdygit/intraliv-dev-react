import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from './UserContext';
import { Input, Menu, Divider } from 'semantic-ui-react'

function Navbar() {
	const [activeItem, setActiveItem] = useState('home');

	function handleItemClick(e, { name }) {
		setActiveItem(name);
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
						name='Personal'
						active={activeItem === 'home'}
						onClick={handleItemClick}
					/>
					<Menu.Item
						name='Telefoner'
						active={activeItem === 'messages'}
						onClick={handleItemClick}
					/>
					<Menu.Item
						name='Användare'
						active={activeItem === 'friends'}
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