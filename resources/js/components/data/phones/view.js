import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Semantic from '../../components/table/PhoneTable';
import { Button, Header, Icon, Grid, Image, Form, Checkbox, GridColumn, Input, Label, Select } from 'semantic-ui-react';
import PhoneEditModule from '../../test/PhoneFilterModule';


const optionsStatus = [
	{ key: 'null', text: 'Filtrera Telefon Status', value: 'null' },
	{ key: 'Usable', text: 'Användbar', value: 'Usable' },
	{ key: 'Need Checkup', text: 'Måste Undersökas', value: 'Need Checkup' },
	{ key: 'Does not Work', text: 'Fungerar Ej', value: 'Does not Work' },
	{ key: 'To Register', text: 'Ska Registreras', value: 'To Register' },
	{ key: 'To Install', text: 'Ska Installeras', value: 'To Install' },
	{ key: 'Waiting for Mail', text: 'Väntar på Post', value: 'Waiting for Mail' },
	{ key: 'Missing Case', text: 'Saknar Skal', value: 'Missing Case' }
]


function ViewPhones() {
	const [newPersonOpen, setNewPersonOpen] = useState(false);
	const [reloadTable, setReloadTable] = useState(0);
	const [filter, setFilter] = useState({ free: false, personal: false, phoniro_status: false, east: false, lundby: false, angered: false, vh: false, backa: false, text: '', status: 'null' });
	const [newEmployeeWindow, setNewEmployeeWindow] = useState(false);
	const [resultCount, setResultCount] = useState(0);

	useEffect(() => {
		//console.log(filter);
		return () => {

		}
	}, [filter]);

	function handleOpenNewPerson(event) {
		event.preventDefault();
		setNewPersonOpen(!newPersonOpen);
	}

	function sendDataToParent(item) {
		setNewPersonOpen(false);
		setReloadTable(reloadTable + 1);
		setNewEmployeeWindow(false);
	}

	function handleCheckboxChange() {

	}

	function handleAddPress() {
		setNewEmployeeWindow(true);
	}

	function handleInputChange(e, data, name, val) {
		if (val === undefined) {
			filter[name] = data.checked;
			setFilter({ ...filter });
		} else {
			filter[name] = val;
			setFilter({ ...filter });
		}
	}

	function handleInputChangeText(e, name) {
		filter[name] = e.target.value;
		setFilter({ ...filter });
	}

	function handleSelectChange(e, name, val) {
		filter[name] = val.value;
		setFilter({ ...filter });
	}

	function updateResultCount(count) {
		setResultCount(count);
	}

	const headers = [['name', 'Namn', 2], ['status', 'Status', 2], ['free', 'Ledig', 2], ['personal', 'Personlig', 2], ['location', 'Stadsdel', 4], ['phoniro_status', 'Phoniro Status', 4], ['employees', 'Användare', 6], ['comment', 'Kommentar', 14]];

	return (
		<div className="container-fluid center" style={{ width: "90%" }}>

			<div className="container-fluid center mt-5">
				<center>
					<Header as='h2'>
						<Icon name='phone' />
						<Header.Content>Telefoner</Header.Content>
					</Header>
				</center>
			</div>
			{!newEmployeeWindow &&
				<div className="container-fluid center mb-5 mt-5 w-100 ml-0">
					<Grid>
						<Grid.Row className="p-1">
							<Grid.Column width={3}>
								<Header as="h1">Filtrera</Header>
							</Grid.Column>
							<Grid.Column width={3}>
								<Checkbox
									toggle
									label="Östra"
									checked={filter.east}
									onChange={(e, data) => handleInputChange(e, data, 'east')}
								/>
							</Grid.Column>
							<Grid.Column width={5}>
								<Input
									name='name'
									fluid
									autoComplete="off"
									label='Sök Text'
									labelPosition='right'
									placeholder='Text'
									value={filter.text}
									onChange={e => handleInputChangeText(e, 'text')}
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row className="p-1">
							<Grid.Column width={3}>
								<p>{resultCount} resultat</p>
							</Grid.Column>
							<Grid.Column width={3}>
								<Checkbox
									toggle
									label="Lundby"
									checked={filter.lundby}
									onChange={(e, data) => handleInputChange(e, data, 'lundby')}
								/>
							</Grid.Column>
							<Grid.Column width={5}>
								<Select
									name='status'
									options={optionsStatus}
									fluid
									defaultValue={filter.status}
									onChange={(e, val) => handleSelectChange(e, 'status', val)}
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row className="p-1">
							<Grid.Column width={3}>
								<Checkbox
									toggle
									label="Ledig"
									checked={filter.free}
									onChange={(e, data) => handleInputChange(e, data, 'free')}
								/>
							</Grid.Column>
							<Grid.Column width={3}>
								<Checkbox
									toggle
									label="Angered"
									checked={filter.angered}
									onChange={(e, data) => handleInputChange(e, data, 'angered')}
								/>
							</Grid.Column>
							<Grid.Column width={5}>
								<Select
									disabled
									name='status'
									options={optionsStatus}
									fluid
									defaultValue={filter.status}
									onChange={(e, val) => handleSelectChange(e, 'status', val)}
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row className="p-1">
							<Grid.Column width={3}>
								<Checkbox
									toggle
									label="Personlig"
									checked={filter.personal}
									onChange={(e, data) => handleInputChange(e, data, 'personal')}
								/>
							</Grid.Column>
							<Grid.Column width={3}>
								<Checkbox
									toggle
									label="Västra Frölunda"
									checked={filter.vh}
									onChange={(e, data) => handleInputChange(e, data, 'vh')}
								/>
							</Grid.Column>
							<Grid.Column width={5}>
								<Button negative fluid>Återställ</Button>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row className="p-1">
							<Grid.Column width={3}>
								<Checkbox
									toggle
									label="Phoniro Status"
									checked={filter.phoniro_status}
									onChange={(e, data) => handleInputChange(e, data, 'phoniro_status')}
								/>
							</Grid.Column>
							<Grid.Column width={3}>
								<Checkbox
									toggle
									label="Backa"
									checked={filter.backa}
									onChange={(e, data) => handleInputChange(e, data, 'backa')}
								/>
							</Grid.Column>
							<Grid.Column width={5}>
								<Button positive fluid onClick={event => handleAddPress(event)}>Lägg Till Ny Telefon</Button>
							</Grid.Column>

						</Grid.Row>
					</Grid>
				</div >
			}
			{newEmployeeWindow &&
				<PhoneEditModule
					className="p-5"
					data={{
						name: '', free: '', personal: '', phoniro_status: 'No', id: '',
						east: '', angered: '', lundby: '', vh: '',
						backa: '', status: 'Usable', comment: '', employees: []
					}}
					sendDataToParent={sendDataToParent} />
			}
			<div className="container-fluid center p-0">
				<Semantic key={reloadTable} data={{ headers: headers, filter: filter }} updateResultCount={updateResultCount}></Semantic>
			</div>
		</div >
	);
}

export default ViewPhones;