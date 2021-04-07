import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Semantic from './components/TablePeopleSemantic';
import { Button } from 'semantic-ui-react';
import PersonEditModule from './components/PersonEditModule';





function ViewEmployees() {
	const [newPersonOpen, setNewPersonOpen] = useState(false);
	const [reloadTable, setReloadTable] = useState(0);

	useEffect(() => {
		console.log('SemPEffect');
		return () => {
			console.log('semp bye bye');
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
					<PersonEditModule
					className="p-5"
					data={{
						name: '', email: '', active: '', phone: '', sith: '',
						admin: '', east: '', angered: '', lundby: '', id: '',
						care_id_1: '', care_id_2: '', comment: ''
					}}
					sendDataToParent={sendDataToParent}></PersonEditModule>
				</div>
				}
			</div>
			<div className="container-fluid center">
				<center>
					<Semantic key={reloadTable}></Semantic>
				</center>
			</div>
		</div>
	);
}

export default ViewEmployees;