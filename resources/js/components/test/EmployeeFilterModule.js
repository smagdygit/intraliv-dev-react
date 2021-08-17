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

const optionsGroup = [
	{ key: 'null', text: 'Filtrera Grupp', value: 'null' },
	{ key: '1', text: 'Grupp 1 🥇', value: '1' },
	{ key: '2', text: 'Grupp 2 🥈', value: '2' },
]



function Test(props) {
	const [childData, setChildData] = useState({
		table: props.data,
		uploadUrl: '/api/employees',
		dynamicDataUrl: '/api/phones',
		buttonAcceptNewText: 'Lägg Till Person',
		buttonAcceptUpdateText: 'Uppdatera Person',
		buttonCancelText: 'Ta Bort Personal Från Systemet',
		alertTitle: 'Ta Bort Personen',
		alertContent: 'Ta inte bort en person för att den har slutat, ändra istället personens status till inaktiv. Är du säker på att du vill ta bort personen? Detta går inte att ångra.',
		alertCancel: 'Avbryt',
		alertAccept: 'Ta Bort Person',
		successDelete: 'Personen har tagits bort',
		successNew: 'Personen har lags till',
		successUpdate: 'Personen har blivit uppdaterad',
		variableList: [
			'id',
			'name',
			'email',
			'care_id_2',
			'sith',
			'admin',
			'active',
			'east',
			'lundby',
			'angered',
			'backa',
			'vh',
			'education',
			'policy_it_signed',
			'comment',
			'doorkey',
			'card',
			'group',
		],
		dynamicData: props.data.phone_id,
		dynamicKey: 'phone_id',
		dynamicDataList: [],
		booleanList: [
			'active',
			'admin',
			'east',
			'angered',
			'lundby',
			'backa',
			'vh',
			'education',
			'doorkey',
			'card',
		],
		dateList: [],
		layout: {
			areaTopLeft: [
				{
					type: 'checkbox',
					data: 'active',
					text: 'Aktiv',
				},
				{
					type: 'checkbox',
					data: 'admin',
					text: 'Admin',
				},
				{
					type: 'checkbox',
					data: 'education',
					text: 'utbildning',
				},
				{
					type: 'checkbox',
					data: 'doorkey',
					text: 'Nyckelbricka',
				},
				{
					type: 'checkbox',
					data: 'card',
					text: 'Foto',
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
						placeholder: 'Fullt Namn',
					},
					{
						type: 'input',
						data: 'email',
						text: 'Mejl',
						placeholder: 'Mejl',
					},
					{
						type: 'dropdown',
						data: 'sith',
						text: 'SITH Status',
						options: optionsSith,
					},
					{
						type: 'dropdown',
						data: 'group',
						text: 'Grupp',
						options: optionsGroup,
					},
				],
				[
					{
						type: 'dropdown',
						data: 'dynamic',
						multiple: false,
						text: 'Telefon ID',
						placeholder: 'WPXX',
					},
					{
						type: 'input',
						data: 'care_id_2',
						text: 'Anställningsnummer (-1 om du ej vet)',
						placeholder: 'Anställningsnummer',
					},
					{
						type: 'dropdown',
						data: 'policy_it_signed',
						text: 'IT Policy Status',
						multiple: false,
						options: optionsPolicyIt,
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