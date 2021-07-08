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


const data = {
	labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],

	datasets: [
		{
			name: "Yet Another",
			values: [15, 20, -3, -15, 58, 12, -17],
			chartType: 'line'
		}
	]
}


function Test(props) {

	return (
		<ReactFrappeChart
			title= "My Awesome Chart"
			data={data}
			type='axis-mixed'
			height="250"
			colors={['#7cd6fd']}
		/>
	);
}

export default Test;