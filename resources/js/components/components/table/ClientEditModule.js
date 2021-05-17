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
} from 'semantic-ui-react'




const optionsCareType = [
	{ key: 'null', text: 'Filtrera Vårdtyp', value: 'null' },
	{ key: 'old', text: 'Äldreomsorg', value: 'old' },
	{ key: 'young', text: 'Yngreomsorg', value: 'young' },
	{ key: 'disabled', text: 'Handikappsomsorg', value: 'disabled' },
]


function ClientEditModule(props) {
	const [form, setForm] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [uploadingStatus, setUploadingStatus] = useState({ status: 'standby', text: '' });
	const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
	const userObject = JSON.parse(localStorage.getItem('user'));

	if (props.data !== undefined && isLoading === true) {
		setIsLoading(false);
		const newForm = { ...props.data };
		newForm.east = props.data.east === 1 ? true : false;
		newForm.angered = props.data.angered === 1 ? true : false;
		newForm.lundby = props.data.lundby === 1 ? true : false;
		newForm.vh = props.data.vh === 1 ? true : false;
		newForm.backa = props.data.backa === 1 ? true : false;
		setForm({ ...newForm });
	}

	function handleInputChange(e) {
		const target = e.target;
		form[target.name] = target.value;
		setForm({ ...form });
	}

	function handleUserInputChange(e, data) {
		const target = e.target; console.log(data);
		setFormUser(data.value);
		const newPhoneLog = data.value.map((item) => {
			if (item.phone_id !== '') {
				return (
					<Message negative key={'message ' + item}>
						<Message.Header>Varning, {employeeList.find(x => x.key === item).text} har redan telefon WP{employeeList.find(x => x.key === item).phone_name}</Message.Header>
						<p>
							Om du lägger till denna telefonen på han kommer den gamla att överskrivas då en anställd endast kan ha en telefon registrerad på sig.
					</p>
					</Message>
				);
			}
		});
		setUserPhoneLog([...newPhoneLog]);
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
		fetch('/api/client', {
			method: postMethod,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': userObject.token,
			},
			body: JSON.stringify({
				id: form.id,
				name: form.name,
				care_type: form.care_type,
				east: form.east,
				angered: form.angered,
				lundby: form.lundby,
				vh: form.vh,
				backa: form.backa,
				ssn: form.ssn,
				address: form.address,
				permitted_hours: form.permitted_hours,
				comment: form.comment,
			}),
		})
			.then(response => response.json())
			.then(data => {
				if (data.status === 'success') {
					setUploadingStatus(form.id !== '' ? { status: 'success', text: 'Telefonen har blivit uppdaterad' } : { status: 'success', text: 'Telefonen har lags till' });
					const newForm = { ...form };
					newForm.east = newForm.east === true ? 1 : 0;
					newForm.angered = newForm.angered === true ? 1 : 0;
					newForm.lundby = newForm.lundby === true ? 1 : 0;
					newForm.vh = newForm.vh === true ? 1 : 0;
					newForm.backa = newForm.backa === true ? 1 : 0;
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
		fetch('/api/client', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: form.id }),
		})
			.then(response => response.json())
			.then(data => {
				if (data.status === 'success') {
					setUploadingStatus({ status: 'success', text: 'Telefonen har tagits bort' });
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
								placeholder='Alberto Kristensson'
								value={form.name}
								onChange={e => handleInputChange(e)}
							/>
							<Form.Select
								name='care_type'
								options={optionsCareType}
								fluid
								label='Vårdtyp'
								defaultValue={form.care_type}
								onChange={(e, val) => handleSelectChange(e, 'care_type', val)}
							/>
						</Form.Group>
						<Form.Group widths='equal'>
							<Form.Input
								name='ssn'
								fluid
								label='Personnummer'
								placeholder='xxxxxxxx-xxxx'
								value={form.ssn}
								onChange={e => handleInputChange(e)}
							/>
							<Form.Input
								name='address'
								fluid
								label='Adress'
								placeholder='Sannegårdsgatan 1, 417 60 Göteborg'
								value={form.address}
								onChange={e => handleInputChange(e)}
							/>
							<Form.Input
								name='permitted_hours'
								fluid
								label='Beviljade Timmar (veckovis)'
								placeholder='45'
								value={form.permitted_hours}
								onChange={e => handleInputChange(e)}
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
						<Button positive type='submit' className="w-100 mb-3" onClick={event => handleSubmit(event)}>{(props.data.id !== '') ? 'Uppdatera Telefon' : 'Lägg Till Telefon'}</Button>
						{props.data.id !== '' &&
							<div>
								<Button type='submit' color="red" className="w-100" onClick={event => handleRemovePress(event)}>Ta Bort Telefonen Från Systemet</Button>
								<Confirm
									open={deleteConfirmOpen}
									onConfirm={() => handleRemoveConfirm()}
									onCancel={() => setDeleteConfirmOpen(false)}
									cancelButton="Avbryt"
									confirmButton="Ta Bort Telefon"
									content="Ta inte bort en telefon för att den inte används, ändra istället telefonens status till ledig. 
									Är du säker på att du vill ta bort telefonen? Detta går inte att ångra."
									header="Ta Bort Telefonen"
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

export default ClientEditModule;