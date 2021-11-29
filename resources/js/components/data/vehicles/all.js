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
} from 'semantic-ui-react';
import { Router, Route, Switch, Link, useParams, useHistory, useLocation } from 'react-router-dom';
import ReactFrappeChart from 'react-frappe-charts';
import { GiCarWheel } from 'react-icons/gi';
import { ImCross } from 'react-icons/Im';
import { HiArrowLeft } from 'react-icons/Hi';

function AllVehicles(props) {
	const history = useHistory();
	const userObject = JSON.parse(localStorage.getItem('user'));
	const [vehicles, setVehicles] = useState([]);

	useEffect(() => {
		fetch(`/api/cars/`, {
			method: 'GET',
			headers: {
				'Authorization': userObject.token,
			}
		})
			.then(response => response.json())
			.then(data => {
				setVehicles(data);
			});
	}, [])

	function handleViewClick(id) {
		history.push(`/data/vehicles/view/${id}`);
	}

	function handleEditClick(id) {
		history.push(`/data/vehicles/edit/${id}`);
	}

	function handleDeleteClick(id) {

	}

	return (
		<div className="container-fluid center" style={{ width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: '0px' }}>
			<Grid celled style={{ backgroundColor: 'white' }}>
				<Grid.Row style={{ backgroundColor: 'lightgray' }}>
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
					return (
						<Grid.Row key={'cars' + index}>
							<Grid.Column width={2}>
								{`${item.plate} (${item.id})`}
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
								<Button fluid color="green" onClick={() => handleViewClick(item.id)}>Visa Bil</Button>
							</Grid.Column>
							<Grid.Column width={2}>
								<Button fluid color="yellow" onClick={() => handleEditClick(item.id)}>Ändra Bil</Button>
							</Grid.Column>
							<Grid.Column width={2}>
								<Button fluid color="red" onClick={() => handleDeleteClick(item.id)}>Radera</Button>
							</Grid.Column>
						</Grid.Row>
					);
				})}
			</Grid>
		</div>
	);
}

export default AllVehicles;