import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'semantic-ui-react'
import _ from 'lodash';
import SubTable from './EmployeeTable';



function Main() {
	const [fetching, setFetching] = useState(true);
	const [people, setPeople] = useState([
		{
			name: 'Laddar...', email: 'Laddar...', active: 'Laddar...', phone_id: 'Laddar...', sith: 'Laddar...',
			admin: 'Laddar...', east: 'Laddar...', angered: 'Laddar...', lundby: 'Laddar...', id: 'Laddar...',
			care_id_2: 'Laddar...', comment: 'Laddar...'
		},
	]);
	const [refresher, setRefresher] = useState(false);
	const [tableSize, setTableSize] = useState(2);



	useEffect(() => {
		fetch('/api/employees')
			.then(response => response.json())
			.then(data => {
				setFetching(false);
				setPeople([...data]);
			});
	}, [refresher]);

	function handleSizeChange(value) {
		setTableSize(value);
	}

	const headers = [['name', 'Namn', 8], ['mail', 'Mejl', 6], ['active', 'Aktiv', 2], ['phone_id', 'Tele', 2], ['sith', 'SITH', 2], ['admin', 'Adm.', 2], ['east', 'Östra', 2],
	['angered', 'Ang.', 2], ['lundby', 'Lund.', 2], ['id', 'ID', 2], ['care_id_2', 'Carefox ID', 3], ['policy_it_signed', 'IT Policy', 3], ['comment', 'Kommentar', 16]];

	return (
		<div className="mb-5">
			<Form float="left">
				<h3>Storlek</h3>
				<Button.Group>
					<Button active={tableSize === 0} onClick={() => handleSizeChange(0)}>Stor</Button>
					<Button active={tableSize === 1} onClick={() => handleSizeChange(1)}>Mellan</Button>
					<Button active={tableSize === 2} onClick={() => handleSizeChange(2)}>Kompakt</Button>
				</Button.Group>

			</Form>
			<Form>
				<h3>Sök...</h3>
				<Input
					icon={{ name: 'search', circular: true, link: true }}
					placeholder='Search...'
				/>
			</Form>
			<SubTable data={{ tableSize: tableSize, headers: headers }}/>
		</div>

	);
}

export default Main;