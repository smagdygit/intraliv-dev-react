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
import { GiCarWheel } from 'react-icons/gi';
import { ImCross } from 'react-icons/Im';
import { HiArrowLeft } from 'react-icons/Hi';
import DatePicker from "react-datepicker";


const optionsStation = [
	{ key: 'null', text: 'Ingen', value: 'null' },
	{ key: 'lundby', text: 'Lundby', value: 'lundby' },
	{ key: 'kortedala', text: 'Kortedala', value: 'kortedala' },
]

const optionsInspection = [
	{ key: 'null', text: 'Välj Resultat', value: 'null' },
	{ key: 'approved', text: 'Godkänd', value: 'approved' },
	{ key: 'denied', text: 'Nekad', value: 'denied' },
]

const optionsWheelsAmount = [
	{ key: 'null', text: 'Välj Antal Däck', value: 'null' },
	{ key: '1', text: '1', value: '1' },
	{ key: '2', text: '2', value: '2' },
	{ key: '3', text: '3', value: '3' },
	{ key: '4', text: '4', value: '4' },
]

const optionsWheelsCurrent = [
	{ key: 'null', text: 'Välj Antal Däck', value: 'null' },
	{ key: 'summer', text: 'Sommardäck', value: 'summer' },
	{ key: 'winter', text: 'Vinterdäck', value: 'winter' },
]



function Test(props) {
	const [plate, setPlate] = useState('');
	const [brand, setBrand] = useState('');
	const [model, setModel] = useState('');
	const [insuranceCost, setInsuranceCost] = useState('');
	const [station, setStation] = useState('null');
	const [newInspectionResult, setNewInspectionResult] = useState('null');
	const [newInspectionDate, setNewInspectionDate] = useState(new Date(Date.now()));
	const [newInspectionComment, setNewInspectionComment] = useState(new Date(Date.now()));
	const [inspectionArray, setInspectionArray] = useState([]);
	const [newFuelCost, setNewFuelCost] = useState('');
	const [newFuelDate, setNewFuelDate] = useState(new Date(Date.now()));
	const [fuelArray, setFuelArray] = useState([]);
	const [newMileageNumber, setNewMileageNumber] = useState('');
	const [newMileageDate, setNewMileageDate] = useState(new Date(Date.now()));
	const [mileageArray, setMileageArray] = useState([]);
	const [newServiceFull, setNewServiceFull] = useState(false);
	const [newServiceDate, setNewServiceDate] = useState(new Date(Date.now()));
	const [serviceArray, setServiceArray] = useState([]);
	const [newServiceComment, setNewServiceComment] = useState('');
	const [wheelsWinterAmount, setWheelsWinterAmount] = useState('null');
	const [wheelsWinterType, setWheelsWinterType] = useState('');
	const [wheelsSummerAmount, setWheelsSummerAmount] = useState('null');
	const [wheelsSummerType, setWheelsSummerType] = useState('');
	const [wheelsCurrent, setWheelsCurrent] = useState('null');

	function handleRemoveInspection(result, date) {
		const index = inspectionArray.findIndex(x => x.date === date && x.result === result)
		const inspectionArrayCopy = [...inspectionArray];
		inspectionArrayCopy.splice(index, 1);
		setInspectionArray([...inspectionArrayCopy]);
	}

	function handleRemoveService(full, date) {
		const index = serviceArray.findIndex(x => x.date === date && x.full === full)
		const serviceArrayCopy = [...serviceArray];
		serviceArrayCopy.splice(index, 1);
		setServiceArray([...serviceArrayCopy]);
	}

	function handleRemoveFuel(cost, date) {
		const index = fuelArray.findIndex(x => x.date === date && x.cost === cost)
		const fuelArrayCopy = [...fuelArray];
		fuelArrayCopy.splice(index, 1);
		setFuelArray([...fuelArrayCopy]);
	}

	function handleRemoveMileage(number, date) {
		const index = mileageArray.findIndex(x => x.date === date && x.number === number)
		const mileageArrayCopy = [...mileageArray];
		mileageArrayCopy.splice(index, 1);
		setMileageArray([...mileageArrayCopy]);
	}

	function addNewInspection() {
		setInspectionArray([...inspectionArray, { rersult: newInspectionResult, date: newInspectionDate }]);
		setNewInspectionResult('null');
	}

	function addNewService() {
		setServiceArray([...serviceArray, { full: newServiceFull, date: newServiceDate }]);
		setNewServiceFull(false);
	}

	function addNewFuel() {
		if (newFuelNumber.replace(/[^0-9]/g, '') > 0) {
			setFuelArray([...mileageArray, { fuel: newFuelCost.replace(/[^0-9]/g, ''), date: newFuelDate }]);
			setNewFueleCost('');
		}
	}

	function addNewMileage() {
		if (newMileageNumber.replace(/[^0-9]/g, '') > 0) {
			setMileageArray([...mileageArray, { number: newMileageNumber.replace(/[^0-9]/g, ''), date: newMileageDate }]);
			setNewMileageNumber('');
		}
	}

	return (
		<div className="container-fluid center" style={{ width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: '0px' }}>
			<center>
				<h1 className="display-1">Lägg till bil</h1>
				<Grid>
					<Grid.Row>
						<Grid.Column width={8} textAlign="left">
							<h1>Bilinformation</h1>
							<Form>
								<Form.Input
									fluid
									icon='car'
									iconPosition='left'
									label='Registreringsskylt'
									value={plate}
									onChange={(e) => setPlate(e.target.value)}
								/>
								<Form.Input
									fluid
									icon='car'
									iconPosition='left'
									label='Märke'
									value={brand}
									onChange={(e) => setBrand(e.target.value)}
								/>
								<Form.Input
									fluid
									icon='car'
									iconPosition='left'
									label='Modell (inkl märke)'
									value={model}
									onChange={(e) => setModel(e.target.value)}
								/>
								<Form.Input
									fluid
									icon='car'
									iconPosition='left'
									label='Försäkringskostnad (år)'
									value={insuranceCost}
									onChange={(e) => setInsuranceCost(e.target.value)}
								/>
								<Form.Dropdown
									name="station"
									label="Station"
									fluid
									selection
									options={optionsStation}
									value={station}
									onChange={(e, data) => setStation(data.value)}
								/>
							</Form>
						</Grid.Column>
						<Grid.Column width={8} textAlign="left">
							<h1>Besiktning</h1>
							<Form>
								{inspectionArray.map((item, index) => {
									return (
										<Form.Group key={'inspectionArray' + index}>
											<Form.Dropdown
												name="old-inspection"
												selection
												options={optionsInspection}
												value={item.result}
												readOnly
											/>
											<DatePicker
												selected={item.date}
												onChange={(date) => setInspectionArray(date)}
												calendarStartDay={1}
												peekNextMonth
												showMonthDropdown
												showYearDropdown
												dropdownMode="select"
												dateFormat="yyyy-MM-dd"
												disabled
											/>
											<Button color="red" onClick={() => handleRemoveInspection(item.result, item.date)}>Ta Bort</Button>
										</Form.Group>
									);
								})}
								<Form.Group>
									<Form.Dropdown
										name="new-inspection"
										selection
										options={optionsInspection}
										value={newInspectionResult}
										onChange={(e, data) => setNewInspectionResult(data.value)}
									/>
									<DatePicker
										selected={newInspectionDate}
										onChange={(date) => setNewInspectionDate(date)}
										calendarStartDay={1}
										peekNextMonth
										showMonthDropdown
										showYearDropdown
										dropdownMode="select"
										dateFormat="yyyy-MM-dd"
									/>
									<Button color="green" onClick={() => addNewInspection()}>Lägg Till</Button>
								</Form.Group>
							</Form>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={8} textAlign="left">
							<h1>Däck</h1>
							<Form>
								<Form.Dropdown
									name="winterAmount"
									label="Antal Sommardäck"
									fluid
									selection
									options={optionsWheelsAmount}
									value={wheelsSummerAmount}
									onChange={(e, data) => setWheelsSummerAmount(data.value)}
								/>
								<Form.Input
									fluid
									icon='car'
									iconPosition='left'
									label='Sommardäckstyp'
									placeholder="Sommardäck"
									value={wheelsSummerType}
									onChange={(e) => setWheelsSummerType(e.target.value)}
								/>
								<Form.Dropdown
									name="winterAmount"
									label="Antal Vinterdäck"
									fluid
									selection
									options={optionsWheelsAmount}
									value={wheelsWinterAmount}
									onChange={(e, data) => setWheelsWinterAmount(data.value)}
								/>
								<Form.Input
									fluid
									icon='car'
									iconPosition='left'
									label='Vinterdäckstyp'
									placeholder="Allround"
									value={wheelsWinterType}
									onChange={(e) => setWheelsWinterType(e.target.value)}
								/>
							</Form>
						</Grid.Column>
						<Grid.Column width={8} textAlign="left">
							<h1>Service</h1>
							<Form>
								{serviceArray.map((item, index) => {
									return (
										<Form.Group key={'serviceArray' + index}>
											<Form.Field
												key={"serviceArray" + index}
												className="p-2"
												control={Checkbox}
												toggle
												label="Fullservice"
												name="Fullservice"
												checked={item.full}
												readOnly
											/>
											<DatePicker
												selected={item.date}
												onChange={(date) => setServiceArray(date)}
												calendarStartDay={1}
												peekNextMonth
												showMonthDropdown
												showYearDropdown
												dropdownMode="select"
												dateFormat="yyyy-MM-dd"
												disabled
											/>
											<Button color="red" onClick={() => handleRemoveService(item.full, item.date)}>Ta Bort</Button>
										</Form.Group>
									);
								})}
								<Form.Group>
									<Form.Field
										key="serviceNew"
										className="p-2"
										control={Checkbox}
										toggle
										label="Fullservice"
										name="Fullservice"
										checked={newServiceFull}
										onChange={() => setNewServiceFull(!newServiceFull)}
									/>
									<DatePicker
										selected={newServiceDate}
										onChange={(date) => setNewServiceDate(date)}
										calendarStartDay={1}
										peekNextMonth
										showMonthDropdown
										showYearDropdown
										dropdownMode="select"
										dateFormat="yyyy-MM-dd"
									/>
									<Button color="green" onClick={() => addNewService()}>Lägg Till</Button>
								</Form.Group>
							</Form>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={8} textAlign="left">
							<h1>Tankningar</h1>
							<Form className="d-inline">
								{fuelArray.map((item, index) => {
									return (
										<Form.Group key={'fuelArray' + index}>
											<div>
												<Form.Input
													fluid
													icon='car'
													iconPosition='left'
													value={item.cost}
												/>
												<DatePicker
													selected={item.date}
													onChange={(date) => setFuelArray(date)}
													calendarStartDay={1}
													peekNextMonth
													showMonthDropdown
													showYearDropdown
													dropdownMode="select"
													dateFormat="yyyy-MM-dd"
													disabled
												/>
											</div>
											<Button color="red" onClick={() => handleRemoveFuel(item.cost, item.date)}>Ta Bort</Button>
										</Form.Group>
									);
								})}
								<Form.Group>
									<div>
										<Form.Input
											fluid
											icon='car'
											iconPosition='left'
											placeholder="500"
											value={newFuelCost}
											onChange={(e) => setNewFuelCost(e.target.value)}
										/>
										<DatePicker
											selected={newFuelDate}
											onChange={(date) => setNewFuelDate(date)}
											calendarStartDay={1}
											peekNextMonth
											showMonthDropdown
											showYearDropdown
											dropdownMode="select"
											dateFormat="yyyy-MM-dd"
										/>
									</div>
									<Button color="green" onClick={() => addNewFuel()}>Lägg Till</Button>
								</Form.Group>
							</Form>
						</Grid.Column>
						<Grid.Column width={8} textAlign="left">
							<h1>Antal Mil</h1>
							<Form>
								{mileageArray.map((item, index) => {
									return (
										<Form.Group key={'mileageArray' + index}>
											<div>
												<Form.Input
													fluid
													icon='car'
													iconPosition='left'
													value={item.number}
												/>
												<DatePicker
													selected={item.date}
													onChange={(date) => setMileageArray(date)}
													calendarStartDay={1}
													peekNextMonth
													showMonthDropdown
													showYearDropdown
													dropdownMode="select"
													dateFormat="yyyy-MM-dd"
													disabled
												/>
											</div>
											<Button color="red" onClick={() => handleRemoveMileage(item.number, item.date)}>Ta Bort</Button>
										</Form.Group>
									);
								})}
								<Form.Group>
									<div>
										<Form.Input
											fluid
											icon='car'
											iconPosition='left'
											placeholder="9000"
											value={newMileageNumber}
											onChange={(e) => setNewMileageNumber(e.target.value)}
										/>
										<DatePicker
											selected={newMileageDate}
											onChange={(date) => setNewMileageDate(date)}
											calendarStartDay={1}
											peekNextMonth
											showMonthDropdown
											showYearDropdown
											dropdownMode="select"
											dateFormat="yyyy-MM-dd"
										/>
									</div>
									<Button color="green" onClick={() => addNewMileage()}>Lägg Till</Button>
								</Form.Group>
							</Form>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</center>
		</div >
	);
}

export default Test;