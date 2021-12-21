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
	Dimmer
} from 'semantic-ui-react';
import { Router, Route, Switch, Link, useParams, useHistory, useLocation } from 'react-router-dom';
import ReactFrappeChart from 'react-frappe-charts';
import { GiCarWheel } from 'react-icons/gi';
import { ImCross } from 'react-icons/Im';
import { HiArrowLeft } from 'react-icons/Hi';
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";

function AllVehicles(props) {
	const history = useHistory();
	const userObject = JSON.parse(localStorage.getItem('user'));
	const [vehicles, setVehicles] = useState([]);
	const [vehicleDeleting, setVehicleDeleting] = useState(false);
	const [vehiclesShowing, setVehiclesShowing] = useState([]);
	const [updateList, setUpdateList] = useState(false);
	const [isDownloading, setIsDownloading] = useState(true);

	// DOWNLOAD THE CARS
	useEffect(() => {
		fetch(`/api/cars/`, {
			method: 'GET',
			headers: {
				'Authorization': userObject.token,
			}
		})
			.then(response => response.json())
			.then(data => {
				const moddedArray = data.map(item => {
					item.animating = 0;
					return item;
				});
				//moddedArray[0].animating = 70;
				//moddedArray[1].animating = 25;
				setVehicles([...moddedArray]);
				setVehicleDeleting(false);
				//setInterval((aniLoop), 100);
				setIsDownloading(false);
			});
	}, [updateList]);

	//console.log("real", vehicles);

	useEffect(() => {
		if (vehicles.length > 0 && vehicles[vehicles.length - 1].animating < 70) {
			setTimeout(() => {
				const moddedArray = [...vehicles];
				const finalArray = moddedArray.map((item, index) => {
					if ((moddedArray[index - 1] === undefined || moddedArray[index - 1].animating === 70) && item.animating < 70) item.animating += 14;
					return item;
				});
				setVehicles([...finalArray]);
			}, 1);
		}
	}, [vehicles])

	function aniLoop() {
		const moddedArray = [...vehicles];
		const finalArray = moddedArray.map((item, index) => {
			if (item[index - 1] && item[index - 1].animating === 70 && item.animating < 70) item.animating++;
			return item;
		});
		//setVehicles([...finalArray]);
		//console.log(finalArray);
		//setInterval(aniLoop, 100)
	}

	// ADD A CAR
	function handleNewClick(id) {
		history.push(`/fordon/lägg-till`);
	}

	// VIEW THE CAR
	function handleViewClick(id, plate) {
		history.push(`/fordon/visa/${id}/${plate}`);
	}

	// EDIT THE CAR
	function handleEditClick(id) {
		history.push(`/fordon/ändra/${id}`);
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
					alert('Error, kontakta Systeradministratör');
				}
			);
	}

	return (
		<center>
			<div className="container-fluid center" style={{ width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: '0px' }}>
				<h1 className="display-1 mt-5" style={{ marginBottom: '100px', fontFamily: 'Roboto, sans-serif' }}>Fordon</h1>

				{isDownloading &&
					<BeatLoader color="green" />
				}
				{!isDownloading &&
					<Dimmer.Dimmable as={Grid} dimmed={true} celled style={{ backgroundColor: 'white', marginBottom: '600px' }}>
						<Dimmer active={false}>
							<BeatLoader color="green" />
						</Dimmer>
						<Grid.Row style={{ backgroundColor: 'lightgray' }} verticalAlign="middle">
							<Grid.Column width={2}>
								<b><h3>Skylt</h3></b>
							</Grid.Column>
							<Grid.Column width={2}>
								<b><h3>Modell</h3></b>
							</Grid.Column>
							<Grid.Column width={2}>
								<b><h3>Placering</h3></b>
							</Grid.Column>
							<Grid.Column width={2}>
								<b><h3>Automat</h3></b>
							</Grid.Column>
							<Grid.Column width={2}>
								<b><h3>Visa Bil</h3></b>
							</Grid.Column>
							<Grid.Column width={2}>
								<b><h3>Ändra Bil</h3></b>
							</Grid.Column>
							<Grid.Column width={2}>
								<b><h3>Radera</h3></b>
							</Grid.Column>
						</Grid.Row>
						{vehicles.map((item, index) => {
							if (item.animating > 0) return (
								<Grid.Row key={'cars' + index} style={{ height: `${item.animating}px` }} verticalAlign="middle">
									<Grid.Column width={2}>
										{`${item.plate}`}
									</Grid.Column>
									<Grid.Column width={2}>
										{item.model}
									</Grid.Column>
									<Grid.Column width={2}>
										{item.station}
									</Grid.Column>
									<Grid.Column width={2}>
										{item.automatic ? 'Auto' : 'Manuell'}
									</Grid.Column>
									<Grid.Column width={2}>
										<Button fluid color="green" disabled={vehicleDeleting} onClick={() => handleViewClick(item.id, item.plate)}>Visa Bil</Button>
									</Grid.Column>
									<Grid.Column width={2}>
										<Button fluid color="yellow" disabled={vehicleDeleting} onClick={() => handleEditClick(item.id)}>Ändra Bil</Button>
									</Grid.Column>
									<Grid.Column width={2}>
										<Button fluid color="red" disabled={vehicleDeleting} onClick={() => handleDeleteClick(item.id)}>Radera</Button>
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
								<Button fluid color="green" disabled={vehicleDeleting} onClick={handleNewClick}>Ny Bil</Button>
							</Grid.Column>
						</Grid.Row>
					</Dimmer.Dimmable>
				}
			</div>
		</center>
	);
}

export default AllVehicles;