import { initial } from 'lodash';
import React, { useState } from 'react';
import {
	Checkbox,
	Form,
	Button,
	Confirm,
} from 'semantic-ui-react'



function PersonEditModule(props) {
	const [form, setForm] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [uploadingStatus, setUploadingStatus] = useState({ status: 'standby', text: '' });
	const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
	const userObject = JSON.parse(localStorage.getItem('user'));


	if (props.data !== undefined && isLoading === true) {
		setIsLoading(false);
		const newForm = { ...props.data };
		newForm.admin = props.data.admin === 1 ? true : false;
		setForm({ ...newForm });
	}

	function handleInputChange(e) {
		const target = e.target;
		form[target.name] = target.value;
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
		fetch('/api/users', {
			method: postMethod,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': userObject.token,
			},
			body: JSON.stringify({
				id: form.id,
				admin: form.admin,
				name: form.name,
				email: form.email,
				password: form.password,
			}),
		})
			.then(response => response.json())
			.then(data => {
				if (data.status === 'success') {
					setUploadingStatus(form.id !== '' ? { status: 'success', text: 'Användaren har blivit uppdaterad' } : { status: 'success', text: 'Användaren har lags till' });
					const newForm = { ...form };
					newForm.admin = newForm.free === true ? 1 : 0;
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
		fetch('/api/users', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: form.id }),
		})
			.then(response => response.json())
			.then(data => {
				if (data.status === 'success') {
					setUploadingStatus({ status: 'success', text: 'Användaren har tagits bort' });
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
					<Form.Input
							name='password'
							fluid
							label='Lösenord'
							placeholder='Lösenord'
							value={form.password}
							onChange={e => handleInputChange(e)}
					/>
				</Form.Group>
				<Form.Field
					control={Checkbox}
					label='Admin'
					name='admin'
					defaultChecked={form.admin}
					onChange={e => handleCheckboxChange(e, 'admin')}
				/>
				<Button type='submit' className="w-100 mb-3" disabled={isLoading} onClick={event => handleSubmit(event)}>{(props.data.id !== '') ? 'Uppdatera Användare' : 'Lägg Till Användare'}</Button>
				{props.data.id !== '' &&
					<div>
						<Button type='submit' color="red" className="w-100" onClick={event => handleRemovePress(event)}>Ta Bort Telefonen Från Systemet</Button>
						<Confirm
							open={deleteConfirmOpen}
							onConfirm={() => handleRemoveConfirm()}
							onCancel={() => setDeleteConfirmOpen(false)}
							cancelButton="Avbryt"
							confirmButton="Ta Bort Användare"
							content="Om du tar bort användaren kommer den ej längre ha tillgång till Intraliv"
							header="Ta Bort Användaren"
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