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
import ReactFrappeChart from 'react-frappe-charts';


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

function Test(props) {
	const [mileageAverageOpen, setMileageAverageOpen] = useState(false);
	const [mileageOpen, setMileageOpen] = useState(false);
	const [fuelCostOpen, setFuelCostOpen] = useState(false);
	const [fuelCostMonthOpen, setFuelCostMonthOpen] = useState(false);
	
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
	})

	return (
		<div className="container-fluid center" style={{ width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: '0px' }}>
			<center>
				<h1 className="display-1">LKJ 689</h1>
				<h3 style={{ marginBottom: '100px' }}>Toyota Aris | Vit | Lundby</h3>
				{/*<div>
					<Input />
					<Dropdown defaultValue='01' options={optionsMonths} />
					<Dropdown defaultValue='2019' options={optionsYears} />
				</div>*/}
				<Grid verticalAlign='middle'>
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
								data={fuelCost}
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
			</center>
		</div >
	);
}

export default Test;