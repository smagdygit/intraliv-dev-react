import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Semantic from '../../components/table/EmployeeTable';
import { Button, Header, Icon, Grid, Image, Form, Checkbox, GridColumn, Input, Label, Select } from 'semantic-ui-react';
import PersonEditModule from '../../test/EmployeeFilterModule';


const optionsSith = [
	{ key: 'null', text: 'Filtrera SITH Status', value: 'null' },
	{ key: 'Yes', text: 'Yes', value: 'Yes' },
	{ key: 'N Never', text: 'No', value: 'N Never' },
	{ key: 'To Install', text: 'To Install', value: 'To Install' },
	{ key: 'Ordered', text: 'Ordered', value: 'Ordered' },
	{ key: 'To Order', text: 'To Order', value: 'To Order' }
]
const optionsPolicyIt = [
	{ key: 'null', text: 'Filtrera IT Policy', value: 'null' },
	{ key: 'N Do', text: 'Ej Klar', value: 'N Do' },
	{ key: '210208A', text: '210208A', value: '210208A' },
	{ key: '210312A', text: '210312A', value: '210312A' },
]

const optionsGroup = [
	{ key: 'null', text: 'Filtrera Grupp', value: 'null' },
	{ key: '1', text: 'Grupp 1 🥇', value: '1' },
	{ key: '2', text: 'Grupp 2 🥈', value: '2' },
]


function ViewEmployees(props) {
	const [newPersonOpen, setNewPersonOpen] = useState(false);
	const [reloadTable, setReloadTable] = useState(0);
	const [filter, setFilter] = useState({ active: true, admin: false, education: false, east: false, lundby: false, angered: false, vh: false, backa: false, doorkey: false, text: '', sith: 'null', policy_it_signed: 'null', group: 'null' });
	const [newEmployeeWindow, setNewEmployeeWindow] = useState(false);
	const [resultCount, setResultCount] = useState(0);
	const [night, setNight] = useState(localStorage.getItem('night') === 'true' ? true : false);
	const [percentageFulltime, setPercentageFulltime] = useState(0);

	useEffect(() => {
		setNight(localStorage.getItem('night') === 'true' ? true : false);
	}, [localStorage.getItem('night')]);

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

	function updateResultCount(count, fulltime) {
		setResultCount(count);
		setPercentageFulltime(fulltime);
	}

	const headers = [['name', 'Namn', 8], ['active', 'Aktiv', 2], ['group', 'Grupp', 2], ['phone_id', 'Tele', 2], ['sith', 'SITH', 2],
	['location', 'Stadsdel', 2], ['id', 'ID', 2], ['care_id_2', 'Anst. ID', 3], ['policy_it_signed', 'IT Policy', 3], ['education', 'UTB', 2],
	['doorkey', 'Nyckel', 2], ['card', 'Foto', 2], ['driverslicense', 'Körkort', 2], ['comment', 'Kommentar', 12]];

	return (
		<div className="container-fluid center" style={{ width: "90%" }}>

			<div className="container-fluid center mt-5">
				<center>
					<Header as='h2'>
						<Icon name='user' />
						<Header.Content inverted={night}>Personal</Header.Content>
					</Header>
				</center>
			</div>
			{!newEmployeeWindow &&
				<div className="container-fluid center mb-5 mt-5 w-100 ml-0">
					<Grid>
						<Grid.Row className="p-1">
							<Grid.Column width={3}>
								<Header inverted={night} as="h1">Filtrera</Header>
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
								<p style={{color: night ? 'white' : ''}}>{resultCount} resultat</p>
								<p style={{color: night ? 'white' : ''}}>{percentageFulltime}% heltidsanställda</p>
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
									name='group'
									options={optionsGroup}
									fluid
									defaultValue={filter.group}
									onChange={(e, val) => handleSelectChange(e, 'group', val)}
								/>

							</Grid.Column>
						</Grid.Row>
						<Grid.Row className="p-1">
							<Grid.Column width={3}>
								<Checkbox
									toggle
									label="Aktiv"
									checked={filter.active}
									onChange={(e, data) => handleInputChange(e, data, 'active')}
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
									name='policy_it_signed'
									options={optionsPolicyIt}
									fluid
									defaultValue={filter.policy_it_signed}
									onChange={(e, val) => handleSelectChange(e, 'policy_it_signed', val)}
								/>

							</Grid.Column>
						</Grid.Row>
						<Grid.Row className="p-1">
							<Grid.Column width={3}>
								<Checkbox
									toggle
									label="Admin"
									checked={filter.admin}
									onChange={(e, data) => handleInputChange(e, data, 'admin')}
								/>
							</Grid.Column>
							<Grid.Column width={3}>
								<Checkbox
									toggle
									label="Västra Hisingen"
									checked={filter.vh}
									onChange={(e, data) => handleInputChange(e, data, 'vh')}
								/>
							</Grid.Column>
							<Grid.Column width={5}>
								<Select
									name='sith'
									options={optionsSith}
									fluid
									defaultValue={filter.sith}
									onChange={(e, val) => handleSelectChange(e, 'sith', val)}
								/>

							</Grid.Column>
						</Grid.Row>
						<Grid.Row className="p-1">
							<Grid.Column width={3}>
								<Checkbox
									toggle
									label="Utbildning"
									checked={filter.education}
									onChange={(e, data) => handleInputChange(e, data, 'education')}
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
								<Button negative fluid>Återställ</Button>

							</Grid.Column>
						</Grid.Row>
						<Grid.Row className="p-1">
							<Grid.Column width={3}>
								<Checkbox
									toggle
									label="Foto"
									checked={filter.card}
									onChange={(e, data) => handleInputChange(e, data, 'card')}
								/>
							</Grid.Column>
							<Grid.Column width={3}>
							</Grid.Column>
							<Grid.Column width={5}>
								<Button positive fluid onClick={event => handleAddPress(event)}>Lägg Till Ny Person</Button>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row className="p-1">
							<Grid.Column width={3}>
								<Checkbox
									toggle
									label="Nyckelbricka"
									checked={filter.doorkey}
									onChange={(e, data) => handleInputChange(e, data, 'doorkey')}
								/>
							</Grid.Column>
							<Grid.Column width={3}>
							</Grid.Column>
							<Grid.Column width={5}>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div >
			}
			{newEmployeeWindow &&
				<PersonEditModule
					className="p-5"
					data={{
						name: '', email: '', active: 1, phone_id: '', sith: 'N Never', policy_it_signed: 'N Do',
						admin: '', east: '', angered: '', lundby: '', vh: '',
						backa: '', education: '', doorkey: '', id: '',
						care_id_1: '', care_id_2: '', comment: '', group: '1'
					}}
					sendDataToParent={sendDataToParent} />
			}
			<div className="container-fluid center p-0">
				<Semantic key={reloadTable} data={{ headers: headers, filter: filter }} updateResultCount={updateResultCount}></Semantic>
			</div>
		</div >
	);
}

export default ViewEmployees;