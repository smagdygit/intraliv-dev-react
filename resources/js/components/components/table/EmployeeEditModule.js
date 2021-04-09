import React, { useState } from 'react';
import {
	Checkbox,
	Form,
	TextArea,
	Button,
	Confirm
} from 'semantic-ui-react'




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

	if (props.data !== undefined && isLoading === true) {
		setIsLoading(false);
		const newForm = { ...props.data };
		newForm.active = props.data.active === 1 ? true : false;
		newForm.admin = props.data.admin === 1 ? true : false;
		newForm.east = props.data.east === 1 ? true : false;
		newForm.angered = props.data.angered === 1 ? true : false;
		newForm.lundby = props.data.lundby === 1 ? true : false;
		setForm({ ...newForm });
	}

	function handleInputChange(e) {
		const target = e.target;
		form[target.name] = target.value;
		setForm({ ...form });
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

		fetch('http://localhost:8000/api/people', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(form),
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

	function handleRemoveConfirm() {
		setDeleteConfirmOpen(false);
		fetch('http://localhost:8000/api/people', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({id: form.id}),
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
					<Form.Input
						name='phone'
						fluid
						label='Telefon ID & Status'
						placeholder='Telefon ID & Status'
						value={form.phone_id}
						onChange={e => handleInputChange(e)}
					/>
					<Form.Input
						disabled
						fluid
						readOnly
						label='Intraliv ID'
						placeholder='Intraliv ID'
						value={form.id}
						onChange={(e, value) => handleInputChange(e, value)}
					/>
					<Form.Input
						name='care_id_2'
						fluid
						label='Carefox ID'
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
					control={Checkbox}
					label='Aktiv'
					name='active'
					defaultChecked={form.active}
					onChange={e => handleCheckboxChange(e, 'active')}
				/>
				<Form.Field
					control={Checkbox}
					label='Admin'
					name='admin'
					defaultChecked={form.admin}
					onChange={e => handleCheckboxChange(e, 'admin')}
				/>
				<Form.Field
					control={Checkbox}
					label='Östra'
					name='east'
					defaultChecked={form.east}
					onChange={e => handleCheckboxChange(e, 'east')}
				/>
				<Form.Field
					control={Checkbox}
					label='Angered'
					name='angered'
					defaultChecked={form.angered}
					onChange={e => handleCheckboxChange(e, 'angered')}
				/>
				<Form.Field
					control={Checkbox}
					label='Lundby'
					name='lundby'
					defaultChecked={form.lundby}
					onChange={e => handleCheckboxChange(e, 'lundby')}
				/>
				<Form.Field
					control={TextArea}
					label='Kommentar'
					name='comment'
					placeholder='Kommentar'
					value={form.comment}
					onChange={e => handleInputChange(e)}
				/>
				<Button type='submit' className="w-100 mb-3" onClick={event => handleSubmit(event)}>{(props.data.id !== '') ? 'Uppdatera Person' : 'Lägg Till Person'}</Button>
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
			</Form>
			<center>
				<h2 className="mt-3">{uploadingStatus.text}</h2>
			</center>
		</>
	);
}

export default PersonEditModule;