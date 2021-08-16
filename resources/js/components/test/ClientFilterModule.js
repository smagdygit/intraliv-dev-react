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



const optionsCareType = [
	{ key: 'null', text: 'Filtrera Vårdtyp', value: 'null' },
	{ key: 'old', text: 'Äldreomsorg', value: 'old' },
	{ key: 'disabled', text: 'Funktionshinder', value: 'disabled' },
];



function Test(props) {
	const [childData, setChildData] = useState({
		table: props.data,
		uploadUrl: '/api/clients',
		dynamicDataUrl: '',
		buttonAcceptNewText: 'Lägg Till Brukare',
		buttonAcceptUpdateText: 'Uppdatera Brukare',
		buttonCancelText: 'Ta Bort Brukare Från Systemet',
		alertTitle: 'Ta Bort Brukaren',
		alertContent: 'Ta inte bort en Brukare för att den har avslutats, ändra istället Brukarens status till inaktiv. Är du säker på att du vill ta bort Brukaren? Detta går inte att ångra.',
		alertCancel: 'Avbryt',
		alertAccept: 'Ta Bort Brukare',
		successDelete: 'Brukaren har tagits bort',
		successNew: 'Brukaren har lags till',
		successUpdate: 'Brukaren har blivit uppdaterad',
		variableList: [
			'id',
			'name',
			'care_type',
			'east',
			'lundby',
			'angered',
			'backa',
			'vh',
			'ssn',
			'address',
			'permitted_hours',
			'comment',
			'active',
			'decision',
			'plan',
			'binder',
			'consent',
			'key',
		],
		dynamicData: '',
		dynamicKey: '',
		dynamicDataList: [],
		booleanList: [
			'east',
			'angered',
			'lundby',
			'backa',
			'vh',
			'active',
			'plan',
			'binder',
			'consent',
			'key',
		],
		dateList: [
			'decision',
			'plan'
		],
		layout: {
			areaTopLeft: [
				{
					type: 'checkbox',
					data: 'active',
					text: 'Aktiv',
				},
				{
					type: 'checkbox',
					data: 'binder',
					text: 'Info Pärm',
				},
				{
					type: 'checkbox',
					data: 'consent',
					text: 'Samtycke',
				},
				{
					type: 'checkbox',
					data: 'key',
					text: 'Nyckelkvittens',
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
						text: 'Fullt Namn',
						placeholder: 'Alberto Kristensson',
					},
					{
						type: 'dropdown',
						data: 'care_type',
						text: 'Vårdtyp',
						options: optionsCareType,
					},
					{
						type: 'date',
						data: 'decision',
						text: 'Beslut',
						placeholder: '1997-09-01',
					},
					{
						type: 'date',
						data: 'plan',
						text: 'Genomförandeplan',
						placeholder: '1997-09-01',
					},
				],
				[
					{
						type: 'input',
						data: 'ssn',
						text: 'Personnummer',
						placeholder: '19970915-1234',
					},
					{
						type: 'input',
						data: 'address',
						text: 'Adress',
						placeholder: 'Sannegårdsgatan 1, 417 60 Göteborg',
					},
					{
						type: 'input',
						data: 'permitted_hours',
						text: 'Beviljade Timmar (veckovis)',
						placeholder: '45',
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
				const phoneUserList = item.employees.map((subItem) => {
					return (
						' - ' + subItem.name
					);
				});
				const renamePhone = (item.name === -1) ? 'Vet Ej' : (item.name === 0) ? 'Ingen Telefon' : `WP${item.name}`;
				return (
					{ key: item.id, text: renamePhone + phoneUserList, value: item.id }
				);
			})
		})
	}

	return (
		<FilterModule data={childData} className="m-5" sendDataToParent={filterModuleUpdated} sendDynamic={dynamicFunction}></FilterModule>
	);
}

export default Test;