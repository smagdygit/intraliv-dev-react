import React, { useState, useEffect } from 'react';
import { Table, Segment, Dimmer, Loader } from 'semantic-ui-react'
import _ from 'lodash';
import UserEditModule from './UserEditModule';
import TableFunctionCaret from './TableFunctionCaret';



function Main(props) {
	const [fetching, setFetching] = useState(true);
	const [people, setPeople] = useState([
		{
			id: 0,  admin: 'Laddar...', name: 'Laddar...', email: 'Laddar...',
		},
	]);
	const [expandedRows, setExpandedRows] = useState([]);
	const [refresher, setRefresher] = useState(false);
	const userObject = JSON.parse(localStorage.getItem('user'));



	useEffect(() => {
		fetch('/api/users', {
			method: 'GET',
			headers: {
				'Authorization': userObject.token,
			}
		})
			.then(response => response.json())
			.then(data => {
				setFetching(false);
				setPeople([...data]);
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

	let [state, dispatch] = React.useReducer(exampleReducer, {
		column: null,
		data: people,
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
		
		const itemRows = [
			<Table.Row key={item.id} onClick={() => handleRowClick(index)}>
				<TableFunctionCaret data={{ index: index, expandedRows: expandedRows }} />
				<Table.Cell>{item.id}</Table.Cell>
				<Table.Cell textAlign='center'>{item.admin === 0 ? '❌' : '✔️'}</Table.Cell>
				<Table.Cell>{item.name}</Table.Cell>
				<Table.Cell>{item.email}</Table.Cell>
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
				setExpandedRows([]);
				return newPeople;
			});
		} else {
			setPeople((oldPeople) => {
				const newPeople = [...oldPeople];
				const index = newPeople.findIndex(x => x.id === newPerson.id);
				newPeople.splice(index, 1);
				setExpandedRows([]);
				return newPeople;
			});
		}
	}

	function renderItemDetails(item) {
		item.password = '';
		return (
			<Segment basic>
				<UserEditModule data={item} className="m-5" sendDataToParent={sendDataToParent}></UserEditModule>
			</Segment>
		);
	}

	const headerHtml = [['id', 'ID', 1], ['admin', 'Admin', 1], ['name', 'Name', 7], ['email', 'Mejl', 7], ].map((item, index) => {
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
							width={1}
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