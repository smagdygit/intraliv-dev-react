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

function Allstaff(props) {
	const animateStep = 35;
	const animateLimit = 35;
	const history = useHistory();
	const userObject = JSON.parse(localStorage.getItem('user'));
	const [staff, setstaff] = useState([]);
	const [vehicleDeleting, setVehicleDeleting] = useState(false);
	const [staffShowing, setstaffShowing] = useState([]);
	const [updateList, setUpdateList] = useState(false);
	const [isDownloading, setIsDownloading] = useState(true);
	const [staffBoxOpen, setStaffBoxOpen] = useState(0);
	const [staffName, setStaffName] = useState('');
	const [person, setPerson] = useState({});

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
			active: false,
			education: false,
			door_key: false,
			card: 'Osäker',
			it_policy: 'Osäker',
			drivers_license: 'Osäker',
			comment: '',
			employment_expiry: new Date(Date.now()),
			delegation: new Date(Date.now()),
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

	return (
		<center>
			{!!staffBoxOpen && <Staff canceled={popupCanceled} sent={popupSent} id={staffBoxOpen} name={staffName} person={person} />}
			<div className="container-fluid center" style={{ width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: '0px' }}>
				<h1 className="display-1 mt-5" style={{ marginBottom: '100px', fontFamily: 'Roboto, sans-serif' }}>Personal</h1>

				{isDownloading &&
					<BeatLoader color="green" />
				}
				{!isDownloading &&
				<>
						<Table selectable striped className="p-0 m-0">
							<Table.Header>
								<Table.HeaderCell>
									<b><h3>Namn</h3></b>
								</Table.HeaderCell>
								<Table.HeaderCell width={1}>
									<b><h3>Tele</h3></b>
								</Table.HeaderCell>
								<Table.HeaderCell width={1}>
									<b><h3>SITH</h3></b>
								</Table.HeaderCell>
								<Table.HeaderCell width={1}>
									<b><h3>Stadsdel</h3></b>
								</Table.HeaderCell>
								<Table.HeaderCell width={1}>
									<b><h3>Anst. ID</h3></b>
								</Table.HeaderCell>
								<Table.HeaderCell width={2}>
									<b><h3>Delegering</h3></b>
								</Table.HeaderCell>
								<Table.HeaderCell width={2}>
									<b><h3>Övrigt</h3></b>
								</Table.HeaderCell>
								<Table.HeaderCell width={4}>
									<b><h3>Kommentar</h3></b>
								</Table.HeaderCell>
							</Table.Header>
							{staff.map((item, index) => {
								if (item.animating > 0) return (
									<Table.Row key={'cars' + index} style={{ height: `${item.animating}px` }} verticalAlign="middle" onClick={() => openStaffBox(item.id, item.name, item)}>
										<Table.Cell width={4} style={{ height: `${item.animating}px`, textAlign: 'left' }} className="p-2" verticalAlign="middle">
											{item.name}
										</Table.Cell>
										<Table.Cell width={1} style={{ height: `${item.animating}px` }} className="p-2" verticalAlign="middle">
											{item.phone_status === 'Ja' ? item.phone_id : item.phone_status}
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
												style={{ backgroundColor: getCityColor(item.home_area, 0.1)}}
											>
												{item.home_area}
											</div>
										</Table.Cell>
										<Table.Cell width={1} style={{ height: `${item.animating}px` }} className="p-2" verticalAlign="middle">
											{item.staff_number}
										</Table.Cell>
										<Table.Cell width={2} style={{ height: `${item.animating}px` }} className="p-0" verticalAlign="middle">
											<div className="w-100 h-100 p-2" >
												{item.delegation}
											</div>
										</Table.Cell>
										<Table.Cell width={2} style={{ height: `${item.animating}px` }} className="p-2" verticalAlign="middle">
											{emojis(item)}
										</Table.Cell>
										<Table.Cell width={4} style={{ height: `${item.animating}px` }} className="p-0" verticalAlign="middle">
											<div
												className="w-100 h-100 p-2"
												style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
											>
												{item.comment}
											</div>
										</Table.Cell>
									</Table.Row>
								);
							})}
						</Table>
						<Grid.Row style={{ backgroundColor: 'lightgray' }} verticalAlign="middle" className="p-0">
							<Grid.Column width={4}>
								<b><h3>Namn</h3></b>
							</Grid.Column>
							<Grid.Column width={1}>
								<b><h3>Tele</h3></b>
							</Grid.Column>
							<Grid.Column width={1}>
								<b><h3>SITH</h3></b>
							</Grid.Column>
							<Grid.Column width={1}>
								<b><h3>Stadsdel</h3></b>
							</Grid.Column>
							<Grid.Column width={1}>
								<b><h3>Anst. ID</h3></b>
							</Grid.Column>
							<Grid.Column width={2}>
								<b><h3>IT Policy</h3></b>
							</Grid.Column>
							<Grid.Column width={2}>
								<b><h3>Misc.</h3></b>
							</Grid.Column>
							<Grid.Column width={4}>
								<b><h3>Kommentar</h3></b>
							</Grid.Column>
						</Grid.Row>
						
						{staff.map((item, index) => {
					if (item.animating > 0) return (
						<Grid.Row key={'cars' + index} style={{ height: `${item.animating}px` }} verticalAlign="middle" onClick={() => openStaffBox(item.id, item.name, item)}>
							<Grid.Column width={4} style={{ height: `${item.animating}px`, textAlign: 'left' }} className="p-2" verticalAlign="middle">
								{item.name}
							</Grid.Column>
							<Grid.Column width={1} style={{ height: `${item.animating}px` }} className="p-2" verticalAlign="middle">
								{item.phone_status === 'Ja' ? item.phone_id : item.phone_status}
							</Grid.Column>
							<Grid.Column color={item.sith_status === 'Ja' ? 'green' : item.sith_status === 'Nej' ? 'red' : 'yellow'} width={1} style={{ height: `${item.animating}px` }} className="p-2" verticalAlign="middle">
								{item.sith_status}
							</Grid.Column>
							<Grid.Column width={1} style={{ height: `${item.animating}px` }} className="p-2" verticalAlign="middle">
								{item.home_area}
							</Grid.Column>
							<Grid.Column width={1} style={{ height: `${item.animating}px` }} className="p-2" verticalAlign="middle">
								{item.staff_number}
							</Grid.Column>
							<Grid.Column color={item.it_policy === 'Påskrivet' ? 'green' : item.it_policy === 'Ska EJ Skriva' ? 'red' : 'yellow'} width={2} style={{ height: `${item.animating}px` }} className="p-2" verticalAlign="middle">
								{item.it_policy}
							</Grid.Column>
							<Grid.Column width={2} style={{ height: `${item.animating}px` }} className="p-2" verticalAlign="middle">
								{emojis(item)}
							</Grid.Column>
							<Grid.Column width={4} style={{ height: `${item.animating}px` }} className="p-0" verticalAlign="middle">
								<div className="m-0" style={{ backgroundColor: 'green' }}>
									<div className="m-2">
										{item.comment}
									</div>
								</div>
							</Grid.Column>
						</Grid.Row>
					);
				})}
				{/*<Grid.Row style={{ height: '33px' }}>
					<Grid.Column>
						<h1>COOOL!</h1>
					</Grid.Column>
			</Grid.Row>*/}
				<Grid.Row style={{ backgroundColor: 'white' }}>
					<Grid.Column width={16}>
						<Button fluid color="green" disabled={vehicleDeleting} onClick={handleNewClick}>Ny Personal</Button>
					</Grid.Column>
				</Grid.Row>
				</>
				}
			</div>
		</center >
	);
}

export default Allstaff;