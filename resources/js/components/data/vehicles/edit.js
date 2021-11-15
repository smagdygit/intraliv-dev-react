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
import Add from './add';




function Edit(props) {
	const userObject = JSON.parse(localStorage.getItem('user'));
	const [isDownloading, setIsDownloading] = useState(true);
	const [car, setCar] = useState({});
	console.log(1111)
	useEffect(() => {
		fetch('/api/cars', {
			method: 'GET',
			headers: {
				'Authorization': userObject.token,
			}
		})
			.then(response => response.json())
			.then(data => {
				setCar(data[4]);
				setIsDownloading(false);
			});
	}, [])

	return (
		<>
		{!isDownloading &&
			<Add car={car}/>
		}
		</>
	);
}

export default Edit;