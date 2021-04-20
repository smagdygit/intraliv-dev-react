import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Semantic from '../../components/table/UserTableAndFilter';
import { Button } from 'semantic-ui-react';
import UserEditModule from '../../components/table/UserEditModule';
import { UserContext } from '../../components/UserContext';




function ViewUsers() {
	const [newPersonOpen, setNewPersonOpen] = useState(false);
	const [reloadTable, setReloadTable] = useState(0);
	//const { user, setUser } = useContext(UserContext);

	useEffect(() => {

		return () => {

		}
	}, []);

	function handleOpenNewPerson(event) {
		event.preventDefault();
		setNewPersonOpen(!newPersonOpen);
	}

	function sendDataToParent(item) {
		setNewPersonOpen(false);
		setReloadTable(reloadTable + 1);
	}

	return (
		<div className="container-fluid center" style={{ width: "90%" }}>

			<div className="container-fluid center mt-5">
				<center>
					<h1>Livara Personal</h1>
				</center>
			</div>
			<div className="container-fluid center mb-3 mt-5">
				<center>
					<Button type='submit' className="w-100" onClick={event => handleOpenNewPerson(event)}>{!newPersonOpen ? 'Lägg Till Ny Personal' : 'Stäng Ny Personal Ruta'}</Button>
				</center>
				{newPersonOpen &&
					<div className="p-5">
						<UserEditModule
							data={{
								name: '',
								email: '',
								password: '',
								admin: 0,
								id: '',
							}}
							className="m-5"
							sendDataToParent={sendDataToParent}>

						</UserEditModule>
					</div>
				}
			</div>
			<div className="container-fluid center">
				<Semantic key={reloadTable}></Semantic>
			</div>
		</div>
	);
}

export default ViewUsers;