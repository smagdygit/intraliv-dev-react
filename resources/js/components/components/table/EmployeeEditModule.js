import React, { useState, useEffect } from 'react';
import {
	Checkbox,
	Form,
	TextArea,
	Button,
	Confirm,
	GridColumn,
	Grid,
	Divider,
} from 'semantic-ui-react';




const optionsSith = [
	{ key: 'Yes', text: 'Yes', value: 'Yes' },
	{ key: 'N Never', text: 'No', value: 'N Never' },
	{ key: 'To Install', text: 'To Install', value: 'To Install' },
	{ key: 'Ordered', text: 'Ordered', value: 'Ordered' },
	{ key: 'To Order', text: 'To Order', value: 'To Order' }
]
const optionsPolicyIt = [
	{ key: 'N Do', text: 'Ej Klar', value: 'N Do' },
	{ key: '210208A', text: '210208A', value: '210208A' },
	{ key: '210312A', text: '210312A', value: '210312A' },
]

function PersonEditModule(props) {
	const [form, setForm] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [uploadingStatus, setUploadingStatus] = useState({ status: 'standby', text: '' });
	const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
	const [formPhone, setFormPhone] = useState(props.data.phone_id);
	const [phoneList, setPhoneList] = useState([]);
	const [phoneUserLog, setPhoneUserLog] = useState([]);
	const userObject = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		fetch('/api/phones', {
			method: 'GET',
			headers: {
				'Authorization': userObject.token,
			}
		})
			.then(response => response.json())
			.then(data => {
				setPhoneList(data.map((item) => {
					const phoneUserList = item.employees.map((subItem) => {
						return (
							' - ' + subItem.name
						);
					});
					const renamePhone = (item.name === -1) ? 'Vet Ej' : (item.name === 0) ? 'Ingen Telefon' : `WP${item.name}`;
					return (
						{ key: item.id, text: renamePhone + phoneUserList, value: item.id, employees: item.employees }
					);
				}));
			});
	}, []);

	if (props.data !== undefined && isLoading === true) {
		setIsLoading(false);
		const newForm = { ...props.data };
		newForm.active = props.data.active === 1 ? true : false;
		newForm.admin = props.data.admin === 1 ? true : false;
		newForm.east = props.data.east === 1 ? true : false;
		newForm.angered = props.data.angered === 1 ? true : false;
		newForm.lundby = props.data.lundby === 1 ? true : false;
		newForm.backa = props.data.backa === 1 ? true : false;
		newForm.vh = props.data.vh === 1 ? true : false;
		newForm.education = props.data.education === 1 ? true : false;
		newForm.doorkey = props.data.doorkey === 1 ? true : false;
		setForm({ ...newForm });
	}

	function handleInputChange(e) {
		const target = e.target;
		form[target.name] = target.value;
		setForm({ ...form });
	}

	function handlePhoneInputChange(e, data) {
		//const target = e.target; console.log(data);
		setFormPhone(data.value);
		/*const newPhoneLog = data.value.map((item) => {
			if (item.phone_id !== '') {
				return (
					<Message warning key={'message ' + item}>
						<Message.Header>OBS, {phoneList.find(x => x.key === item).employees} har redan telefon WP{phoneList.find(x => x.key === item).}</Message.Header>
						<p>
							Om du lägger till denna telefonen på han kommer den gamla att överskrivas då en anställd endast kan ha en telefon registrerad på sig.
					</p>
					</Message>
				);
			}
		});*/
		//setPhoneUserLog([...newPhoneLog]);
	}

	function handleSelectChange(e, name, val) {
		const target = e.target;
		form[name] = val.value;
		setForm({ ...form });
	}

	function handleCheckboxChange(e, name) {
		const target = e.target;
		form[name] = !form[name];
		setForm({ ...form });
	}

	function handleSubmit(event) {
		event.preventDefault();
		setUploadingStatus({ status: 'uploading', text: 'Updaterar data, vänligen vänta...' });
		const postMethod = (props.data.id !== '') ? 'PUT' : 'POST';
		fetch('/api/employees', {
			method: postMethod,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': userObject.token,
			},
			body: JSON.stringify({
				id: form.id,
				name: form.name,
				email: form.email,
				care_id_2: form.care_id_2,
				phone_id: formPhone,
				sith: form.sith,
				admin: form.admin,
				active: form.active,
				east: form.east,
				lundby: form.lundby,
				angered: form.angered,
				backa: form.backa,
				vh: form.vh,
				education: form.education,
				policy_it_signed: form.policy_it_signed,
				comment: form.comment,
				doorkey: form.doorkey
			}),
		})
			.then(response => response.json())
			.then(data => {
				if (data.status === 'success') {
					setUploadingStatus(form.id !== '' ? { status: 'success', text: 'Personen har blivit uppdaterad' } : { status: 'success', text: 'Personen har lags till' });
					const newForm = { ...form };
					newForm.active = newForm.active === true ? 1 : 0;
					newForm.admin = newForm.admin === true ? 1 : 0;
					newForm.east = newForm.east === true ? 1 : 0;
					newForm.angered = newForm.angered === true ? 1 : 0;
					newForm.lundby = newForm.lundby === true ? 1 : 0;
					newForm.backa = newForm.backa === true ? 1 : 0;
					newForm.vh = newForm.vh === true ? 1 : 0;
					newForm.education = newForm.education === true ? 1 : 0;
					newForm.doorkey = newForm.doorkey === true ? 1 : 0;
					props.sendDataToParent({ status: 'updated', newForm: newForm });
				} else {
					setUploadingStatus({ status: 'error', text: 'Error: ' + data.text });
				}
			});
	}

	function handleRemovePress(event) {
		event.preventDefault();
		setDeleteConfirmOpen(true);
	}

	function handleCancelPress() {
		props.sendDataToParent('cancel');
	}

	function handleRemoveConfirm() {
		setDeleteConfirmOpen(false);
		fetch('/api/employees', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': userObject.token,
			},
			body: JSON.stringify({ id: form.id }),
		})
			.then(response => response.json())
			.then(data => {
				if (data.status === 'success') {
					setUploadingStatus({ status: 'success', text: 'Personen har tagits bort' });
					props.sendDataToParent({ status: 'deleted', id: form.id });
				} else {
					setUploadingStatus({ status: 'error', text: 'Error: ' + data.text });
				}
			});
	}


	return (
		<>
			<Grid>
				<GridColumn width={2}>
					<Form.Field
						className="p-2"
						control={Checkbox}
						toggle
						label='Aktiv'
						name='active'
						checked={form.active}
						onChange={e => handleCheckboxChange(e, 'active')}
					/>
					<Form.Field
						className="p-2"
						control={Checkbox}
						toggle
						label='Admin'
						name='admin'
						checked={form.admin}
						onChange={e => handleCheckboxChange(e, 'admin')}
					/>
					<Form.Field
						className="p-2"
						control={Checkbox}
						toggle
						label='Utbildning'
						name='education'
						checked={form.education}
						onChange={e => handleCheckboxChange(e, 'education')}
					/>
					<Form.Field
						className="p-2"
						control={Checkbox}
						toggle
						label='Nyckelbricka'
						name='doorkey'
						checked={form.doorkey}
						onChange={e => handleCheckboxChange(e, 'doorkey')}
					/>
					<Divider />
					<Form.Field
						className="p-2"
						control={Checkbox}
						toggle
						label='Östra'
						name='east'
						checked={form.east}
						onChange={e => handleCheckboxChange(e, 'east')}
					/>
					<Form.Field
						className="p-2"
						control={Checkbox}
						toggle
						label='Angered'
						name='angered'
						checked={form.angered}
						onChange={e => handleCheckboxChange(e, 'angered')}
					/>
					<Form.Field
						className="p-2"
						control={Checkbox}
						toggle
						label='Lundby'
						name='lundby'
						checked={form.lundby}
						onChange={e => handleCheckboxChange(e, 'lundby')}
					/>
					<Form.Field
						className="p-2"
						control={Checkbox}
						toggle
						label='V-H'
						name='vh'
						checked={form.vh}
						onChange={e => handleCheckboxChange(e, 'vh')}
					/>
					<Form.Field
						className="p-2"
						control={Checkbox}
						toggle
						label='Backa'
						name='backa'
						checked={form.backa}
						onChange={e => handleCheckboxChange(e, 'backa')}
					/>
				</GridColumn>
				<GridColumn width={14}>
					<Form>
						<Form.Group widths='equal'>
							<Form.Input
								name='name'
								fluid
								label='Fullt Namn'
								placeholder='Fullt Namn'
								value={form.name}
								onChange={e => handleInputChange(e)}
							/>
							<Form.Input
								name='email'
								fluid
								label='Mejl'
								placeholder='Mejl'
								value={form.email}
								onChange={e => handleInputChange(e)}
							/>
							<Form.Select
								name='sith'
								options={optionsSith}
								fluid
								label='SITH Status'
								defaultValue={form.sith}
								onChange={(e, val) => handleSelectChange(e, 'sith', val)}
							/>
						</Form.Group>
						<Form.Group widths='equal'>
							<Form.Dropdown
								name='phone'
								label='Telefon ID'
								placeholder='WPXX'
								disabled={phoneList.length === 0}
								fluid
								selection
								options={phoneList}
								value={formPhone}
								onChange={(e, data) => handlePhoneInputChange(e, data)}
							/>
							<Form.Input
								name='care_id_2'
								fluid
								placeholder='-1'
								label='Anställningsnummer (-1 om du ej vet)'
								value={form.care_id_2}
								onChange={e => handleInputChange(e)}
							/>
							<Form.Select
								name='policy_it_signed'
								options={optionsPolicyIt}
								fluid
								label='It Policy Status'
								defaultValue={form.policy_it_signed}
								onChange={(e, val) => handleSelectChange(e, 'policy_it_signed', val)}
							/>
						</Form.Group>


						<Form.Field
							control={TextArea}
							label='Kommentar'
							name='comment'
							placeholder='Kommentar'
							value={form.comment}
							onChange={e => handleInputChange(e)}
						/>
						<Button positive type='submit' className="w-100 mb-3" onClick={event => handleSubmit(event)}>{(props.data.id !== '') ? 'Uppdatera Person' : 'Lägg Till Person'}</Button>
						{props.data.id !== '' &&
							<div>
								<Button type='submit' color="red" className="w-100" onClick={event => handleRemovePress(event)}>Ta Bort Personal Från Systemet</Button>
								<Confirm
									open={deleteConfirmOpen}
									onConfirm={() => handleRemoveConfirm()}
									onCancel={() => setDeleteConfirmOpen(false)}
									cancelButton="Avbryt"
									confirmButton="Ta Bort Person"
									content="Ta inte bort en person för att den har slutat, ändra istället personens status till inaktiv. 
							Är du säker på att du vill ta bort personen? Detta går inte att ångra."
									header="Ta Bort Personen"
								/>
							</div>
						}
						{props.data.id === '' &&
							<Button type='submit' color="red" className="w-100" onClick={event => handleCancelPress(event)}>Avbryt</Button>
						}
					</Form>
				</GridColumn>
			</Grid>
			<center>
				<h2 className="mt-3">{uploadingStatus.text}</h2>
			</center>
		</>
	);
}

export default PersonEditModule;