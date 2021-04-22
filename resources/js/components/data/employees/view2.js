import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Semantic from '../../components/table/EmployeeTable';
import { Button, Header, Icon, Grid, Image, Form, Checkbox, GridColumn, Input } from 'semantic-ui-react';
import PersonEditModule from '../../components/table/EmployeeEditModule';





function ViewEmployees2() {
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

	function handleCheckboxChange() {

	}

	function handleInputChange() {

	}

	const headers = [['name', 'Namn', 8], ['mail', 'Mejl', 6], ['active', 'Aktiv', 2], ['phone_id', 'Tele', 2], ['sith', 'SITH', 2], ['admin', 'Adm.', 2], ['east', 'Östra', 2],
	['angered', 'Ang.', 2], ['lundby', 'Lund.', 2], ['id', 'ID', 2], ['care_id_2', 'Carefox ID', 3], ['policy_it_signed', 'IT Policy', 3], ['comment', 'Kommentar', 16]];

	return (
		<div className="container-fluid center" style={{ width: "90%" }}>

			<div className="container-fluid center mt-5">
				<center>
					<Header as='h2'>
						<Icon name='user' />
						<Header.Content>Personal</Header.Content>
					</Header>
				</center>
			</div>
			<div className="container-fluid center mb-3 mt-5 w-75">
				<Grid>
					<Grid.Row className="p-0">
						<Grid.Column width={5}>
							<Checkbox
								toggle
								label="Aktiv"
							/>
						</Grid.Column>
						<Grid.Column width={5}>
							<Input
								name='name'
								fluid
								label='Sök Text'
								placeholder='Text'
								value={1}
								onChange={e => handleInputChange(e)}
							/>
						</Grid.Column>
						<Grid.Column width={5}>
							<Input
								name='name'
								fluid
								label='SITH'
								placeholder='Text'
								value={1}
								onChange={e => handleInputChange(e)}
							/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row className="p-0">
						<Grid.Column width={1}>
							<Checkbox
								toggle
								label="Admin"
							/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row className="p-0">
						<Checkbox
							toggle
							label="Östra"
						/>
					</Grid.Row>
				</Grid>
			</div>
			<div className="container-fluid center">
				<Semantic key={reloadTable} data={{ headers: headers }}></Semantic>
			</div>
		</div>
	);
}

export default ViewEmployees2;