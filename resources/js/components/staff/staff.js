import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Popup from '../components/popup';

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
	{ key: 'Visstidsanställd', text: 'Visstidsanställd', value: 'Visstidsanställd' },
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
	const [isUploading, setIsUploading] = useState(false);
	const [isLoadingMobiles, setIsLoadingMobiles] = useState(true);
	const [optionsPhoneId, setOptionsPhoneId] = useState([]);

	useEffect(() => {

		//Update URL
		window.history.replaceState(null, form.name, `/personal/${form.id}/${form.name.replace(/\s+/g, '-').toLowerCase()}`);

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
				label: 'Admin',
				data: 'admin',
			},
			{
				type: 'checkbox',
				label: 'Utbildning',
				data: 'education',
			},
			{
				type: 'checkbox',
				label: 'Nyckelbricka',
				data: 'door_key',
			},
			{
				type: 'link',
				label: 'Carefox Profil',
				data: `https://system.carefox.se/admin/employees/${form.carefox_id}`,
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
					width: 6,
					min: 1,
				},
				{
					type: 'input',
					label: 'Mejl',
					data: 'email',
					placeholder: 'föreft@livara.se',
					width: 6,
				},
				{
					type: 'input',
					label: 'Anst. ID',
					data: 'staff_number',
					placeholder: 'XX',
					width: 4,
				},
			],
			[
				{
					type: 'select',
					label: 'IT Policy',
					data: 'it_policy',
					options: optionsIT,
					width: 6,
				},
				{
					type: 'select',
					label: 'Körkort',
					data: 'drivers_license',
					options: optionsDriving,
					width: 6,
				},
				{
					type: 'select',
					label: 'Grupp',
					data: 'group',
					options: optionsGroup,
					width: 4,
				},
			],
			[
				{
					type: 'title',
					label: 'Anställning',
				},
			],
			[
				{
					type: 'input',
					label: 'Carefox ID',
					data: 'carefox_id',
					placeholder: 'XXXXXX',
					width: 6,
				},
				{
					type: 'select',
					label: 'Anställningstyp',
					data: 'employment_type',
					options: optionsEmployment,
					width: 6,
				},
				{
					type: 'date',
					label: 'Anst. Utgår',
					data: 'employment_expiry',
					width: 3,
				},
			],
			[
				{
					type: 'select',
					label: 'Hembas',
					data: 'home_area',
					options: optionsHome,
					width: 6,
				},
				{
					type: 'select',
					label: 'Körkort',
					data: 'card',
					options: optionsCard,
					width: 6,
				},
				{
					type: 'date',
					label: 'Datum Delegering',
					data: 'delegation',
					width: 3,
				},
			],
			[
				{
					type: 'title',
					label: 'Telefon & Sith',
				},
			],
			[
				{
					type: 'select',
					label: 'Telefon Status',
					data: 'phone_status',
					options: optionsPhone,
					width: 8,
				},
				{
					type: 'select',
					disabled: () => isLoadingMobiles || form.phone_status === 'Osäker' || form.phone_status === 'Nej',
					label: 'Telefon ID',
					data: 'phone_id',
					options: optionsPhoneId,
					width: 8,
				},
			],
			[
				{
					type: 'select',
					label: 'SITH Status',
					data: 'sith_status',
					options: optionsSith,
					width: 8,
				},
				{
					type: 'input',
					label: 'HSA',
					data: 'sith_hsa',
					placeholder: 'XXXXXXXXXXXXXXXX-XXXXXXX',
					width: 8,
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
					type: 'input',
					label: '% Anställning',
					data: 'work_percentage',
					placeholder: '50',
					width: 8,
				},
				{
					type: 'input',
					label: 'Timmar denna mån',
					data: 'monthly_hours',
					placeholder: '30',
					width: 8,
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
				delegation: props.person.delegation ? new Date(props.person.delegation) : null,
				employment_expiry: props.person.employment_expiry ? new Date(props.person.employment_expiry) : null,
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

	//Update URL
	window.history.replaceState(null, form.name, `/personal/${form.id}/${form.name.replace(/\s+/g, '-').toLowerCase()}`);

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