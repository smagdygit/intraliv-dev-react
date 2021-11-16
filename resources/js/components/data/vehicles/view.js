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
import { Router, Route, Switch, Link, useParams } from 'react-router-dom';
import ReactFrappeChart from 'react-frappe-charts';
import { GiCarWheel } from 'react-icons/gi';
import { ImCross } from 'react-icons/Im';
import { HiArrowLeft } from 'react-icons/Hi';


const mileage = {
	labels: ["19-07", "21-03", "21-07"],

	datasets: [
		{
			name: "Miltal",
			values: [4000, 6320, 6999],
			chartType: 'line'
		},
		{
			name: "Försäkring",
			values: [4000, 5000, 5500],
			chartType: 'line'
		}
	]
}

const mileageAverage = {
	labels: ["21-03", "21-07"],
	datasets: [
		{
			name: "Miltal",
			values: [3480, 2037],
			chartType: 'line'
		},
		{
			name: "Försäkring",
			values: [1500, 1500],
			chartType: 'line'
		}
	]
}

const fuelCost = {
	labels: ["19-07-25", "19-07-31", "19-08-14", "19-09-01", "19-09-15", "-19-10-03"],
	datasets: [
		{
			name: "Bensinkostnad",
			values: [309, 500, 470, 350, 674, 555],
			chartType: 'line'
		},
	]
}

const fuelCostMonth = {
	labels: ["19-07", "19-08", "19-09", "19-10"],
	datasets: [
		{
			name: "Bensinkostnad",
			values: [809, 820, 350, 555],
			chartType: 'line'
		},
	]
}

const optionsMonths = [
	{ key: '01', text: 'Jan', value: '01' },
	{ key: '02', text: 'Feb', value: '01' },
	{ key: '03', text: 'Mars', value: '01' },
	{ key: '04', text: 'April', value: '04' },
	{ key: '05', text: 'Maj', value: '05' },
	{ key: '06', text: 'Juni', value: '06' },
	{ key: '07', text: 'Juli', value: '07' },
	{ key: '08', text: 'Aug', value: '08' },
	{ key: '09', text: 'Sep', value: '09' },
	{ key: '10', text: 'Okt', value: '10' },
	{ key: '11', text: 'Nov', value: '11' },
	{ key: '12', text: 'Dec', value: '12' },
]

const optionsYears = [
	{ key: '2019', text: '2019', value: '2019' },
	{ key: '2020', text: '2020', value: '2020' },
	{ key: '2021', text: '2021', value: '2021' },
	{ key: '2022', text: '2022', value: '2022' },
	{ key: '2023', text: '2023', value: '2023' },
]

const fuelArray = [
	{ date: '19-07-25', year: '2019', month: '07', day: '25', cost: '309' },
	{ date: '19-07-31', year: '2019', month: '07', day: '31', cost: '500' },
	{ date: '19-08-14', year: '2019', month: '08', day: '14', cost: '470' },
	{ date: '19-09-01', year: '2019', month: '09', day: '01', cost: '350' },
	{ date: '19-09-15', year: '2019', month: '09', day: '15', cost: '674' },
	{ date: '19-10-03', year: '2019', month: '10', day: '03', cost: '555' },
]

const carData = {
	wheels: {
		winter: {
			type: 'Allround',
			amount: 2,
		},
		summer: {
			type: 'Summer',
			amount: 4,
		},
		current: 'summer',
	},
	insuranceCost: '6601',
	plate: 'LKJ689',
	model: 'Toyota Aygo 1.0 2016',
	color: 'Vit',
	location: 'Lundby',
	bought: '2019-01-01',
	service: {
		nextHalf: '2019-09-30',
		nextFull: '2021-11-30',
		history: [
			{
				type: 'Halvservice',
				date: '2020-01-10',
				location: 'Toyota Göteborg',
				comment: 'Went well, I guess!',
			},
			{
				type: 'Fullservice',
				date: '2019-01-10',
				location: 'Toyota Göteborg',
				comment: 'Went well, I guess!',
			}
		]
	},
	inspection: {
		next: '2019-10-30',
		history: [
			{
				date: '2020-01-10',
				location: 'Toyota Göteborg',
				comment: 'Went well, I guess!',
			},
		]
	},
	fuel: [
		{ date: '19-07-25', year: '2019', month: '07', day: '25', cost: '309' },
		{ date: '19-07-31', year: '2019', month: '07', day: '31', cost: '500' },
		{ date: '19-08-14', year: '2019', month: '08', day: '14', cost: '470' },
		{ date: '19-09-01', year: '2019', month: '09', day: '01', cost: '350' },
		{ date: '19-09-15', year: '2019', month: '09', day: '15', cost: '674' },
		{ date: '19-10-03', year: '2019', month: '10', day: '03', cost: '555' },
	],
	mileage: [
		{ date: '19-07-25', year: '2019', month: '07', day: '25', cost: '4000' },
		{ date: '19-09-01', year: '2019', month: '09', day: '01', cost: '6320' },
		{ date: '19-10-03', year: '2019', month: '10', day: '03', cost: '6999' },
	]
}

function Vehicles(props) {
	const userObject = JSON.parse(localStorage.getItem('user'));
	const [mileageAverageOpen, setMileageAverageOpen] = useState(false);
	const [mileageOpen, setMileageOpen] = useState(false);
	const [fuelCostOpen, setFuelCostOpen] = useState(false);
	const [fuelCostMonthOpen, setFuelCostMonthOpen] = useState(false);
	const [downloading, setDownloading] = useState(true);
	const [car, setCar] = useState({});
	const [carFuel, setCarFuel] = useState([]);
	const [carFuelChart, setCarFuelChart] = useState([]);
	let { id } = useParams();

	useEffect(() => {
		fetch(`/api/cars/${id}`, {
			method: 'GET',
			headers: {
				'Authorization': userObject.token,
			}
		})
			.then(response => response.json())
			.then(data => {

				//Set car
				setCar(data.car);

				//Set fuel
				const carFuel = (data.car.fuel.map((item) => {
					const date = new Date(item.date);
					return ({ date: item.date, year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDay(), cost: item.cost });
				}));

				setCarFuelChart({
					labels: carFuel.map(e => e.date),
					datasets: [{
						name: 'Bensinkostnad',
						values: carFuel.map(e => e.cost),
						chartType: 'line'
					}]
				})

				setCarFuel([carFuel]);



				/*const fuelCost = {
		labels: ["19-07-25", "19-07-31", "19-08-14", "19-09-01", "19-09-15", "-19-10-03"],
		datasets: [
		{
			name: "Bensinkostnad",
			values: [309, 500, 470, 350, 674, 555],
			chartType: 'line'
		},
	]
}
*/

				//Set downloading to false
				setDownloading(false);
			});
	}, [])

	const fuelDivs = fuelArray.map((item, index) => {
		return (
			<div key={'fuelDivs' + index} style={{ marginBottom: '10px' }}>
				<Input type='text' placeholder='Dag' action value={item.day}>
					<input />
					<Select defaultValue={item.month} options={optionsMonths} />
					<Select defaultValue={item.year} options={optionsYears} />
					<Button type='submit' color="green">Update</Button>
					<Button type='submit' color="red">Delete</Button>
				</Input>
				<br />
			</div>
		)
	});

	const wheelsHtml = { winterImages: [], winterText: [], summerImages: [], summerText: [] };
	for (let i = 1; i < 5; i++) {
		wheelsHtml.winterImages.push(
			<Grid.Column width={3} key={'winwheimg' + i}>
				{i <= car.wheels_winter_amount ? <h1 className="display-3"><GiCarWheel /></h1> : <h1 className="display-3 text-danger"><ImCross /></h1>}
			</Grid.Column>
		);
		wheelsHtml.winterText.push(
			<Grid.Column width={3} key={'winwhetxt' + i}>
				{i <= car.wheels_winter_amount ? <h3>{carData.wheels.winter.type} <Icon name="snowflake" /></h3> : <></>}
			</Grid.Column>
		);
		wheelsHtml.summerImages.push(
			<Grid.Column width={3} key={'winwheimg' + i}>
				{i <= car.wheels_summer_amount ? <h1 className="display-3"><GiCarWheel /></h1> : <h1 className="display-3 text-danger"><ImCross /></h1>}
			</Grid.Column>
		);
		wheelsHtml.summerText.push(
			<Grid.Column width={3} key={'winwhetxt' + i}>
				{i <= car.wheels_summer_amount ? <h3>Sommar</h3> : <></>}
			</Grid.Column>
		);
	}
	if (!!car.winter_wheels_on) {
		wheelsHtml.winterImages.push(
			<Grid.Column width={3} key={'winwheimgxtra'}>
				<h1 className="display-3 text-success"><HiArrowLeft /></h1>
			</Grid.Column>);
		wheelsHtml.winterText.push(
			<Grid.Column width={3} key={'winwheimgxtra'}>
				<h3 className="text-success">Nuvarande</h3>
			</Grid.Column>);
	} else {
		wheelsHtml.summerImages.push(
			<Grid.Column width={3} key={'winwheimgxtra'}>
				<h1 className="display-3 text-success"><HiArrowLeft /></h1>
			</Grid.Column>);
		wheelsHtml.summerText.push(
			<Grid.Column width={3} key={'winwheimgxtra'}>
				<h3 className="text-success">Nuvarande</h3>
			</Grid.Column>);
	}


	const tags = [];
	tags.push(!!car.benefit ? <p className="text-success d-inline">Förmånsbil</p> : <del className="text-danger d-inline">Förmånsbil</del>);
	tags.push(!!car.abax ? <p className="text-success d-inline">Abax</p> : <del className="text-danger d-inline">Abax</del>);
	tags.push(!!car.employee_car ? <p className="text-success d-inline">Personalbil</p> : <del className="text-danger d-inline">Personalbil</del>);
	tags.push(!!car.automatic ? <p className="text-success d-inline">Automat</p> : <del className="text-danger d-inline">Automat</del>);

	return (
		<div className="container-fluid center" style={{ width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: '0px' }}>
			{!downloading &&
				<center>
					<h1 className="display-1">{car.plate}</h1>
					<h3 style={{ marginBottom: '100px' }}>{car.model}</h3>
					{/*<div>
					<Input />
					<Dropdown defaultValue='01' options={optionsMonths} />
					<Dropdown defaultValue='2019' options={optionsYears} />
				</div>*/}
					<Grid verticalAlign='middle'>
						<Grid.Row className="mb-5">
							<Grid.Column width={8}>
								<Grid verticalAlign='middle'>
									<Grid.Row>
										{wheelsHtml.winterImages}
									</Grid.Row>
									<Grid.Row>
										{wheelsHtml.winterText}
									</Grid.Row>
									<Grid.Row>
										{wheelsHtml.summerImages}
									</Grid.Row>
									<Grid.Row>
										{wheelsHtml.summerText}
									</Grid.Row>
								</Grid>
							</Grid.Column>
							<Grid.Column width={3} />
							<Grid.Column width={5}>
								<center>
									<Grid className="h2" textAlign="right">
										<Grid.Row>
											<Grid.Column width={8} textAlign="left">
												Försäkring / år
											</Grid.Column>
											<Grid.Column width={8}>
												{car.insurance_cost}
											</Grid.Column>
										</Grid.Row>
										<Grid.Row>
											<Grid.Column width={8} textAlign="left">
												Köpt
											</Grid.Column>
											<Grid.Column width={8}>
												???
											</Grid.Column>
										</Grid.Row>
										<Grid.Row>
											<Grid.Column width={8} textAlign="left">
												Besiktning
											</Grid.Column>
											<Grid.Column width={8} className={((new Date(carData.inspection.next) - new Date(Date.now())) / (1000 * 3600 * 24)) < 60 ? 'text-danger' : ((new Date(carData.inspection.next) - new Date(Date.now())) / (1000 * 3600 * 24)) < 120 ? 'text-warning' : ''}>
												{carData.inspection.next}
											</Grid.Column>
										</Grid.Row>
										<Grid.Row>
											<Grid.Column width={8} textAlign="left">
												Service
											</Grid.Column>
											<Grid.Column width={8} className={((new Date(carData.service.nextHalf) - new Date(Date.now())) / (1000 * 3600 * 24)) < 60 ? 'text-danger' : ((new Date(carData.service.nextHalf) - new Date(Date.now())) / (1000 * 3600 * 24)) < 120 ? 'text-warning' : ''}>
												{carData.service.nextHalf}
											</Grid.Column>
										</Grid.Row>
										<Grid.Row>
											<Grid.Column width={8} textAlign="left">
												Fullservice
											</Grid.Column>
											<Grid.Column width={8} className={((new Date(carData.service.nextFull) - new Date(Date.now())) / (1000 * 3600 * 24)) < 60 ? 'text-danger' : ((new Date(carData.service.nextFull) - new Date(Date.now())) / (1000 * 3600 * 24)) < 120 ? 'text-warning' : ''}>
												{carData.service.nextFull}
											</Grid.Column>
										</Grid.Row>
										<Grid.Row>
											<Grid.Column width={16}>
												<del className="text-danger d-inline">Förmånsbil</del> / <p className="text-success d-inline">Abax</p> / <p className="text-success d-inline">Personalbil</p> / <p className="text-success d-inline">Automat</p>
											</Grid.Column>
										</Grid.Row>
									</Grid>
								</center>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column width={8}>
								<h1>Miltal</h1>
								<p>6999</p>
							</Grid.Column>
							<Grid.Column width={8}>
								<h1>Miltal per år</h1>
								<p>2037</p>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column width={8}>
								{mileageOpen &&
									<div style={{ textAlign: "left" }}>
										{fuelDivs}
										<Input type='text' placeholder='Dag' action style={{ marginBottom: '10px' }}>
											<input />
											<Select defaultValue='01' options={optionsMonths} />
											<Select defaultValue='2019' options={optionsYears} />
											<Button type='submit' color="green">Add</Button>
										</Input>
										<Button fluid color="black" onClick={(() => setMileageOpen(!mileageOpen))}>Stäng</Button>
									</div>
								}
								{!mileageOpen &&
									<div onClick={(() => setMileageOpen(!mileageOpen))}>
										<ReactFrappeChart
											data={mileage}
											type='axis-mixed'
											height="250"
											width="30%"
											colors={['#7cd6fd', '#FF0000']}
										/>
									</div>
								}
							</Grid.Column>
							<Grid.Column width={8}>
								<ReactFrappeChart
									data={mileageAverage}
									type='axis-mixed'
									height="250"
									colors={['#7cd6fd', '#FF0000']}
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column width={8}>
								<h1>Bensinkostnad</h1>
								<p>197 / tillfälle</p>
							</Grid.Column>
							<Grid.Column width={8}>
								<h1>Bensinkostnad per månad</h1>
								<p>300 / månad</p>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column width={8}>
								<ReactFrappeChart
									data={carFuelChart}
									type='axis-mixed'
									height="250"
									width="30%"
									colors={['#7cd6fd', '#FF0000']}
								/>
							</Grid.Column>
							<Grid.Column width={8}>
								<ReactFrappeChart
									data={fuelCostMonth}
									type='axis-mixed'
									height="250"
									colors={['#7cd6fd', '#FF0000']}
								/>
							</Grid.Column>
						</Grid.Row>
					</Grid>
					<h1 className="mt-5">Kommentarer angående bilen</h1>
					<Form>
						<Form.TextArea>
							{carData.comment}
						</Form.TextArea>
					</Form>
				</center>
			}
		</div >
	);
}

export default Vehicles;