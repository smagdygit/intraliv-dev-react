import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Semantic from '../../components/table/ClientTable';
import { Button, Header, Icon, Grid, Image, Form, Checkbox, GridColumn, Input, Label, Select } from 'semantic-ui-react';
import ClientEditModule from '../../components/table/ClientEditModule';


const optionsCareType = [
	{ key: 'null', text: 'Filtrera Vårdtyp', value: 'null' },
	{ key: 'old', text: 'Äldreomsorg', value: 'old' },
	{ key: 'young', text: 'Yngreomsorg', value: 'young' },
	{ key: 'disabled', text: 'Handikappsomsorg', value: 'disabled' },
]


function ViewClients() {
	const [newPersonOpen, setNewPersonOpen] = useState(false);
	const [reloadTable, setReloadTable] = useState(0);
	const [filter, setFilter] = useState({ text: '', care_type: 'null', east: false, lundby: false, angered: false, vh: false, backa: false });
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

	const headers = [['name', 'Namn', 2], ['care_type', 'Vårdtyp', 2], ['east', 'Östra', 2], ['lundby', 'Lundby', 2],
	['angered', 'Angered', 2], ['vh', 'V-H', 2], ['backa', 'Backa', 2], ['ssn', 'Personnummer', 4], ['address', 'Adress', 6], ['permitted_hours', 'Beviljade timmar', 2,],
	['comment', 'Kommentar', 14]];

	return (
		<div className="container-fluid center" style={{ width: "90%" }}>

			<div className="container-fluid center mt-5">
				<center>
					<Header as='h2'>
						<Icon name='universal access' />
						<Header.Content>Brukare</Header.Content>
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
									name='care_type'
									options={optionsCareType}
									fluid
									defaultValue={filter.care_type}
									onChange={(e, val) => handleSelectChange(e, 'care_type', val)}
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row className="p-1">
							<Grid.Column width={3}>
								
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
									name='care_type'
									options={optionsCareType}
									fluid
									defaultValue={filter.care_type}
									onChange={(e, val) => handleSelectChange(e, 'care_type', val)}
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row className="p-1">
							<Grid.Column width={3}>
								
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
								<Button positive fluid onClick={event => handleAddPress(event)}>Lägg Till Ny Brukare</Button>
							</Grid.Column>

						</Grid.Row>
					</Grid>
				</div >
			}
			{newEmployeeWindow &&
				<ClientEditModule
					className="p-5"
					data={{
						name: '', care_type: 'null', east: '', lundby: '',
						angered: '', vh: '', backa: '', ssn: '',
						address: '', permitted_hours: '', comment: '',
						id: '',
					}}
					sendDataToParent={sendDataToParent} />
			}
			<div className="container-fluid center p-0">
				<Semantic key={reloadTable} data={{ headers: headers, filter: filter }} updateResultCount={updateResultCount}></Semantic>
			</div>
		</div >
	);
}

export default ViewClients;