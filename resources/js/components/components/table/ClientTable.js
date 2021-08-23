import React, { useState, useEffect } from 'react';
import { Table, Segment, Dimmer, Loader, ItemContent } from 'semantic-ui-react'
import _ from 'lodash';
import ClientEditModule from '../../test/ClientFilterModule';
import TableFunctionCaret from './TableFunctionCaret';



function Main(props) {
	const [fetching, setFetching] = useState(true);
	const [phones, setPhones] = useState([
		{
			id: 0, name: 'Laddar...', care_type: 'Laddar...', free: 'Laddar...', personal: 'Laddar...', east: 'Laddar...',
			lundby: 'Laddar...', angered: 'Laddar...', comment: 'Laddar...',
		},
	]);
	const [fetchedPhones, setFetchedPhones] = useState([
		{
			id: 0, name: 'Laddar...', care_type: 'Laddar...', free: 'Laddar...', personal: 'Laddar...', east: 'Laddar...',
			lundby: 'Laddar...', angered: 'Laddar...', comment: 'Laddar...',
		},
	]);
	const [expandedRows, setExpandedRows] = useState([]);
	const [refresher, setRefresher] = useState(false);
	const userObject = JSON.parse(localStorage.getItem('user'));



	useEffect(() => {
		fetch('/api/clients', {
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

	//Auto close any opened items when filter changes
	useEffect(() => {
		setExpandedRows([]);
	}, [props.data.filter]);

	function filterInput(input, filter) {
		const output = input.flatMap((item, index) => {

			if (filter.text !== '') {
				if (!((item.name.toLowerCase().indexOf(filter.text.toLowerCase()) !== -1) || (item.comment.toLowerCase().indexOf(filter.text.toLowerCase()) !== -1) || (item.telenumber.toLowerCase().indexOf(filter.text.toLowerCase()) !== -1))) {
					return [];
				}
			}

			let boolFail = false;
			if (['east', 'lundby', 'angered', 'vh', 'backa', 'active'].forEach((filterItem) => {
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

		const itemRows = [
			<Table.Row key={item.id} onClick={() => handleRowClick(index)}>
				<TableFunctionCaret data={{ index: index, expandedRows: expandedRows }} />
				<Table.Cell>{item.name}</Table.Cell>
				<Table.Cell textAlign='center'>{item.active === 0 ? '❌' : '✔️'}</Table.Cell>
				<Table.Cell>{item.care_type === 'old' ? 'Äldreomsorg' : item.care_type === 'disabled' ? 'Funktionshinder' : '???'}</Table.Cell>
				<Table.Cell>{item.east === 1 ? 'Östra' : item.lundby === 1 ? 'Lundby' : item.angered === 1 ? 'Angered' : item.vh === 1 ? 'Västra Hisingen' : item.backa === 1 ? 'Backa' : ''}</Table.Cell>
				<Table.Cell>{item.ssn}</Table.Cell>
				<Table.Cell>{item.address}</Table.Cell>
				<Table.Cell>{item.permitted_hours}</Table.Cell>
				<Table.Cell textAlign='center'>{item.decision === null ? '-' : item.decision}</Table.Cell>
				<Table.Cell textAlign='center'>{item.plan === null ? '-' : item.plan}</Table.Cell>
				<Table.Cell textAlign='center'>{item.binder === 0 ? '-' : '✔️'}</Table.Cell>
				<Table.Cell textAlign='center'>{item.consent === 0 ? '-' : '✔️'}</Table.Cell>
				<Table.Cell textAlign='center'>{item.key === 0 ? '-' : '✔️'}</Table.Cell>
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
				setExpandedRows([]);
				return newphones;
			});
		} else {
			setPhones((oldphones) => {
				const newphones = [...oldphones];
				const index = newphones.findIndex(x => x.id === newPerson.id);
				newphones.splice(index, 1);
				setExpandedRows([]);
				return newphones;
			});
		}
	}

	function renderItemDetails(item) {
		return (
			<Segment basic>
				<ClientEditModule data={item} className="m-5" sendDataToParent={sendDataToParent}></ClientEditModule>
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
			<Table celled fixed striped selectable compact={props.data.tableSize === 0 ? false : props.data.tableSize === 1 ? true : 'very'}>
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