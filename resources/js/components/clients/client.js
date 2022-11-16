import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Popup from '../components/popup';

const optionsCareType = [
	{ key: 'Osäker', text: 'Osäker', value: 'Osäker' },
	{ key: 'old', text: 'Äldreomsorg', value: 'old' },
	{ key: 'disabled', text: 'Funktionshinder', value: 'disabled' },
];

const optionsHome = [
	{ key: 'Osäker', text: 'Osäker', value: 'Osäker' },
	{ key: 'Lundby', text: 'Lundby', value: 'Lundby' },
	{ key: 'Östra', text: 'Östra', value: 'Östra' },
	{ key: 'Angered', text: 'Angered', value: 'Angered' },
	{ key: 'Backa', text: 'Backa', value: 'Backa' },
	{ key: 'V-H', text: 'V-H', value: 'V-H' },
];

function Staff(props) {
	const userObject = JSON.parse(localStorage.getItem('user'));
	const history = useHistory();
	//Gather person information from parent, and convert date variables to be JS friendly
	const [form, setForm] = useState({
		...props.person,
		decision: props.person.decision ? new Date(props.person.decision) : null,
		decision_end: props.person.decision_end ? new Date(props.person.decision_end) : null,
		plan: props.person.plan ? new Date(props.person.plan) : null,
	});
	const [isUploading, setIsUploading] = useState(false);
	const [isLoadingMobiles, setIsLoadingMobiles] = useState(true);
	const [optionsPhoneId, setOptionsPhoneId] = useState([]);

	useEffect(() => {

		//Update URL
		window.history.replaceState(null, form.name, `/kunder/${form.id}/${form.name.replace(/\s+/g, '-').toLowerCase()}`);

		//Download mobile data
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

	const layout = {
		sidebar: [
			{
				type: 'checkbox',
				label: 'Aktiv',
				data: 'active',
			},
			{
				type: 'checkbox',
				label: 'Infopärm',
				data: 'binder',
			},
			{
				type: 'checkbox',
				label: 'Samtycke',
				data: 'consent',
			},
			{
				type: 'checkbox',
				label: 'Nyckel',
				data: 'key',
			},
		],
		main: [
			[
				{
					type: 'title',
					label: 'Grundläggande Information',
				},
			],
			[
				{
					type: 'input',
					label: 'Fullt Namn',
					data: 'name',
					placeholder: 'Fullt Namn',
					width: 8,
					min: 1,
				},
				{
					type: 'input',
					label: 'Personnummer',
					data: 'ssn',
					placeholder: 'xxxxxx-xxxx',
					width: 8,
				},
			],
			[
				{
					type: 'date',
					label: 'Beslut-start',
					data: 'decision',
					width: 7,
				},
				{
					type: 'date',
					label: 'Beslut-slut',
					data: 'decision_end',
					width: 7,
				},
			],
			[
				{
					type: 'input',
					label: 'Adress',
					data: 'address',
					placeholder: 'Brukargatan 4, 419 41 Göteborg',
					width: 6,
				},
				{
					type: 'select',
					label: 'Vårdtyp',
					data: 'care_type',
					options: optionsCareType,
					width: 6,
				},
				{
					type: 'date',
					label: 'Genomförandeplan',
					data: 'plan',
					width: 3,
				},
			],
			[
				{
					type: 'select',
					label: 'Stadsdel',
					data: 'home_area',
					options: optionsHome,
					width: 6,
				},
			],
			[
				{
					type: 'title',
					label: 'Övrigt',
				},
			],
			[
				{
					type: 'textbox',
					label: 'Kommentar',
					data: 'comment',
					placeholder: 'Kommentarer..',
					width: 16,
				},
			]
		]
	};

	const data = {
		loadForm: () => {
			return {
				...props.person,
				decision: props.person.decision ? new Date(props.person.decision) : null,
				decision_end: props.person.decision_end ? new Date(props.person.decision_end) : null,
				plan: props.person.plan ? new Date(props.person.plan) : null,
			}
		},
		isUploading: isUploading,
	}

	function sendStaffUpdate() {

		//Loop through form and check for errors, if any are found cancel upload
		if (form.name.length > 0) {

			//Set form to uploading status
			setIsUploading(true);

			//Determine wether to send an update to an existing staff (PUT) or create a new staff (POST)
			const postMethod = props.person.id === undefined ? 'POST' : 'PUT';

			//Send the data to the API
			fetch('/api/clients', {
				method: postMethod,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': userObject.token,
				},
				//Include form information and encode date variables to be PHP friendly
				body: JSON.stringify({
					...form,
					decision: form.decision ? form.decision.toISOString().split('T')[0] : null,
					decision_end: form.decision_end ? form.decision_end.toISOString().split('T')[0] : null,
					plan: form.plan ? form.plan.toISOString().split('T')[0] : null,
				}),
			})
				.then(response => response.json())
				.then(data => {
					if (data.status === 'success') {

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

	//Update URL
	window.history.replaceState(null, form.name, `/kunder/${form.id}/${form.name.replace(/\s+/g, '-').toLowerCase()}`);

	function popupCanceled() {
		props.canceled();
	}

	function updateForm(form) {
		setForm({ ...form })
	}

	return (
		<Popup canceled={popupCanceled} data={data} layout={layout} sent={sendStaffUpdate} id={props.id} name={props.name} person={props.person} formToParent={updateForm} />
	);
}

export default Staff;