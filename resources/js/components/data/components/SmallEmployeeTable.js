import React, { useState, useEffect } from 'react';
import { Table, Icon, Segment, Dimmer, Loader, Image, ItemHeader, Form, Input, Button } from 'semantic-ui-react'
import _ from 'lodash';
//import PersonEditModule from './PersonEditModule';


const tableData = [
	{
		name: 'Laddar...', email: 'Laddar...', active: 'Laddar...', phone_id: 'Laddar...', sith: 'Laddar...',
		admin: 'Laddar...', east: 'Laddar...', angered: 'Laddar...', lundby: 'Laddar...', id: 'Laddar...',
		care_id_1: 'Laddar...', care_id_2: 'Laddar...', comment: 'Laddar...'
	},
]



function SmallEmployeeTable() {
	const [fetching, setFetching] = useState(true);
	const [people, setPeople] = useState([
		{
			name: 'Laddar...', email: 'Laddar...', active: 'Laddar...', phone_id: 'Laddar...', sith: 'Laddar...',
			admin: 'Laddar...', east: 'Laddar...', angered: 'Laddar...', lundby: 'Laddar...', id: 'Laddar...',
			care_id_2: 'Laddar...', comment: 'Laddar...'
		},
	]);
	const [fakePeople, setFakePeople] = useState([{ name: 'Loading', email: 'Loading', active: 'Loading', phone_id: 'Loading', sith: 'Loading', admin: 'Loading', id: 'Loading', care_id_2: 'Loading' }])
	const [formName, setFormName] = useState('hello');
	const [controlledExpanded, setControlledExpanded] = useState({ 0: true });
	const [expandedRows, setExpandedRows] = useState([]);
	const [refresher, setRefresher] = useState(false);
	const [tableSize, setTableSize] = useState(0);
	const userObject = JSON.parse(localStorage.getItem('user'));



	useEffect(() => {
		fetch('/api/employees', {
			method: 'GET',
			headers: {
				'Authorization': userObject.token,
			}
		})
			.then(response => response.json())
			.then(data => {
				setFetching(false);
				setPeople([...data.slice(0, 10)]);
			});
	}, [refresher]);

	function exampleReducer(state, action) {
		switch (action.type) {
			case 'CHANGE_SORT':
				if (state.column === action.column) {
					setPeople([...people.slice().reverse(),])
					return {
						...state,
						data: people.slice().reverse(),
						direction:
							state.direction === 'ascending' ? 'descending' : 'ascending',
					}

				}

				setPeople([..._.sortBy(people, [action.column]),])
				return {
					column: action.column,
					data: _.sortBy(people, [action.column]),
					direction: 'ascending',
				}
			default:
				throw new Error()
		}
	}

	function handleSubmit(event) {

	}
	function handleInputChange(event) {
		const target = event.target;
		if (target.name === 'name') setFormName(target.value);
	}


	let [state, dispatch] = React.useReducer(exampleReducer, {
		column: null,
		data: people,
		direction: null,
	})
	let { column, data, direction } = state

	function handleRowClick(rowId) {
		/*const currentExpandedRows = expandedRows;
		const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

		const newExpandedRows = isRowCurrentlyExpanded
			? currentExpandedRows.filter(id => id !== rowId)
			: currentExpandedRows.concat(rowId);

		setExpandedRows(newExpandedRows);*/
	}

	function renderRow(item, index) {
		const itemRows = [
			<Table.Row key={item.id} onClick={() => handleRowClick(index)}>
				<Table.Cell textAlign='center'>{renderItemCaret(index)}</Table.Cell>
				<Table.Cell>{item.name}</Table.Cell>
				<Table.Cell textAlign='center'>{item.phone_id}</Table.Cell>
				<Table.Cell textAlign='center'>{item.sith === 'Yes' ? '✔️' : item.sith === 'N Never' ? '❌' : item.sith === 'To Install' ? '🕑' : item.sith === 'Ordered' ? '✉️' : item.sith === 'To Order' ? '❗' : item.sith === 'Delete' ? '🗑️' : item.sith === 'Deleted' ? '🗑️' : '???'}</Table.Cell>
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
	people.forEach((item, index) => {
		const perItemRows = renderRow(item, index);
		renderAllRows = renderAllRows.concat(perItemRows);
	});

	function renderItemCaret(rowId) {
		const currentExpandedRows = expandedRows;
		const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

		if (isRowCurrentlyExpanded) {
			return <Icon name="external alternate" />;
		} else {
			return <Icon name="external alternate" />;
		}
	}

	function sendDataToParent(newPerson) {
		if (newPerson.status === 'updated') {
			setPeople((oldPeople) => {
				const newPeople = [...oldPeople];
				const index = newPeople.findIndex(x => x.id === newPerson.id);
				if (index !== -1) {
					newPeople[index] = newPerson;
				} else {
					setFetching(true);
					setRefresher(!refresher);
				}
				return newPeople;
			});
		} else {
			setPeople((oldPeople) => {
				const newPeople = [...oldPeople];
				const index = newPeople.findIndex(x => x.id === newPerson.id);
				newPeople.splice(index, 1);
				return newPeople;
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

	function handleChange(e) {
		setTableSize(e.target.value);
	}

	function handleSizeChange(value) {
		setTableSize(value);
	}

	const headerHtml = [['name', 'Namn', 8], ['phone_id', 'Tele', 2], ['sith', 'SITH', 2]].map((item, index) => {
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
			<Table sortable celled fixed striped selectable compact={'very'}>
				<Dimmer active={fetching}>
					<Loader size="large">Laddar...</Loader>
				</Dimmer>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell
							width={2}
						>
							Länk
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

export default SmallEmployeeTable;