import { indexOf } from 'lodash';
import React, { useState, useEffect, useContext } from 'react';
import { GiConsoleController, GiForwardField, GiFruitTree } from 'react-icons/gi';
import { useHistory, withRouter, Link, useParams } from 'react-router-dom';
import {
	Button,
	Form,
	Grid,
	Header,
	Image,
	Message,
	Segment,
	Input,
	Select,
	Icon,
	Loader,
	Dimmer,
	Divider,
	Modal,
	Checkbox,
	TextArea,
} from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import { moduleExpression } from '@babel/types';

const optionsSimStatus = [
	{ key: 'Osäker', text: 'Osäker', value: 'Osäker' },
	{ key: 'Finns Ej', text: 'Finns Ej', value: 'Finns Ej' },
	{ key: 'Finns Att Installera', text: 'Finns Att Installera', value: 'Finns Att Installera' },
	{ key: 'Installerad + PIN Avstängt', text: 'Installerad + PIN Avstängt', value: 'Installerad + PIN Avstängt' },
	{ key: 'Installerad + PIN Krävs', text: 'Installerad + PIN Krävs', value: 'Installerad + PIN Krävs' },
	{ key: 'Sim Dött', text: 'Sim Dött', value: 'Sim Dött' },
	{ key: 'Behövs Kontrolleras', text: 'Behövs Kontrolleras', value: 'Behövs Kontrolleras' },
];

const optionsUsable = [
	{ key: 'Osäker', text: 'Osäker', value: 'Osäker' },
	{ key: 'Ja', text: 'Ja', value: 'Ja' },
	{ key: 'Nej', text: 'Nej', value: 'Nej' },
	{ key: 'Halvt (se nedan)', text: 'Halvt (se nedan)', value: 'Halvt (se nedan)' },
];

const optionsInstalled = [
	{ key: 'Osäker', text: 'Osäker', value: 'Osäker' },
	{ key: 'Ej Installerad', text: 'Ej Installerad', value: 'Ej Installerad' },
	{ key: 'Miradore', text: 'Miradore', value: 'Miradore' },
	{ key: 'SimpleMDM', text: 'SimpleMDM', value: 'SimpleMDM' },
	{ key: 'Livara APPLE ID', text: 'Livara APPLE ID', value: 'Livara APPLE ID' },
	{ key: 'Personligt APPLE ID', text: 'Personligt APPLE ID', value: 'Personligt APPLE ID' },
];

const optionsHardware = [
	{ key: 'Osäker', text: 'Osäker', value: 'Osäker' },
	{ key: 'Fungerar', text: 'Fungerar', value: 'Fungerar' },
	{ key: 'Tactivo Fungerar Ej', text: 'Tactivo Fungerar Ej', value: 'Tactivo Fungerar Ej' },
	{ key: 'Övrigt (Kommentar)', text: 'Övrigt (Kommentar)', value: 'Övrigt (Kommentar)' },
];

const optionsPhoniro = [
	{ key: 'Osäker', text: 'Osäker', value: 'Osäker' },
	{ key: 'Ej Upplagd', text: 'Ej Upplagd', value: 'Ej Upplagd' },
	{ key: 'Upplagd utan Stadsdel', text: 'Upplagd utan Stadsdel', value: 'Upplagd utan Stadsdel' },
	{ key: 'Upplagd med Stadsdel', text: 'Upplagd med Stadsdel', value: 'Upplagd med Stadsdel' },
];

const optionsHomeCity = [
	{ key: 'Osäker', text: 'Osäker', value: 'Osäker' },
	{ key: 'Lundby', text: 'Lundby', value: 'Lundby' },
	{ key: 'Östra', text: 'Östra', value: 'Östra' },
	{ key: 'Angered', text: 'Angered', value: 'Angered' },
	{ key: 'Backa', text: 'Backa', value: 'Backa' },
	{ key: 'V-H', text: 'V-H', value: 'V-H' },
];

const optionsHomePhysical = [
	{ key: 'Osäker', text: 'Osäker', value: 'Osäker' },
	{ key: 'Ledig (Sysadmin)', text: 'Ledig (Sysadmin)', value: 'Ledig (Sysadmin)' },
	{ key: 'Lundby', text: 'Lundby', value: 'Lundby' },
	{ key: 'Kortedala', text: 'Kortedala', value: 'Kortedala' },
	{ key: 'Personlig Telefon', text: 'Personlig Telefon', value: 'Personlig Telefon' },
];

function HandoverPopup(props) {
	const userObject = JSON.parse(localStorage.getItem('user'));
	const history = useHistory();
	//Gather person information from parent, and convert date variables to be JS friendly
	const [form, setForm] = useState({
		...props.person,
	});
	const [errorForm, setErrorForm] = useState(createErrorObject());
	const [isUploading, setIsUploading] = useState(false);

	function createErrorObject() {
		const reply = {};
		Object.entries(props.person).forEach(([key, value]) => { reply[key] = false });
		return reply;
	}

	/*function checkForErrors() {
		if (form.name.length === 0) errorForm.name = true;

		if (errorForm.name = true) return true; else return false;
	}*/

	function sendStaffUpdate() {

		//Loop through form and check for errors, if any are found cancel upload
		if (form.name.length > 0) {

			//Set form to uploading status
			setIsUploading(true);

			//Determine wether to send an update to an existing staff (PUT) or create a new staff (POST)
			const postMethod = props.person.id === undefined ? 'POST' : 'PUT';

			//Send the data to the API
			fetch('/api/mobiles', {
				method: postMethod,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': userObject.token,
				},
				//Include form information and encode date variables to be PHP friendly
				body: JSON.stringify({
					...form,
				}),
			})
				.then(response => response.json())
				.then(data => {
					if (data.status === 'ok') {

						//Upload to API OK
						setIsUploading(false);
						props.sent();

					} else {

						//Upload to API NOT OK, show error
						setIsUploading(false);
						alert(data.text);

					}
				});
		}
	}

	return (
		<Modal
			size="large"
			onClose={props.canceled}
			open={true}
		>
			<Dimmer active={isUploading}>
				<Loader size="huge" content="Skickar data..." />
			</Dimmer>
			<Modal.Header>{props.name}</Modal.Header>
			<Modal.Content image>
				<Modal.Description>
					<Grid style={{ width: '1150px' }}>
						<Grid.Row>
							<Grid.Column width={3}>
							</Grid.Column>
							<Grid.Column width={1}>
							</Grid.Column>
							<Grid.Column width={12}>
								<Grid className="m-0">
									<Grid.Row className="pb-0">
										<Grid.Column width={16}>
											<h1>Grundläggande Information</h1>
											<Divider className="mb-0" />
										</Grid.Column>
									</Grid.Row>
									<Grid.Row>
										<Grid.Column width={6} className="pr-0">
											<Form>
												<Form.Input
													fluid
													error={form.name.length < 1}
													name="name"
													label="Namn"
													placeholder="WPXX"
													value={form.name}
													onChange={e => setForm({ ...form, name: e.target.value })}
												/>
											</Form>
										</Grid.Column>
										<Grid.Column width={6} className="pr-0">
											<Form>
												<Form.Input
													fluid
													name="Model"
													label="Model"
													placeholder="iPhone 6s"
													value={form.model}
													onChange={e => setForm({ ...form, model: e.target.value })}
												/>
											</Form>
										</Grid.Column>
										<Grid.Column width={4} className="pr-0">
											<Form>
												<Form.Input
													fluid
													name="WP"
													label="WP Nummer"
													placeholder="XX"
													value={form.wp}
													onChange={e => setForm({ ...form, wp: e.target.value })}
												/>
											</Form>
										</Grid.Column>
									</Grid.Row>
									<Grid.Row className="pb-0">
										<Grid.Column width={16}>
											<h1>Sim Kort</h1>
											<Divider className="mb-0" />
										</Grid.Column>
									</Grid.Row>
									<Grid.Row>
										<Grid.Column width={6} className="pr-0">
											<Form>
												<Form.Dropdown
													fluid
													selection
													name='Sim Status'
													label='Sim Status'
													options={optionsSimStatus}
													value={form.sim_status}
													onChange={(e, val) => setForm({ ...form, sim_status: val.value })}
												/>
											</Form>
										</Grid.Column>
										<Grid.Column width={6} className="pr-0">
											<Form>
												<Form.Input
													fluid
													name="Telefonnummer"
													label="Telefonnummer"
													placeholder="07XX XXXX XX"
													value={form.sim_number}
													onChange={e => setForm({ ...form, sim_number: e.target.value })}
												/>
											</Form>
										</Grid.Column>
										<Grid.Column width={4} className="pr-0">
											<Form>
												<Form.Input
													fluid
													name="Sim PIN"
													label="Sim PIN"
													placeholder="XXXX"
													value={form.sim_code}
													onChange={e => setForm({ ...form, sim_code: e.target.value })}
												/>
											</Form>
										</Grid.Column>
									</Grid.Row>
									<Grid.Row className="pb-0">
										<Grid.Column width={16}>
											<h1>Teknisk Information</h1>
											<Divider className="mb-0" />
										</Grid.Column>
									</Grid.Row>
									<Grid.Row>
										<Grid.Column width={6} className="pr-0">
											<Form>
												<Form.Dropdown
													fluid
													selection
													name='Användbar'
													label='Användbar'
													options={optionsUsable}
													value={form.usable}
													onChange={(e, val) => setForm({ ...form, usable: val.value })}
												/>
											</Form>
										</Grid.Column>
										<Grid.Column width={6} className="pr-0">
											<Form>
												<Form.Dropdown
													fluid
													selection
													name='Installerad'
													label='Installerad'
													options={optionsInstalled}
													value={form.installed}
													onChange={(e, val) => setForm({ ...form, installed: val.value })}
												/>
											</Form>
										</Grid.Column>
										<Grid.Column width={4} className="pr-0">
											<Form>
												<Form.Dropdown
													fluid
													selection
													name='Hardware'
													label='Hardware'
													options={optionsHardware}
													value={form.hardware}
													onChange={(e, val) => setForm({ ...form, hardware: val.value })}
												/>
											</Form>
										</Grid.Column>
									</Grid.Row>
									<Grid.Row>
										<Grid.Column width={6} className="pr-0">
											<Form>
												<Form.Dropdown
													fluid
													selection
													name='Phoniro'
													label='Phoniro'
													options={optionsPhoniro}
													value={form.phoniro_status}
													onChange={(e, val) => setForm({ ...form, phoniro_status: val.value })}
												/>
											</Form>
										</Grid.Column>
										<Grid.Column width={6} className="pr-0">
											<Form>
												<Form.Dropdown
													fluid
													selection
													name='Phoniro Hem'
													label='Phoniro Hem'
													options={optionsHomeCity}
													value={form.phoniro_home_area}
													onChange={(e, val) => setForm({ ...form, phoniro_home_area: val.value })}
												/>
											</Form>
										</Grid.Column>
										<Grid.Column width={4} className="pr-0">
											<Form>
												<Form.Dropdown
													fluid
													selection
													name='Används i'
													label='Används i'
													options={optionsHomeCity}
													value={form.actual_home_area}
													onChange={(e, val) => setForm({ ...form, actual_home_area: val.value })}
												/>
											</Form>
										</Grid.Column>
									</Grid.Row>
									<Grid.Row className="pb-0">
										<Grid.Column width={16}>
											<h1>Övrigt</h1>
											<Divider className="mb-0" />
										</Grid.Column>
									</Grid.Row>
									<Grid.Row>
										<Grid.Column width={8} className="pr-0">
											<Form>
												<Form.Dropdown
													fluid
													selection
													name='Tillhör'
													label='Tillhör'
													options={optionsHomePhysical}
													value={form.belongs_to}
													onChange={(e, val) => setForm({ ...form, belongs_to: val.value })}
												/>
											</Form>
										</Grid.Column>
										<Grid.Column width={8} className="pr-0">
											<Form>
												<Form.Dropdown
													fluid
													selection
													name='Finns i'
													label='Finns i'
													options={optionsHomePhysical}
													value={form.location}
													onChange={(e, val) => setForm({ ...form, location: val.value })}
												/>
											</Form>
										</Grid.Column>
									</Grid.Row>
									<Grid.Row className="pb-0">
										<Grid.Column width={16}>
											<Form>
												<Form.TextArea
													style={{ width: '100%', height: '100%' }}
													rows={6}
													name="Kommentar"
													label="Kommentar"
													placeholder="Kommentarer.."
													value={form.comment}
													onChange={e => setForm({ ...form, comment: e.target.value })}
												/>
											</Form>
										</Grid.Column>
									</Grid.Row>
								</Grid>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				<Button
					color='red'
					onClick={props.canceled}
				>
					Avbryt
				</Button>
				<Button
					content="Skicka in"
					labelPosition='right'
					icon='checkmark'
					positive
					onClick={sendStaffUpdate}
				/>
			</Modal.Actions>
		</Modal >
	);
}

export default HandoverPopup;