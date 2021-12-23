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

const optionsIT = [
	{ key: 'Osäker', text: 'Osäker', value: 'Osäker' },
	{ key: 'Ska Skriva', text: 'Ska Skriva', value: 'Ska Skriva' },
	{ key: 'Ska EJ Skriva', text: 'Ska EJ Skriva', value: 'Ska EJ Skriva' },
	{ key: 'Påskrivet', text: 'Påskrivet', value: 'Påskrivet' },
];

const optionsDriving = [
	{ key: 'Osäker', text: 'Osäker', value: 'Osäker' },
	{ key: 'Inget Körkort', text: 'Inget Körkort', value: 'Inget Körkort' },
	{ key: 'Manuellt Körkort', text: 'Manuellt Körkort', value: 'Manuellt Körkort' },
	{ key: 'Automat Körkort', text: 'Automat Körkort', value: 'Automat Körkort' },
];

const optionsGroup = [
	{ key: 'Osäker', text: 'Osäker', value: 'Osäker' },
	{ key: 1, text: 'Grupp 1', value: 1 },
	{ key: 2, text: 'Grupp 2', value: 2 },
];

const optionsEmployment = [
	{ key: 'Osäker', text: 'Osäker', value: 'Osäker' },
	{ key: 'Övrig', text: 'Övrig', value: 'Övrig' },
	{ key: 'Timanställd', text: 'Timanställd', value: 'Timanställd' },
	{ key: 'Vikarie', text: 'Vikarie', value: 'Vikarie' },
	{ key: 'Provanställd', text: 'Provanställd', value: 'Provanställd' },
	{ key: 'Tillsvidare', text: 'Tillsvidare', value: 'Tillsvidare' },
];

const optionsHome = [
	{ key: 'Osäker', text: 'Osäker', value: 'Osäker' },
	{ key: 'Lundby', text: 'Lundby', value: 'Lundby' },
	{ key: 'Östra', text: 'Östra', value: 'Östra' },
	{ key: 'Angered', text: 'Angered', value: 'Angered' },
	{ key: 'Backa', text: 'Backa', value: 'Backa' },
	{ key: 'V-H', text: 'V-H', value: 'V-H' },
];

const optionsCard = [
	{ key: 'Osäker', text: 'Osäker', value: 'Osäker' },
	{ key: 'Ska EJ Ha Kort', text: 'Ska EJ Ha Kort', value: 'Ska EJ Ha Kort' },
	{ key: 'Behövs Foto', text: 'Behövs Foto', value: 'Behövs Foto' },
	{ key: 'Behövs Beställas', text: 'Behövs Beställas', value: 'Behövs Beställas' },
	{ key: 'Finns Redo', text: 'Finns Redo', value: 'Finns Redo' },
	{ key: 'Har Kort', text: 'Har Kort', value: 'Har Kort' },
];

const optionsPhone = [
	{ key: 'Osäker', text: 'Osäker', value: 'Osäker' },
	{ key: 'Nej', text: 'Nej', value: 'Nej' },
	{ key: 'Ska Ha Tele.', text: 'Ska Ha Tele', value: 'Ska Ha Tele' },
	{ key: 'Fungerar', text: 'Fungerar', value: 'Fungerar' },
	{ key: 'Fungerar EJ', text: 'Fungerar EJ', value: 'Fungerar EJ' },
	{ key: 'På Lagning', text: 'På Lagning', value: 'På Lagning' },
];

const optionsSith = [
	{ key: 'Osäker', text: 'Osäker', value: 'Osäker' },
	{ key: 'Nej', text: 'Nej', value: 'Nej' },
	{ key: 'Ja', text: 'Ja', value: 'Ja' },
	{ key: 'Utelåst mm.', text: 'Utelåst mm.', value: 'Utelåst mm.' },
	{ key: 'Behövs Beställas', text: 'Behövs Beställas', value: 'Behövs Beställas' },
	{ key: 'På Ingång', text: 'På Ingång', value: 'På Ingång' },
	{ key: 'Kan Bokas', text: 'Kan Bokas', value: 'Kan Bokas' },
	{ key: 'Att Avbeställa', text: 'Att Avbeställa', value: 'Att Avbeställa' },
];

function Staff(props) {
	const userObject = JSON.parse(localStorage.getItem('user'));
	const history = useHistory();
	//Gather person information from parent, and convert date variables to be JS friendly
	const [form, setForm] = useState({
		...props.person,
		delegation: props.person.delegation ? new Date(props.person.delegation) : null,
		employment_expiry: props.person.employment_expiry ? new Date(props.person.employment_expiry) : null,
	});
	const [errorForm, setErrorForm] = useState(createErrorObject());
	const [isUploading, setIsUploading] = useState(false);
	const [isLoadingMobiles, setIsLoadingMobiles] = useState(true);
	const [optionsPhoneId, setOptionsPhoneId] = useState([]);

	useEffect(() => {
		fetch(`/api/mobiles`, {
			method: 'GET',
			headers: {
				'Authorization': userObject.token,
			}
		})
			.then(response => response.json())
			.then(data => {
				setOptionsPhoneId(data.mobiles.map((mobile) => {
					return ({ key: mobile.id, text: mobile.name, value: mobile.id });
				}));
				setIsLoadingMobiles(false);
			});
	}, []);

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
			fetch('/api/staff', {
				method: postMethod,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': userObject.token,
				},
				//Include form information and encode date variables to be PHP friendly
				body: JSON.stringify({
					...form,
					delegation: form.delegation ? form.delegation.toISOString().split('T')[0] : null,
					employment_expiry: form.employment_expiry ? form.employment_expiry.toISOString().split('T')[0] : null,
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
								<Form.Field
									className="p-2"
									control={Checkbox}
									toggle
									label='Aktiv'
									name='active'
									checked={form.active}
									onChange={e => setForm({ ...form, active: !form.active })}
								/>
								<Form.Field
									className="p-2"
									control={Checkbox}
									toggle
									label='Admin'
									name='admin'
									checked={form.admin}
									onChange={e => setForm({ ...form, admin: !form.admin })}
								/>
								<Form.Field
									className="p-2"
									control={Checkbox}
									toggle
									label='Utbildning'
									name='education'
									checked={form.education}
									onChange={e => setForm({ ...form, education: !form.education })}
								/>
								<Form.Field
									className="p-2"
									control={Checkbox}
									toggle
									label='Nyckelbricka'
									name='doorkey'
									checked={form.door_key}
									onChange={e => setForm({ ...form, door_key: !form.door_key })}
								/>
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
													label="Fullt Namn"
													placeholder="Fullt Namn"
													value={form.name}
													onChange={e => setForm({ ...form, name: e.target.value })}
												/>
											</Form>
										</Grid.Column>
										<Grid.Column width={6} className="pr-0">
											<Form>
												<Form.Input
													fluid
													name="name"
													label="Mejl"
													placeholder="föreft@livara.se"
													value={form.email}
													onChange={e => setForm({ ...form, email: e.target.value })}
												/>
											</Form>
										</Grid.Column>
										<Grid.Column width={4} className="pr-0">
											<Form>
												<Form.Input
													fluid
													name="name"
													label="Anst. ID"
													placeholder="XX"
													value={form.staff_number}
													onChange={e => setForm({ ...form, staff_number: e.target.value })}
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
													name='IT Policy'
													label='IT Policy'
													options={optionsIT}
													value={form.it_policy}
													onChange={(e, val) => setForm({ ...form, it_policy: val.value })}
												/>
											</Form>
										</Grid.Column>
										<Grid.Column width={6} className="pr-0">
											<Form>
												<Form.Dropdown
													fluid
													selection
													name='Körkort'
													label='Körkort'
													options={optionsDriving}
													value={form.drivers_license}
													onChange={(e, val) => setForm({ ...form, drivers_license: val.value })}
												/>
											</Form>
										</Grid.Column>
										<Grid.Column width={4} className="pr-0">
											<Form>
												<Form.Dropdown
													fluid
													selection
													name='Grupp'
													label='Grupp'
													options={optionsGroup}
													value={form.group}
													onChange={(e, val) => setForm({ ...form, group: val.value })}
												/>
											</Form>
										</Grid.Column>
									</Grid.Row>
									<Grid.Row className="pb-0">
										<Grid.Column width={16}>
											<h1>Anställning</h1>
											<Divider className="mb-0" />
										</Grid.Column>
									</Grid.Row>
									<Grid.Row>
										<Grid.Column width={6} className="pr-0">
											<Form>
												<Form.Input
													fluid
													name="name"
													label="Carefox ID"
													placeholder="XXXXXX"
													value={form.carefox_id}
													onChange={e => setForm({ ...form, carefox_id: e.target.value })}
												/>
											</Form>
										</Grid.Column>
										<Grid.Column width={6} className="pr-0">
											<Form>
												<Form.Dropdown
													fluid
													selection
													name='Anställningstyp'
													label='Anställningstyp'
													options={optionsEmployment}
													value={form.employment_type}
													onChange={(e, val) => setForm({ ...form, employment_type: val.value })}
												/>
											</Form>
										</Grid.Column>
										<Grid.Column width={3} className="pr-0">
											<Form>
												<Form.Field>
													<label>Anst. Utgår</label>
													<DatePicker
														id="employment_expiry"
														className="mb-3"
														selected={form.employment_expiry}
														onChange={(date) => setForm({ ...form, employment_expiry: date })}
														calendarStartDay={1}
														peekNextMonth
														showMonthDropdown
														showYearDropdown
														dropdownMode="select"
														dateFormat="yyyy-MM-dd"
													/>
												</Form.Field>
											</Form>
										</Grid.Column>
										<Grid.Column width={1} className="pr-0">
											<Form>
												<Form.Field>
													<label>🗑️</label>
													<Button fluid content="EJ" color="red" className="pl-3" onClick={() => setForm({ ...form, employment_expiry: null })}/>
												</Form.Field>
											</Form>
										</Grid.Column>
									</Grid.Row>
									<Grid.Row>
										<Grid.Column width={6} className="pr-0">
											<Form>
												<Form.Dropdown
													fluid
													selection
													name='Hembas'
													label='Hembas'
													options={optionsHome}
													value={form.home_area}
													onChange={(e, val) => setForm({ ...form, home_area: val.value })}
												/>
											</Form>
										</Grid.Column>
										<Grid.Column width={6} className="pr-0">
											<Form>
												<Form.Dropdown
													fluid
													selection
													name='ID Kort'
													label='ID Kort'
													options={optionsCard}
													value={form.card}
													onChange={(e, val) => setForm({ ...form, card: val.value })}
												/>
											</Form>
										</Grid.Column>
										<Grid.Column width={3} className="pr-0">
											<Form>
												<Form.Field>
													<label>Datum Delegering</label>
													<DatePicker
														id="delegation"
														className="mb-3"
														selected={form.delegation}
														onChange={(date) => setForm({ ...form, delegation: date })}
														calendarStartDay={1}
														peekNextMonth
														showMonthDropdown
														showYearDropdown
														dropdownMode="select"
														dateFormat="yyyy-MM-dd"
													/>
												</Form.Field>
											</Form>
										</Grid.Column>
										<Grid.Column width={1} className="pr-0">
											<Form>
												<Form.Field>
													<label>🗑️</label>
													<Button fluid content="EJ" color="red" className="pl-3" onClick={() => setForm({ ...form, delegation: null })}/>
												</Form.Field>
											</Form>
										</Grid.Column>
									</Grid.Row>
									<Grid.Row className="pb-0">
										<Grid.Column width={16}>
											<h1>Telefon & Sith</h1>
											<Divider className="mb-0" />
										</Grid.Column>
									</Grid.Row>
									<Grid.Row>
										<Grid.Column width={8} className="pr-0">
											<Form>
												<Form.Dropdown
													fluid
													selection
													name='Telefon Status'
													label='Telefon Status'
													options={optionsPhone}
													value={form.phone_status}
													onChange={(e, val) => setForm({ ...form, phone_status: val.value, phone_id: -1 })}
												/>
											</Form>
										</Grid.Column>
										<Grid.Column width={8} className="pr-0">
											<Form>
												<Form.Dropdown
													disabled={isLoadingMobiles || form.phone_status === 'Osäker' || form.phone_status === 'Nej'}
													fluid
													selection
													name='Telefon ID'
													label='Telefon ID'
													options={optionsPhoneId}
													value={form.phone_id}
													onChange={(e, val) => setForm({ ...form, phone_id: val.value })}
												/>
											</Form>
										</Grid.Column>
									</Grid.Row>
									<Grid.Row>
										<Grid.Column width={8} className="pr-0">
											<Form>
												<Form.Dropdown
													fluid
													selection
													name='SITH Status'
													label='SITH Status'
													options={optionsSith}
													value={form.sith_status}
													onChange={(e, val) => setForm({ ...form, sith_status: val.value })}
												/>
											</Form>
										</Grid.Column>
										<Grid.Column width={8} className="pr-0">
											<Form>
												<Form.Input
													fluid
													name="HSA"
													label="HSA"
													placeholder="XXXXXXXXXXXXXXXX-XXXXXXX"
													value={form.sith_hsa}
													onChange={e => setForm({ ...form, sith_hsa: e.target.value })}
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

export default Staff;