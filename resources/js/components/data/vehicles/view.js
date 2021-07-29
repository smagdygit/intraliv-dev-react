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
			values: [5500, 2929, 2501],
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


function Test(props) {

	return (
		<div className="container-fluid center" style={{ width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: '0px' }}>
			<center>
				<h1 className="display-1">LKJ 689</h1>
				<h3 style={{ marginBottom: '100px' }}>Toyota Aris | Vit | Lundby</h3>
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
							<ReactFrappeChart
								data={mileage}
								type='axis-mixed'
								height="250"
								width="30%"
								colors={['#7cd6fd', '#FF0000']}
							/>
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
		</div>
	);
}

export default Test;