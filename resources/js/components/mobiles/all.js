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
import Staff from './mobile';
import { groupBy } from 'lodash';

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

	// DOWNLOAD THE CARS
	useEffect(() => {
		fetch(`/api/mobiles/`, {
			method: 'GET',
			headers: {
				'Authorization': userObject.token,
			}
		})
			.then(response => response.json())
			.then(data => {
				const moddedArray = data.mobiles.map(item => {
					item.animating = 0;
					return item;
				});
				//moddedArray[0].animating = 70;
				//moddedArray[1].animating = 25;
				setstaff([...moddedArray]);
				setVehicleDeleting(false);
				//setInterval((aniLoop), 100);
				setIsDownloading(false);

			});
	}, [updateList]);

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
	function handleNewClick(id) {
		setStaffBoxOpen(-1);
		setStaffName('Ny Personal');
		setPerson({
			wp: '',
			name: '',
			model: '',
			usable: 'Osäker',
			installed: 'Osäker',
			hardware: 'Osäker',
			phoniro_status: 'Osäker',
			phoniro_home_area: 'Osäker',
			actual_home_area: 'Osäker',
			location: 'Osäker',
			sim_status: 'Osäker',
			sim_code: '',
			sim_number: '',
			belongs_to: 'Osäker',
			comment: '',
		});
	}

	// DELETE THE CAR
	function handleDeleteClick(id) {
		setVehicleDeleting(true);
		fetch(`/api/cars/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': userObject.token,
			},
		})
			.then(res => res.json())
			.then((result) => {
				if (result.status === "success") {
					setUpdateList(!updateList);
				} else {
					alert(result.text);
				}
			},
				(error) => {
					alert('Error, kontakta Systemadministratör');
				}
			);
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
		{ data: 'name', name: 'Namn', width: 1 },
		{ data: 'usable', name: 'Användbar', width: 1 },
		{ data: 'installed', name: 'Installerad', width: 1 },
		{ data: 'hardware', name: 'Hårdvara', width: 1 },
		{ data: 'phoniro_status', name: 'Phoniro Status', width: 1 },
		{ data: 'phoniro_home_area', name: 'Phoniro Area', width: 1 },
		{ data: 'actual_home_area', name: 'Tillhör Area', width: 1 },
		{ data: 'location', name: 'Finns i', width: 1 },
		{ data: 'belongs_to', name: 'Tillhör', width: 1 },
		{ data: 'sim_status', name: 'SIM', width: 1 },
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

	const none = '';
	const green = 'rgba(0, 255, 0, 0.1)';
	const red = 'rgba(0, 255, 0, 0.1)';
	const yellow = 'rgba(255, 255, 0, 0.1)';

	return (
		<center>
			{!!staffBoxOpen && <Staff canceled={popupCanceled} sent={popupSent} id={staffBoxOpen} name={staffName} person={person} />}
			<div className="container-fluid center" style={{ width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: '0px' }}>
				<h1 className="display-1 mt-5" style={{ marginBottom: '100px', fontFamily: 'Roboto, sans-serif' }}>Telefoner</h1>

				{isDownloading &&
					<BeatLoader color="green" />
				}
				{!isDownloading &&
					<Table sortable selectable striped className="p-0 m-0">
						<Table.Header>
							<Table.Row>
								{headers}
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{staff.map((item, index) => {
								if (item.animating > 0) return (
									<Table.Row key={'cars' + index} style={{ height: `${item.animating}px` }} verticalAlign="middle" onClick={() => openStaffBox(item.id, item.name, item)}>
										<Table.Cell width={1} style={{ height: `${item.animating}px` }} className="p-0" verticalAlign="middle">
											<div
												className="w-100 h-100 p-2"
											>
												{item.name}
											</div>
										</Table.Cell>
										<Table.Cell width={1} style={{ height: `${item.animating}px` }} className="p-0" verticalAlign="middle">
											<div
												className="w-100 h-100 p-2"
												style={{ backgroundColor: item.usable === 'Ja' ? green : item.usable === 'Nej' ? red : yellow }}
											>
												{item.usable}
											</div>
										</Table.Cell>
										<Table.Cell width={1} style={{ height: `${item.animating}px` }} className="p-0" verticalAlign="middle">
											<div
												className="w-100 h-100 p-2"
												style={{ backgroundColor: item.hardware === 'Ej Installerad' ? red : item.hardware === 'Osäker' ? yellow : green }}
											>
												{item.installed}
											</div>
										</Table.Cell>
										<Table.Cell width={1} style={{ height: `${item.animating}px` }} className="p-0" verticalAlign="middle">
											<div
												className="w-100 h-100 p-2"
												style={{ backgroundColor: item.hardware === 'Fungerar' ? green : item.hardware === 'Osäker' ? yellow : red }}
											>
												{item.hardware}
											</div>
										</Table.Cell>
										<Table.Cell width={1} style={{ height: `${item.animating}px` }} className="p-0" verticalAlign="middle">
											<div
												className="w-100 h-100 p-2"
												style={{ backgroundColor: item.phoniro_status === 'Upplagd med Stadsdel' ? green : item.phoniro_status === 'Ej Upplagd' ? red : yellow }}
											>
												{item.phoniro_status}
											</div>
										</Table.Cell>
										<Table.Cell width={1} style={{ height: `${item.animating}px` }} className="p-0" verticalAlign="middle">
											<div
												className="w-100 h-100 p-2"
												style={{ backgroundColor: getCityColor(item.phoniro_home_area, 0.1) }}
											>
												{item.phoniro_home_area}
											</div>
										</Table.Cell>
										<Table.Cell width={1} style={{ height: `${item.animating}px` }} className="p-0" verticalAlign="middle">
											<div
												className="w-100 h-100 p-2"
												style={{ backgroundColor: getCityColor(item.actual_home_area, 0.1) }}
											>
												{item.actual_home_area}
											</div>
										</Table.Cell>
										<Table.Cell width={1} style={{ height: `${item.animating}px` }} className="p-0" verticalAlign="middle">
											<div
												className="w-100 h-100 p-2"
												style={{ backgroundColor: item.location === 'Ledig (Sysadmin)' ? green : none }}
											>
												{item.location}
											</div>
										</Table.Cell>
										<Table.Cell width={1} style={{ height: `${item.animating}px` }} className="p-0" verticalAlign="middle">
											<div
												className="w-100 h-100 p-2"
												style={{ backgroundColor: item.belongs_to === 'Ledig (Sysadmin)' ? green : none }}
											>
												{item.belongs_to}
											</div>
										</Table.Cell>
										<Table.Cell width={1} style={{ height: `${item.animating}px` }} className="p-0" verticalAlign="middle">
											<div
												className="w-100 h-100 p-2"
												style={{ backgroundColor: (item.sim_status === 'Finns Ej' || item.sim_status === 'Sim Dött') ? red : item.sim_status === 'Installerad + PIN Avstängt' ? green : yellow }}
											>
												{item.sim_status}
											</div>
										</Table.Cell>
										<Table.Cell width={4} style={{ height: `${item.animating}px` }} className="p-0" verticalAlign="middle">
											<div
												className="w-100 h-100 p-2"
											>
												{item.comment}
											</div>
										</Table.Cell>
									</Table.Row>
								);
							})}
						</Table.Body>
					</Table>
				}
			</div>
		</center>
	);
}

export default Allstaff;