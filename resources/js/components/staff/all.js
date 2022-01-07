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
	Icon,
	Input,
	Dropdown,
	Select,
	Dimmer,
	Card,
	Table
} from 'semantic-ui-react';
import { Router, Route, Switch, Link, useParams, useHistory, useLocation } from 'react-router-dom';
import ReactFrappeChart from 'react-frappe-charts';
import { GiAbdominalArmor, GiCarWheel } from 'react-icons/gi';
import { ImCross } from 'react-icons/Im';
import { HiArrowLeft } from 'react-icons/Hi';
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import Staff from './staff';
import { groupBy } from 'lodash';
import { FaRegAddressCard } from 'react-icons/fa';
import { GiGearStickPattern } from 'react-icons/gi';
import { MdBlock } from 'react-icons/md';
import { BsQuestionLg } from 'react-icons/bs';

const optionsIT = [
	{ key: 'Filtrera Ej', text: 'Filtrera Ej', value: 'Filtrera Ej' },
	{ key: 'Osäker', text: 'Osäker', value: 'Osäker' },
	{ key: 'Ska Skriva', text: 'Ska Skriva', value: 'Ska Skriva' },
	{ key: 'Ska EJ Skriva', text: 'Ska EJ Skriva', value: 'Ska EJ Skriva' },
	{ key: 'Påskrivet', text: 'Påskrivet', value: 'Påskrivet' },
];

const optionsDriving = [
	{ key: 'Filtrera Ej', text: 'Filtrera Ej', value: 'Filtrera Ej' },
	{ key: 'Osäker', text: 'Osäker', value: 'Osäker' },
	{ key: 'Inget Körkort', text: 'Inget Körkort', value: 'Inget Körkort' },
	{ key: 'Manuellt Körkort', text: 'Manuellt Körkort', value: 'Manuellt Körkort' },
	{ key: 'Automat Körkort', text: 'Automat Körkort', value: 'Automat Körkort' },
];

const optionsGroup = [
	{ key: 'Filtrera Ej', text: 'Filtrera Ej', value: 'Filtrera Ej' },
	{ key: 'Osäker', text: 'Osäker', value: 'Osäker' },
	{ key: 1, text: 'Grupp 1', value: 1 },
	{ key: 2, text: 'Grupp 2', value: 2 },
];

const optionsEmployment = [
	{ key: 'Filtrera Ej', text: 'Filtrera Ej', value: 'Filtrera Ej' },
	{ key: 'Osäker', text: 'Osäker', value: 'Osäker' },
	{ key: 'Övrig', text: 'Övrig', value: 'Övrig' },
	{ key: 'Timanställd', text: 'Timanställd', value: 'Timanställd' },
	{ key: 'Vikarie', text: 'Vikarie', value: 'Vikarie' },
	{ key: 'Provanställd', text: 'Provanställd', value: 'Provanställd' },
	{ key: 'Tillsvidare', text: 'Tillsvidare', value: 'Tillsvidare' },
];

const optionsHome = [
	{ key: 'Filtrera Ej', text: 'Filtrera Ej', value: 'Filtrera Ej' },
	{ key: 'Osäker', text: 'Osäker', value: 'Osäker' },
	{ key: 'Lundby', text: 'Lundby', value: 'Lundby' },
	{ key: 'Östra', text: 'Östra', value: 'Östra' },
	{ key: 'Angered', text: 'Angered', value: 'Angered' },
	{ key: 'Backa', text: 'Backa', value: 'Backa' },
	{ key: 'V-H', text: 'V-H', value: 'V-H' },
];

const optionsCard = [
	{ key: 'Filtrera Ej', text: 'Filtrera Ej', value: 'Filtrera Ej' },
	{ key: 'Osäker', text: 'Osäker', value: 'Osäker' },
	{ key: 'Ska EJ Ha Kort', text: 'Ska EJ Ha Kort', value: 'Ska EJ Ha Kort' },
	{ key: 'Behövs Foto', text: 'Behövs Foto', value: 'Behövs Foto' },
	{ key: 'Behövs Beställas', text: 'Behövs Beställas', value: 'Behövs Beställas' },
	{ key: 'Finns Redo', text: 'Finns Redo', value: 'Finns Redo' },
	{ key: 'Har Kort', text: 'Har Kort', value: 'Har Kort' },
];

const optionsPhone = [
	{ key: 'Filtrera Ej', text: 'Filtrera Ej', value: 'Filtrera Ej' },
	{ key: 'Osäker', text: 'Osäker', value: 'Osäker' },
	{ key: 'Nej', text: 'Nej', value: 'Nej' },
	{ key: 'Ska Ha Tele.', text: 'Ska Ha Tele', value: 'Ska Ha Tele' },
	{ key: 'Fungerar', text: 'Fungerar', value: 'Fungerar' },
	{ key: 'Fungerar EJ', text: 'Fungerar EJ', value: 'Fungerar EJ' },
	{ key: 'På Lagning', text: 'På Lagning', value: 'På Lagning' },
];

const optionsSith = [
	{ key: 'Filtrera Ej', text: 'Filtrera Ej', value: 'Filtrera Ej' },
	{ key: 'Osäker', text: 'Osäker', value: 'Osäker' },
	{ key: 'Nej', text: 'Nej', value: 'Nej' },
	{ key: 'Ja', text: 'Ja', value: 'Ja' },
	{ key: 'Utelåst mm.', text: 'Utelåst mm.', value: 'Utelåst mm.' },
	{ key: 'Behövs Beställas', text: 'Behövs Beställas', value: 'Behövs Beställas' },
	{ key: 'På Ingång', text: 'På Ingång', value: 'På Ingång' },
	{ key: 'Kan Bokas', text: 'Kan Bokas', value: 'Kan Bokas' },
	{ key: 'Att Avbeställa', text: 'Att Avbeställa', value: 'Att Avbeställa' },
];

const optionsActive = [
	{ key: 'Filtrera Ej', text: 'Filtrera Ej', value: 'Filtrera Ej' },
	{ key: 'Ja', text: 'Ja', value: 'Ja' },
	{ key: 'Nej', text: 'Nej', value: 'Nej' },
];

const optionsAdmin = [
	{ key: 'Filtrera Ej', text: 'Filtrera Ej', value: 'Filtrera Ej' },
	{ key: 'Ja', text: 'Ja', value: 'Ja' },
	{ key: 'Nej', text: 'Nej', value: 'Nej' },
];

const optionsEducation = [
	{ key: 'Filtrera Ej', text: 'Filtrera Ej', value: 'Filtrera Ej' },
	{ key: 'Ja', text: 'Ja', value: 'Ja' },
	{ key: 'Nej', text: 'Nej', value: 'Nej' },
];

const optionsDoorKey = [
	{ key: 'Filtrera Ej', text: 'Filtrera Ej', value: 'Filtrera Ej' },
	{ key: 'Ja', text: 'Ja', value: 'Ja' },
	{ key: 'Nej', text: 'Nej', value: 'Nej' },
];


function Allstaff(props) {
	const animateStep = 35;
	const animateLimit = 35;
	const history = useHistory();
	const userObject = JSON.parse(localStorage.getItem('user'));
	const [staff, setstaff] = useState([]);
	const [filteredStaff, setFilteredStaff] = useState([]);
	const [vehicleDeleting, setVehicleDeleting] = useState(false);
	const [staffShowing, setstaffShowing] = useState([]);
	const [updateList, setUpdateList] = useState(false);
	const [isDownloading, setIsDownloading] = useState(true);
	const [staffBoxOpen, setStaffBoxOpen] = useState(0);
	const [staffName, setStaffName] = useState('');
	const [person, setPerson] = useState({});
	const [form, setForm] = useState({
		search: '',
		group: 'Filtrera Ej',
		employment_type: 'Filtrera Ej',
		phone_status: 'Filtrera Ej',
		sith_status: 'Filtrera Ej',
		home_area: 'Filtrera Ej',
		card: 'Filtrera Ej',
		it_policy: 'Filtrera Ej',
		drivers_license: 'Filtrera Ej',
		active: 'Ja',
		admin: 'Filtrera Ej',
		education: 'Filtrera Ej',
		door_key: 'Filtrera Ej',
		comment: 'Filtrera Ej',
	});

	// DOWNLOAD THE CARS
	useEffect(() => {
		fetch(`/api/staff/`, {
			method: 'GET',
			headers: {
				'Authorization': userObject.token,
			}
		})
			.then(response => response.json())
			.then(data => {
				const moddedArray = data.staff.map(item => {
					item.animating = 0;
					return item;
				});
				//moddedArray[0].animating = 70;
				//moddedArray[1].animating = 25;
				setstaff([...moddedArray]);
				setVehicleDeleting(false);
				filterStaff([...moddedArray]);
				//setInterval((aniLoop), 100);
				setIsDownloading(false);

			});
	}, [updateList]);

	//Run filter function again upon filter change
	useEffect(() => {
		filterStaff(staff);
	}, [form]);

	//Filter the list of staff based on the used chosen filters
	function filterStaff(input) {
		const filtered = input.filter(item =>
			form.search === '' || (form.search !== '' && (
				item.name.toString().toLowerCase().includes(form.search.toLowerCase()) ||
				item.email.toString().toLowerCase().includes(form.search.toLowerCase()) ||
				item.staff_number.toString().toLowerCase().includes(form.search.toLowerCase()) ||
				item.carefox_id.toString().toLowerCase().includes(form.search.toLowerCase()) ||
				item.sith_hsa.toString().toLowerCase().includes(form.search.toLowerCase()) ||
				item.phone_id.toString().toLowerCase().includes(form.search.toLowerCase()) ||
				item.comment.toString().toLowerCase().includes(form.search.toLowerCase())
			))
		).filter(item => {
			for (const prop of [
				'it_policy',
				'drivers_license',
				'group',
				'employment_type',
				'home_area',
				'card',
				'phone_status',
				'sith_status']) {
				if (form[prop] !== 'Filtrera Ej' && form[prop] !== item[prop]) return false;
			}
			return true;
		}).filter(item => {
			for (const prop of [
				'active',
				'admin',
				'education',
				'door_key',
			]) {
				if (form[prop] !== 'Filtrera Ej' && item[prop] !== (form[prop] === 'Ja' ? true : false)) return false;
			}
			return true;
		});

		setFilteredStaff([...filtered]);
	}

	//console.log("real",staff);

	useEffect(() => {
		if (staff.length > 0 && staff[staff.length - 1].animating < animateLimit) {
			setTimeout(() => {
				const moddedArray = [...staff];
				const finalArray = moddedArray.map((item, index) => {
					if ((moddedArray[index - 1] === undefined || moddedArray[index - 1].animating === animateLimit) && item.animating < animateLimit) item.animating += animateStep;
					return item;
				});
				setstaff([...finalArray]);
			}, 1);
		}
	}, [staff])

	function aniLoop() {
		const moddedArray = [...staff];
		const finalArray = moddedArray.map((item, index) => {
			if (item[index - 1] && item[index - 1].animating === animateLimit && item.animating < animateLimit) item.animating++;
			return item;
		});
		//setstaff([...finalArray]);
		//console.log(finalArray);
		//setInterval(aniLoop, 100)
	}

	// ADD STAFF
	function handleNewClick() {
		setStaffBoxOpen(-1);
		setStaffName('Ny Personal');
		setPerson({
			name: '',
			email: '',
			staff_number: '',
			carefox_id: '',
			group: 'Osäker',
			employment_type: 'Osäker',
			phone_status: 'Osäker',
			phone_id: '',
			sith_status: 'Osäker',
			sith_hsa: '',
			home_area: 'Osäker',
			admin: false,
			active: true,
			education: false,
			door_key: false,
			card: 'Osäker',
			it_policy: 'Osäker',
			drivers_license: 'Osäker',
			comment: '',
			employment_expiry: null,
			delegation: null,
		});
	}

	function openStaffBox(id, name, person) {
		setStaffBoxOpen(id);
		setStaffName(name);
		setPerson(person);
	}

	function popupCanceled() {
		setStaffBoxOpen(0);
		setStaffName('');
		setPerson({});
	}

	function popupSent() {

		//Reset modal information
		setStaffBoxOpen(0);
		setStaffName('');
		setPerson({});

		//Refresh staff list
		setUpdateList(!updateList);

	}

	function emojis(person) {
		return (
			<Grid>
				<Grid.Row>
					<Grid.Column width={2}>

					</Grid.Column>
					<Grid.Column width={2}>
						{person.group === 1 ? '🥇   ' : person.group === 2 ? '🥈   ' : ''}
					</Grid.Column>
					<Grid.Column width={2}>
						{person.it_policy === 'Påskrivet' ? '📝   ' : ''}
					</Grid.Column>
					<Grid.Column width={2}>
						{person.education ? '📜   ' : ''}
					</Grid.Column>
					<Grid.Column width={2}>
						{person.door_key ? '🔑   ' : ''}
					</Grid.Column>
					<Grid.Column width={2}>
						{person.card === 'Har' ? '🖼️   ' : ''}
					</Grid.Column>
					<Grid.Column width={2}>
						{(person.drivers_license === 'Automat Körkort' || person.drivers_license === 'Manuellt Körkort') && <FaRegAddressCard style={{ color: person.drivers_license === 'Automat Körkort' ? 'green' : 'orange' }} />} {person.drivers_license === 'Inget Körkort' && <MdBlock style={{ color: 'red' }} />}
					</Grid.Column>
					<Grid.Column width={2}>

					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}

	function getCityColor(city, opacity) {
		if (city === 'Osäker') return `rgba(255, 255, 0, ${opacity})`;
		if (city === 'Angered') return `rgba(0, 255, 255, ${opacity})`;
		if (city === 'Lundby') return `rgba(50, 0, 127, ${opacity})`;
		if (city === 'Östra') return `rgba(255, 0, 200, ${opacity})`;
		if (city === 'V-H') return `rgba(150, 80, 0, ${opacity})`;
		if (city === 'Backa') return `rgba(60, 100, 0, ${opacity})`;
	}

	/*** SORTING MAGIC ***/
	function exampleReducer(state, action) {
		switch (action.type) {
			case 'CHANGE_SORT':
				if (state.column === action.column) {
					setFilteredStaff([...filteredStaff.slice().reverse(),])
					return {
						...state,
						data: filteredStaff.slice().reverse(),
						direction:
							state.direction === 'ascending' ? 'descending' : 'ascending',
					}

				}

				setFilteredStaff([..._.sortBy(filteredStaff, [action.column]),])
				return {
					column: action.column,
					data: _.sortBy(filteredStaff, [action.column]),
					direction: 'ascending',
				}
			default:
				throw new Error()
		}
	}
	let [state, dispatch] = React.useReducer(exampleReducer, {
		column: null,
		data: filteredStaff,
		direction: null,
	})
	let { column, data, direction } = state

	const headers = [
		{ data: 'name', name: 'Namn', width: 3 },
		{ data: 'phone_id', name: 'Tele', width: 1 },
		{ data: 'sith_status', name: 'SITH', width: 1 },
		{ data: 'home_area', name: 'Stadsdel', width: 1 },
		{ data: 'staff_number', name: 'Anst. ID', width: 1 },
		{ data: 'delegation', name: 'Delegering', width: 1 },
		{ data: 'employment_expiry', name: 'Anst. Utgår', width: 1 },
		{ data: 'misc', name: 'Övrigt', width: 3 },
		{ data: 'comment', name: 'Kommentar', width: 4 }
	].map((item, index) => {
		return (
			<Table.HeaderCell
				key={'header' + index}
				width={item.width}
				sorted={column === item.data ? direction : null}
				onClick={() => dispatch({ type: 'CHANGE_SORT', column: item.data })}
			>
				<b><h3>{item.name}</h3></b>
			</Table.HeaderCell>
		)
	});

	return (
		<center>
			{!!staffBoxOpen && <Staff canceled={popupCanceled} sent={popupSent} id={staffBoxOpen} name={staffName} person={person} />}
			<div className="container-fluid center" style={{ width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: '0px' }}>
				<h1 className="display-1 mt-5" style={{ marginBottom: '10px', fontFamily: 'Roboto, sans-serif' }}>Personal</h1>
				<Grid className="m-0 p-0 mb-3">
					<Grid.Row>
						<Grid.Column width={7}>
							<Form style={{ textAlign: 'left' }}>
								<Form.Input
									error={form.search !== ''}
									fluid
									name="Sök"
									label="Sök"
									placeholder="Sök"
									value={form.search}
									onChange={e => setForm({ ...form, search: e.target.value })}
								/>
								<Form.Group widths='equal'>
									<Form.Dropdown
										error={form.it_policy !== 'Filtrera Ej'}
										fluid
										selection
										name='IT Policy'
										label='IT Policy'
										options={optionsIT}
										value={form.it_policy}
										onChange={(e, val) => setForm({ ...form, it_policy: val.value })}
									/>
									<Form.Dropdown
										error={form.drivers_license !== 'Filtrera Ej'}
										fluid
										selection
										name='Körkort'
										label='Körkort'
										options={optionsDriving}
										value={form.drivers_license}
										onChange={(e, val) => setForm({ ...form, drivers_license: val.value })}
									/>
									<Form.Dropdown
										error={form.group !== 'Filtrera Ej'}
										fluid
										selection
										name='Grupp'
										label='Grupp'
										options={optionsGroup}
										value={form.group}
										onChange={(e, val) => setForm({ ...form, group: val.value })}
									/>
									<Form.Dropdown
										error={form.employment_type !== 'Filtrera Ej'}
										fluid
										selection
										name='Anställningstyp'
										label='Anställningstyp'
										options={optionsEmployment}
										value={form.employment_type}
										onChange={(e, val) => setForm({ ...form, employment_type: val.value })}
									/>
								</Form.Group>
								<Form.Group widths='equal'>
									<Form.Dropdown
										error={form.home_area !== 'Filtrera Ej'}
										fluid
										selection
										name='Hembas'
										label='Hembas'
										options={optionsHome}
										value={form.home_area}
										onChange={(e, val) => setForm({ ...form, home_area: val.value })}
									/>
									<Form.Dropdown
										error={form.card !== 'Filtrera Ej'}
										fluid
										selection
										name='ID Kort'
										label='ID Kort'
										options={optionsCard}
										value={form.card}
										onChange={(e, val) => setForm({ ...form, card: val.value })}
									/>
									<Form.Dropdown
										error={form.phone_status !== 'Filtrera Ej'}
										fluid
										selection
										name='Telefon Status'
										label='Telefon Status'
										options={optionsPhone}
										value={form.phone_status}
										onChange={(e, val) => setForm({ ...form, phone_status: val.value, phone_id: -1 })}
									/>
									<Form.Dropdown
										error={form.sith_status !== 'Filtrera Ej'}
										fluid
										selection
										name='SITH Status'
										label='SITH Status'
										options={optionsSith}
										value={form.sith_status}
										onChange={(e, val) => setForm({ ...form, sith_status: val.value })}
									/>
								</Form.Group>
								<Form.Group widths='equal'>
									<Form.Dropdown
										error={form.active !== 'Filtrera Ej'}
										fluid
										selection
										name='Aktiv'
										label='Aktiv'
										options={optionsActive}
										value={form.active}
										onChange={(e, val) => setForm({ ...form, active: val.value })}
									/>
									<Form.Dropdown
										error={form.admin !== 'Filtrera Ej'}
										fluid
										selection
										name='Admin'
										label='Admin'
										options={optionsAdmin}
										value={form.admin}
										onChange={(e, val) => setForm({ ...form, admin: val.value })}
									/>
									<Form.Dropdown
										error={form.education !== 'Filtrera Ej'}
										fluid
										selection
										name='Utbildning'
										label='Utbildning'
										options={optionsEducation}
										value={form.education}
										onChange={(e, val) => setForm({ ...form, education: val.value })}
									/>
									<Form.Dropdown
										error={form.door_key !== 'Filtrera Ej'}
										fluid
										selection
										name='Nyckelbricka'
										label='Nyckelbricka'
										options={optionsDoorKey}
										value={form.door_key}
										onChange={(e, val) => setForm({ ...form, door_key: val.value })}
									/>
								</Form.Group>
							</Form>
						</Grid.Column>
						<Grid.Column width={2}>
							<Divider vertical>Filter</Divider>
						</Grid.Column>
						<Grid.Column width={7} verticalAlign="middle">
							<Button
								size="massive"
								fluid
								color="green"
								onClick={handleNewClick}
							>
								Ny Personal
							</Button>
						</Grid.Column>
					</Grid.Row>
				</Grid >
				{
					isDownloading &&
					<BeatLoader color="green" />
				}
				{
					!isDownloading &&
					<>
						<Table sortable selectable striped className="p-0 m-0">
							<Table.Header>
								<Table.Row>
									{headers}
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{filteredStaff.map((item, index) => {
									if (item.animating > 0) return (
										<Table.Row key={'cars' + index} style={{ height: `${item.animating}px` }} verticalAlign="middle" onClick={() => openStaffBox(item.id, item.name, item)}>
											<Table.Cell width={3} style={{ height: `${item.animating}px`, textAlign: 'left' }} className="p-2" verticalAlign="middle">
												{item.name}
											</Table.Cell>
											<Table.Cell width={1} style={{ height: `${item.animating}px` }} className="p-2" verticalAlign="middle">
												{item.phone_status === 'Fungerar' ? item.phone_id : item.phone_status === 'Osäker' ? '?' : item.phone_status}
											</Table.Cell>
											<Table.Cell width={1} style={{ height: `${item.animating}px` }} className="p-0" verticalAlign="middle">
												<div
													className="w-100 h-100 p-2"
													style={{ backgroundColor: item.sith_status === 'Ja' ? 'rgba(0, 255, 0, 0.1)' : item.sith_status === 'Nej' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255, 255, 0, 0.1)' }}
												>
													{item.sith_status}
												</div>
											</Table.Cell>
											<Table.Cell width={1} style={{ height: `${item.animating}px` }} className="p-0" verticalAlign="middle">
												<div
													className="w-100 h-100 p-2"
													style={{ backgroundColor: getCityColor(item.home_area, 0.1) }}
												>
													{item.home_area}
												</div>
											</Table.Cell>
											<Table.Cell width={1} style={{ height: `${item.animating}px` }} className="p-2" verticalAlign="middle">
												{item.staff_number}
											</Table.Cell>
											<Table.Cell width={1} style={{ height: `${item.animating}px` }} className="p-0" verticalAlign="middle">
												<div className="w-100 h-100 p-2"
													style={{ backgroundColor: item.delegation && (new Date(item.delegation)).getTime() - (new Date(Date.now())).getTime() < 4340851016 ? 'red' : '' }}
												>
													{item.delegation}
												</div>
											</Table.Cell>
											<Table.Cell width={1} style={{ height: `${item.animating}px` }} className="p-0" verticalAlign="middle">
												<div className="w-100 h-100 p-2"
													style={{ backgroundColor: item.employment_expiry && (new Date(item.employment_expiry)).getTime() - (new Date(Date.now())).getTime() < 4340851016 ? 'red' : '' }}
												>
													{item.employment_expiry}
												</div>
											</Table.Cell>
											<Table.Cell width={3} style={{ height: `${item.animating}px` }} className="p-2" verticalAlign="middle">
												{emojis(item)}
											</Table.Cell>
											<Table.Cell width={4} style={{ height: `${item.animating}px` }} className="p-0" verticalAlign="middle">
												<div className="w-100 h-100 p-2">
													{item.comment}
												</div>
											</Table.Cell>
										</Table.Row>
									);
								})}
							</Table.Body>
						</Table>
					</>
				}
			</div >
		</center >
	);
}

export default Allstaff;