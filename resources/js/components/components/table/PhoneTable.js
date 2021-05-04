import React, { useState, useEffect } from 'react';
import { Table, Segment, Dimmer, Loader } from 'semantic-ui-react'
import _ from 'lodash';
import PersonEditModule from './PhoneEditModule';
import TableFunctionCaret from './TableFunctionCaret';



function Main(props) {
	const [fetching, setFetching] = useState(true);
	const [phones, setPhones] = useState([
		{
			id: 0, name: 'Laddar...', status: 'Laddar...', free: 'Laddar...', personal: 'Laddar...', east: 'Laddar...',
			lundby: 'Laddar...', angered: 'Laddar...', phoniro_status: 'Laddar...', employees: [{ id: '9998', name: 'Laddar...' }, { id: '9999', name: 'Laddar...' }], comment: 'Laddar...',
		},
	]);
	const [fetchedPhones, setFetchedPhones] = useState([
		{
			id: 0, name: 'Laddar...', status: 'Laddar...', free: 'Laddar...', personal: 'Laddar...', east: 'Laddar...',
			lundby: 'Laddar...', angered: 'Laddar...', phoniro_status: 'Laddar...', employees: [{ id: '9998', name: 'Laddar...' }, { id: '9999', name: 'Laddar...' }], comment: 'Laddar...',
		},
	]);
	const [expandedRows, setExpandedRows] = useState([]);
	const [refresher, setRefresher] = useState(false);
	const userObject = JSON.parse(localStorage.getItem('user'));



	useEffect(() => {
		fetch('/api/phones', {
			method: 'GET',
			headers: {
				'Authorization': userObject.token,
			}
		})
			.then(response => response.json())
			.then(data => {
				setFetching(false);
				const filteredPhones = filterInput(data, props.data.filter);
				setPhones(filteredPhones);
				setFetchedPhones(data);
				props.updateResultCount(filteredPhones.length);
			});
	}, [refresher]);

	useEffect(() => {
		const filteredPhones = filterInput(fetchedPhones, props.data.filter);
		props.updateResultCount(filteredPhones.length)
		setPhones(filteredPhones);
	}, [props.data.filter]);

	function filterInput(input, filter) {
		const output = input.flatMap((item, index) => {

			if (filter.text !== '') {
				if (!((item.name.toLowerCase().indexOf(filter.text.toLowerCase()) !== -1) || (item.comment.toLowerCase().indexOf(filter.text.toLowerCase()) !== -1))) {
					return [];
				}
			}

			let boolFail = false;
			if (['free', 'personal', 'east', 'lundby', 'angered', 'vh', 'backa'].forEach((filterItem) => {
				if (filter[filterItem]) {
					if (!item[filterItem]) boolFail = true;
				}
			}));

			if (boolFail) return [];

			if (filter.status !== 'null') {
				if (item.status !== filter.status) return [];
			}

			if (filter.phoniro_status) {
				if (item.phoniro_status === 'No') return [];
			}

			return [item];
		});

		return output;
	}

	function exampleReducer(state, action) {
		switch (action.type) {
			case 'CHANGE_SORT':
				if (state.column === action.column) {
					setPhones([...phones.slice().reverse(),])
					return {
						...state,
						data: phones.slice().reverse(),
						direction:
							state.direction === 'ascending' ? 'descending' : 'ascending',
					}

				}

				setPhones([..._.sortBy(phones, [action.column]),])
				return {
					column: action.column,
					data: _.sortBy(phones, [action.column]),
					direction: 'ascending',
				}
			default:
				throw new Error()
		}
	}

	let [state, dispatch] = React.useReducer(exampleReducer, {
		column: null,
		data: phones,
		direction: null,
	})
	let { column, data, direction } = state

	function handleRowClick(rowId) {
		const currentExpandedRows = expandedRows;
		const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

		const newExpandedRows = isRowCurrentlyExpanded
			? currentExpandedRows.filter(id => id !== rowId)
			: currentExpandedRows.concat(rowId);

		setExpandedRows(newExpandedRows);
	}



	function renderRow(item, index) {
		
		const employeeList = item.employees.map((item, index) => {
			return (
				<div key={"employee-map" + item.id}>
					{item.name}
				</div>
			); 
		});

		const itemRows = [
			<Table.Row key={item.id} onClick={() => handleRowClick(index)}>
				<TableFunctionCaret data={{ index: index, expandedRows: expandedRows }} />
				<Table.Cell>{item.name === -1 ? 'Okänd Telefon' : item.name === 0 ? 'Ingen Telefon' : `WP${item.name}`}</Table.Cell>
				<Table.Cell textAlign='center'>{item.status === 'Usable' ? '✔️' : item.status === 'Need Checkup' ? '👁️' : item.status === 'Does not Work' ? '🔥' : item.status === 'To Register' ? '🔜' : item.status === 'To Install' ? '💤' : item.status === 'Waiting for Mail' ? '✉️' : item.status === 'Missing Case' ? '💼' : '???'}</Table.Cell>
				<Table.Cell textAlign='center'>{item.free === 0 ? '❌' : '✔️'}</Table.Cell>
				<Table.Cell textAlign='center'>{item.personal === 0 ? '❌' : '✔️'}</Table.Cell>
				<Table.Cell textAlign='center'>{item.east === 0 ? '❌' : '✔️'}</Table.Cell>
				<Table.Cell textAlign='center'>{item.lundby === 0 ? '❌' : '✔️'}</Table.Cell>
				<Table.Cell textAlign='center'>{item.angered === 0 ? '❌' : '✔️'}</Table.Cell>
				<Table.Cell textAlign='center'>{item.vh === 0 ? '❌' : '✔️'}</Table.Cell>
				<Table.Cell textAlign='center'>{item.backa === 0 ? '❌' : '✔️'}</Table.Cell>
				<Table.Cell textAlign='center'>{item.phoniro_status === 'Yes' ? '✔️' : item.phoniro_status === 'Half' ? '🗨️' : item.phoniro_status === 'No' ? '❌' : '???'}</Table.Cell>
				<Table.Cell>{employeeList}</Table.Cell>
				<Table.Cell>{item.comment}</Table.Cell>
			</Table.Row>
		];

		if (expandedRows.includes(index)) {
			itemRows.push(
				<Table.Row key={"row-expanded-" + index}>
					<Table.Cell colSpan="16">{renderItemDetails(item)}</Table.Cell>
				</Table.Row>
			);
		}

		return itemRows;
	}

	let renderAllRows = [];
	phones.forEach((item, index) => {
		const perItemRows = renderRow(item, index);
		renderAllRows = renderAllRows.concat(perItemRows);
	});



	function sendDataToParent(newPerson) {
		if (newPerson.status === 'updated') {
			setPhones((oldphones) => {
				const newphones = [...oldphones];
				const index = newphones.findIndex(x => x.id === newPerson.id);
				if (index !== -1) {
					newphones[index] = newPerson;
				} else {
					setFetching(true);
					setRefresher(!refresher);
				}
				return newphones;
			});
		} else {
			setPhones((oldphones) => {
				const newphones = [...oldphones];
				const index = newphones.findIndex(x => x.id === newPerson.id);
				newphones.splice(index, 1);
				return newphones;
			});
		}
	}

	function renderItemDetails(item) {
		return (
			<Segment basic>
				<PersonEditModule data={item} className="m-5" sendDataToParent={sendDataToParent}></PersonEditModule>
			</Segment>
		);
	}

	const headerHtml = props.data.headers.map((item, index) => {
		return (
			<Table.HeaderCell
				key={index}
				width={item[2]}
				sorted={column === item[0] ? direction : null}
				onClick={() => dispatch({ type: 'CHANGE_SORT', column: item[0] })}
			>
				{item[1]}
			</Table.HeaderCell>
		)
	})

	return (
		<React.Fragment>
			<Table sortable celled fixed striped selectable compact={props.data.tableSize === 0 ? false : props.data.tableSize === 1 ? true : 'very'}>
				{/*<Dimmer active={true}>
					<Loader size="large">Laddar...</Loader>
				</Dimmer>*/}
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell
							width={2}
						>
							Öppna
                        </Table.HeaderCell>
						{headerHtml}
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{renderAllRows}
				</Table.Body>
			</Table>
		</React.Fragment>

	);
}

export default Main;