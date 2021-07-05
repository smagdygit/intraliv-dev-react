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
import FilterModule from './components/FilterModule';



const optionsStatus = [
	{ key: 'Usable', text: 'Användbar', value: 'Usable' },
	{ key: 'Need Checkup', text: 'Måste Undersökas', value: 'Need Checkup' },
	{ key: 'Does not Work', text: 'Fungerar Ej', value: 'Does not Work' },
	{ key: 'To Register', text: 'Ska Registreras', value: 'To Register' },
	{ key: 'To Install', text: 'Ska Installeras', value: 'To Install' },
	{ key: 'Waiting for Mail', text: 'Väntar på Post', value: 'Waiting for Mail' },
	{ key: 'Missing Case', text: 'Saknar Skal', value: 'Missing Case' }
];
const optionsPhoniro = [
	{ key: 'Yes', text: 'Finns med Stadsdel', value: 'Yes' },
	{ key: 'Half', text: 'Finns utan Stadsdel', value: 'Half' },
	{ key: 'No', text: 'Finns Ej', value: 'No' },
];



function Test(props) {
	const [childData, setChildData] = useState({
		table: props.data,
		uploadUrl: '/api/phones',
		dynamicDataUrl: '/api/employees',
		buttonAcceptNewText: 'Lägg Till Telefon',
		buttonAcceptUpdateText: 'Uppdatera Telefon',
		buttonCancelText: 'Ta Bort Telefon Från Systemet',
		alertTitle: 'Ta Bort Telefonen',
		alertContent: 'Ta inte bort en telefon för att den inte används, ändra istället telefonens status till ledig. Är du säker på att du vill ta bort telefonen? Detta går inte att ångra.',
		alertCancel: 'Avbryt',
		alertAccept: 'Ta Bort Telefon',
		successDelete: 'Telefonen har tagits bort',
		successNew: 'Telefonen har lags till',
		successUpdate: 'Telefonen har blivit uppdaterad',
		variableList: [
			'id',
			'name',
			'status',
			'phoniro_status',
			'free',
			'personal',
			'east',
			'angered',
			'lundby',
			'vh',
			'backa',
			'comment',
		],
		dynamicData: props.data.employees,
		dynamicKey: 'employees',
		dynamicDataList: [],
		booleanList: [
			'free',
			'personal',
			'east',
			'angered',
			'lundby',
			'backa',
			'vh',
		],
		layout: {
			areaTopLeft: [
				{
					type: 'checkbox',
					data: 'free',
					text: 'Ledig',
				},
				{
					type: 'checkbox',
					data: 'personal',
					text: 'Personlig',
				},
			],
			areaBottomLeft: [
				{
					type: 'checkbox',
					data: 'east',
					text: 'Östra',
				},
				{
					type: 'checkbox',
					data: 'angered',
					text: 'Angered',
				},
				{
					type: 'checkbox',
					data: 'lundby',
					text: 'Lundby',
				},
				{
					type: 'checkbox',
					data: 'vh',
					text: 'Västra Hisingen',
				},
				{
					type: 'checkbox',
					data: 'backa',
					text: 'Backa',
				},
			],
			areaRight: [
				[
					{
						type: 'input',
						data: 'name',
						text: 'Siffra (WP-XX)',
						placeholder: '99',
					},
					{
						type: 'dropdown',
						data: 'status',
						text: 'Status',
						options: optionsStatus,
					},
				],
				[
					{
						type: 'dropdown',
						data: 'dynamic',
						multiple: true,
					},
					{
						type: 'dropdown',
						data: 'phoniro_status',
						multiple: false,
						text: 'Phoniro Status',
						options: optionsPhoniro,
					},
				],
				[
					{
						type: 'text',
						data: 'comment',
						text: 'Kommentar',
						placeholder: 'Kommentar',
					},
				]
			],
		},
		dynamicFunction: "ee"
	});

	function filterModuleUpdated(newPerson) {
		props.sendDataToParent(newPerson);
	};

	function dynamicFunction(data) {
		setChildData({
			...childData,
			dynamicDataList: data.map((item) => {
				return (
					{ key: item.id, text: item.name, value: item.id, phone_id: item.phone_id, phone_name: item.phone.name }
				);
			})
		})
	}

	return (
		<FilterModule data={childData} className="m-5" sendDataToParent={filterModuleUpdated} sendDynamic={dynamicFunction}></FilterModule>
	);
}

export default Test;