import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Semantic from '../../components/table/PhoneTableAndFilter';
import { Button } from 'semantic-ui-react';
import PhoneEditModule from '../../components/table/PhoneEditModule';





function ViewPhones() {
	const [newPersonOpen, setNewPersonOpen] = useState(false);
	const [reloadTable, setReloadTable] = useState(0);

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
					<PhoneEditModule
					className="p-5"
					data={{
						name: '', email: '', active: '', phone_id: '', sith: '',
						admin: '', east: '', angered: '', lundby: '', id: '',
						care_id_1: '', care_id_2: '', comment: ''
					}}
					sendDataToParent={sendDataToParent}></PhoneEditModule>
				</div>
				}
			</div>
			<div className="container-fluid center">
				<Semantic key={reloadTable}></Semantic>
			</div>
		</div>
	);
}

export default ViewPhones;