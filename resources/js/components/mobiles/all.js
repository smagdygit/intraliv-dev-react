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
	Card
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
	const animateStep = 5;
	const animateLimit = 50;
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

	return (
		<center>
			{!!staffBoxOpen && <Staff canceled={popupCanceled} sent={popupSent} id={staffBoxOpen} name={staffName} person={person} />}
			<div className="container-fluid center" style={{ width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: '0px' }}>
				<h1 className="display-1 mt-5" style={{ marginBottom: '100px', fontFamily: 'Roboto, sans-serif' }}>Telefoner</h1>

				{isDownloading &&
					<BeatLoader color="green" />
				}
				{!isDownloading &&
					<Dimmer.Dimmable as={Grid} dimmed={true} celled style={{ backgroundColor: 'white', marginBottom: '600px' }}>
						<Dimmer active={false}>
							<BeatLoader color="green" />
						</Dimmer>
						<Grid.Row style={{ backgroundColor: 'lightgray' }} verticalAlign="middle">
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
									<Grid.Column width={4} style={{ height: `${item.animating}px` }}>
										{`${item.name}`}
									</Grid.Column>
									<Grid.Column width={1} style={{ height: `${item.animating}px` }}>
										{item.phone_status === 'Ja' ? item.phone_id : item.phone_status}
									</Grid.Column>
									<Grid.Column width={1} style={{ height: `${item.animating}px` }}>
										{item.sith_status}
									</Grid.Column>
									<Grid.Column width={1} style={{ height: `${item.animating}px` }}>
										{item.home_area}
									</Grid.Column>
									<Grid.Column width={1} style={{ height: `${item.animating}px` }}>
										{item.staff_number}
									</Grid.Column>
									<Grid.Column width={2} style={{ height: `${item.animating}px` }}>
										{item.it_policy}
									</Grid.Column>
									<Grid.Column width={2} style={{ height: `${item.animating}px` }}>
										{'ooo'}
									</Grid.Column>
									<Grid.Column width={4} style={{ height: `${item.animating}px` }}>
										{item.comment}
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
					</Dimmer.Dimmable>
				}
			</div>
		</center>
	);
}

export default Allstaff;