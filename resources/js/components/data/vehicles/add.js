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
	Segment
} from 'semantic-ui-react';
import ReactFrappeChart from 'react-frappe-charts';
import { GiCarWheel, GiSacrificialDagger } from 'react-icons/gi';
import { ImCross } from 'react-icons/Im';
import { HiArrowLeft } from 'react-icons/Hi';
import DatePicker from "react-datepicker";


const optionsStation = [
	{ key: 'null', text: 'Ingen', value: 'null' },
	{ key: 'lundby', text: 'Lundby', value: 'lundby' },
	{ key: 'kortedala', text: 'Kortedala', value: 'kortedala' },
	{ key: 'unknown', text: 'Vet ej', value: 'unknown' },
	{ key: 'other', text: 'Annan', value: 'other' },
	{ key: 'private', text: 'Privat Plats', value: 'private' },
]

const optionsInspection = [
	{ key: 'null', text: 'Välj Resultat', value: 'null' },
	{ key: 'approved', text: 'Godkänd', value: 'approved' },
	{ key: 'denied', text: 'Nekad', value: 'denied' },
]

const optionsWheelsAmount = [
	{ key: 'null', text: 'Välj Antal Däck', value: 'null' },
	{ key: 1, text: '1', value: 1 },
	{ key: 2, text: '2', value: 2 },
	{ key: 3, text: '3', value: 3 },
	{ key: 4, text: '4', value: 4 },
]

const optionsWheelsCurrent = [
	{ key: 'null', text: 'Välj Antal Däck', value: 'null' },
	{ key: 'summer', text: 'Sommardäck', value: 'summer' },
	{ key: 'winter', text: 'Vinterdäck', value: 'winter' },
]



function Test(props) {
	const userObject = JSON.parse(localStorage.getItem('user'));
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
	const [wheelsWinterOn, setCurrentWheelsWinterOn] = useState(false);
	const [automatic, setAutomatic] = useState(false);
	const [abax, setAbax] = useState(false);
	const [comment, setComment] = useState('');
	const [maxMileage, setMaxMileage] = useState(0);
	const [id, setId] = useState(-1);

	useState(() => {
		if (props.car) {
			setPlate(props.car.plate);
			setBrand(props.car.brand);
			setModel(props.car.model);
			setInsuranceCost(props.car.insurance_cost);
			setStation(props.car.station);
			setInspectionArray(props.car.inspection.map((item) =>  {item.result = item.approved ? 'approved' : 'denied'; return item;}));
			setFuelArray(props.car.fuel);
			setMileageArray(props.car.mileage);
			setServiceArray(props.car.service);
			setWheelsWinterAmount(props.car.wheels_winter_amount);
			setWheelsWinterType(props.car.wheels_winter_type);
			setWheelsSummerAmount(props.car.wheels_summer_amount);
			setWheelsSummerType(props.car.wheels_summer_type);
			setCurrentWheelsWinterOn(!!props.car.wheels_winter_on);
			setAutomatic(!!props.car.automatic);
			setAbax(!!props.car.abax);
			setComment(props.car.comment);
			setMaxMileage(props.car.max_mileage);
			setId(props.car.id);
		}
	}, [props])

	function handleRemoveInspection(result, date) {
		const index = inspectionArray.findIndex(x => x.date === date && x.result === result)
		const inspectionArrayCopy = [...inspectionArray];
		inspectionArrayCopy.splice(index, 1);
		setInspectionArray([...inspectionArrayCopy]);
	}

	function handleRemoveService(full_service, date) {
		const index = serviceArray.findIndex(x => x.date === date && x.full_service === full_service)
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

	function handleRemoveMileage(mileage, date) {
		const index = mileageArray.findIndex(x => x.date === date && x.mileage === mileage)
		const mileageArrayCopy = [...mileageArray];
		mileageArrayCopy.splice(index, 1);
		setMileageArray([...mileageArrayCopy]);
	}

	function addNewInspection() {
		setInspectionArray([...inspectionArray, { result: newInspectionResult, date: newInspectionDate.toISOString().split('T')[0] }]);
		//setNewInspectionResult('null');
	}

	function addNewService() {
		setServiceArray([...serviceArray, { full_service: newServiceFull, date: newServiceDate.toISOString().split('T')[0] }]);
		setNewServiceFull(false);
	}

	function addNewFuel() {console.log(fuelArray);
		//if (newFuelCost.replace(/[^0-9]/g, '') > 0) {
			setFuelArray([...fuelArray, { cost: parseInt(newFuelCost), date: newFuelDate.toISOString().split('T')[0] }]);
			setNewFuelCost('');
		//}
	}

	function addNewMileage() {
		if (newMileageNumber.replace(/[^0-9]/g, '') > 0) {
			setMileageArray([...mileageArray, { mileage: newMileageNumber.replace(/[^0-9]/g, ''), date: newMileageDate.toISOString().split('T')[0] }]);
			setNewMileageNumber('');
		}
	}

	function uploadCar() {

		//Update car (PUT) or new car (POST)
		const postMethod = id === -1 ? 'POST' : 'PUT';

		//Object to send to API
		const postObject = {
			id: id,
			plate: plate,
			brand: brand,
			model: model,
			insurance_cost: insuranceCost,
			max_mileage: maxMileage,
			station: station,
			automatic: !!automatic,
			abax: !!abax,
			mileage: mileageArray,
			fuel: fuelArray,
			service: serviceArray,
			inspection: inspectionArray,
			wheels_summer_amount: wheelsSummerAmount,
			wheels_summer_type: wheelsSummerType,
			wheels_winter_amount: wheelsWinterAmount,
			wheels_winter_type: wheelsWinterType,
			wheels_winter_on: !!wheelsWinterOn,
			comment: comment,
		};

		fetch(`/api/cars`, {
			method: postMethod,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': userObject.token,
			},
			body: JSON.stringify(postObject)
		})
			.then(res => res.json())
			.then((result) => {
				setLoadingStatus('');
				if (result.status === "success") {
					console.log(true);
				} else {
					console.log(false);
				}
			},
				(error) => {
					//alert("error");
				}
			);
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
									placeholder='ABC123'
									value={plate}
									onChange={(e) => setPlate(e.target.value)}
								/>
								<Form.Input
									fluid
									icon='car'
									iconPosition='left'
									label='Märke'
									placeholder='Toyota'
									value={brand}
									onChange={(e) => setBrand(e.target.value)}
								/>
								<Form.Input
									fluid
									icon='car'
									iconPosition='left'
									label='Modell (inkl märke)'
									placeholder='Toyota Hybrid 3.2'
									value={model}
									onChange={(e) => setModel(e.target.value)}
								/>
								<Form.Input
									fluid
									icon='car'
									iconPosition='left'
									label='Försäkringskostnad (år)'
									placeholder='4000'
									value={insuranceCost}
									onChange={(e) => setInsuranceCost(e.target.value)}
								/>
								<Form.Input
									fluid
									icon='car'
									iconPosition='left'
									label='Max Miltak'
									placeholder='1500'
									value={maxMileage}
									onChange={(e) => setMaxMileage(parseInt(e.target.value) || 0)}
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
								<Form.Checkbox
									className="p-2"
									toggle
									label="Automat"
									name="Automat"
									checked={automatic}
									onChange={() => setAutomatic(!automatic)}
								/>
								<Form.Checkbox
									className="p-2"
									toggle
									label="Abax"
									name="Abax"
									checked={abax}
									onChange={() => setAbax(!abax)}
								/>
							</Form>
						</Grid.Column>
						<Grid.Column width={8} textAlign="left">
							<h1>Besiktning</h1>
							<Form>
								{inspectionArray.map((item, index) => {
									return (
										<Segment key={'inspectionArray' + index}>
											<Grid className="m-0 p-0">
												<Grid.Row className="m-0 p-0">
													<Grid.Column width={6} textAlign="left">
														<h2>{item.date.toString().slice(4, 10).replace(/-/g, "")}</h2>
													</Grid.Column>
													<Grid.Column width={4} textAlign="center">
														<h2>{item.result === 'approved' ? 'Godkänd' : 'Nekad'}</h2>
													</Grid.Column>
													<Grid.Column width={6} textAlign="right">
														<Button color="red" onClick={() => handleRemoveInspection(item.result, item.date)}>Ta Bort</Button>
													</Grid.Column>
												</Grid.Row>
											</Grid>
										</Segment>
									);
								})}
								<Dropdown
									className="mb-3"
									name="new-inspection"
									fluid
									selection
									options={optionsInspection}
									defaultValue={newInspectionResult}
									onChange={(e, data) => setNewInspectionResult(data.value)}
								/>
								<DatePicker
									className="mb-3"
									selected={newInspectionDate}
									onChange={(date) => setNewInspectionDate(date)}
									calendarStartDay={1}
									peekNextMonth
									showMonthDropdown
									showYearDropdown
									dropdownMode="select"
									dateFormat="yyyy-MM-dd"
								/>
								<Button color="green" fluid onClick={() => addNewInspection()}>Lägg Till</Button>
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
									placeholder="Allround, Sommardäck, ..."
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
									placeholder="Allround, Dubb, ..."
									value={wheelsWinterType}
									onChange={(e) => setWheelsWinterType(e.target.value)}
								/>
								<Form.Checkbox
									className="p-2"
									toggle
									label="Vinterdäck Är På"
									name="Vinterdäck Är På"
									checked={wheelsWinterOn}
									onChange={() => setCurrentWheelsWinterOn(!wheelsWinterOn)}
								/>
							</Form>
						</Grid.Column>
						<Grid.Column width={8} textAlign="left">
							<h1>Service</h1>
							<Form>
								{serviceArray.map((item, index) => {
									return (
										<Segment key={'serviceArray' + index}>
											<Grid className="m-0 p-0">
												<Grid.Row className="m-0 p-0">
													<Grid.Column width={6} textAlign="left">
														<h2>{item.date.toString().slice(4, 10).replace(/-/g, "")}</h2>
													</Grid.Column>
													<Grid.Column width={4} textAlign="center">
														<h2>{item.full_service ? 'Full' : 'Halv'}</h2>
													</Grid.Column>
													<Grid.Column width={6} textAlign="right">
														<Button color="red" onClick={() => handleRemoveService(item.full_service, item.date)}>Ta Bort</Button>
													</Grid.Column>
												</Grid.Row>
											</Grid>
										</Segment>
									);
								})}
								<p>Fullservice</p>
								<Checkbox
									key="serviceNew"
									className="p-2"
									toggle
									label="Fullservice"
									name="Fullservice"
									checked={newServiceFull}
									onChange={() => setNewServiceFull(!newServiceFull)}
								/>
								<p>Datum</p>
								<DatePicker
									className="mb-3"
									selected={newServiceDate}
									onChange={(date) => setNewServiceDate(date)}
									calendarStartDay={1}
									peekNextMonth
									showMonthDropdown
									showYearDropdown
									dropdownMode="select"
									dateFormat="yyyy-MM-dd"
								/>
								<Button color="green" fluid onClick={() => addNewService()}>Lägg Till</Button>
							</Form>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={8} textAlign="left">
							<h1>Tankningar</h1>
							<Form className="d-inline">
								{fuelArray.map((item, index) => {
									return (
										<Segment key={'fuelArrays' + index}>
											<Grid className="m-0 p-0">
												<Grid.Row className="m-0 p-0">
													<Grid.Column width={6} textAlign="left">
														<h2>{item.date.toString().slice(4, 10).replace(/-/g, "")}</h2>
													</Grid.Column>
													<Grid.Column width={4} textAlign="center">
														<h2>{item.cost}</h2>
													</Grid.Column>
													<Grid.Column width={6} textAlign="right">
														<Button color="red" onClick={() => handleRemoveFuel(item.cost, item.date)}>Ta Bort</Button>
													</Grid.Column>
												</Grid.Row>
											</Grid>
										</Segment>
									);
								})}
								<div>
									<p>Kostnad</p>
									<Input
										className="mb-3"
										fluid
										icon='car'
										iconPosition='left'
										placeholder="500"
										value={newFuelCost}
										onChange={(e) => setNewFuelCost(e.target.value)}
									/>
									<p>Datum</p>
									<DatePicker
										className="mb-3"
										selected={newFuelDate}
										onChange={(date) => setNewFuelDate(date)}
										calendarStartDay={1}
										peekNextMonth
										showMonthDropdown
										showYearDropdown
										dropdownMode="select"
										dateFormat="yyyy-MM-dd"
									/>
									<Button color="green" fluid onClick={() => addNewFuel()}>Lägg Till</Button>
								</div>
							</Form>
						</Grid.Column>
						<Grid.Column width={8} textAlign="left">
							<h1>Antal Mil</h1>
							<Form>
								{mileageArray.map((item, index) => {
									return (
										<Segment key={'mileageArray' + index}>
											<Grid className="m-0 p-0">
												<Grid.Row className="m-0 p-0">
													<Grid.Column width={6} textAlign="left">
														<h2>{item.date.toString().slice(4, 10).replace(/-/g, "")}</h2>
													</Grid.Column>
													<Grid.Column width={4} textAlign="center">
														<h2>{item.mileage}</h2>
													</Grid.Column>
													<Grid.Column width={6} textAlign="right">
														<Button color="red" onClick={() => handleRemoveMileage(item.mileage, item.date)}>Ta Bort</Button>
													</Grid.Column>
												</Grid.Row>
											</Grid>
										</Segment>
									);
								})}
								<div>
									<p>Miltal</p>
									<Input
										className="mb-3"
										fluid
										icon='car'
										iconPosition='left'
										placeholder="500"
										value={newMileageNumber}
										onChange={(e) => setNewMileageNumber(e.target.value)}
									/>
									<p>Datum</p>
									<DatePicker
										className="mb-3"
										selected={newMileageDate}
										onChange={(date) => setNewMileageDate(date)}
										calendarStartDay={1}
										peekNextMonth
										showMonthDropdown
										showYearDropdown
										dropdownMode="select"
										dateFormat="yyyy-MM-dd"
									/>
									<Button color="green" fluid onClick={() => addNewMileage()}>Lägg Till</Button>
								</div>
							</Form>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column>
							<Form>
								<h1>Kommentar</h1>
								<TextArea placeholder="Övrig info om bilen..." value={comment} onChange={(e) => setComment(e.target.value)} />
							</Form>
						</Grid.Column>
					</Grid.Row>
				</Grid>

				<Button size="huge" color="green" fluid className="m-5" onClick={uploadCar}>Lägg Till Bil</Button>
			</center>
		</div >
	);
}

export default Test;