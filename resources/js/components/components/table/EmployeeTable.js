import React, { useState, useEffect } from 'react';
import { Table, Segment, Dimmer, Loader } from 'semantic-ui-react'
import _, { filter } from 'lodash';
import PersonEditModule from '../../test/EmployeeFilterModule';
import TableFunctionCaret from './TableFunctionCaret';
import { FaRegAddressCard } from 'react-icons/fa';
import { GiGearStickPattern } from 'react-icons/gi';
import { MdBlock } from 'react-icons/md';
import { BsQuestionLg } from 'react-icons/bs';



function Main(props) {
	const [fetching, setFetching] = useState(true);
	const [people, setPeople] = useState([
		{
			name: 'Laddar...', email: 'Laddar...', active: false, phone_id: 'Laddar...', sith: 'Laddar...', card: 'Laddar...',
			admin: 'Laddar...', east: 'Laddar...', angered: 'Laddar...', lundby: 'Laddar...', id: 'Laddar...', driverslicense: 'Laddar...',
			care_id_2: 'Laddar...', education: 'Laddar...', doorkey: false, comment: 'Laddar...', phone: { id: 'loading' }
		},
	]);
	const [fetchedPeople, setFetchedPeople] = useState([
		{
			name: 'Laddar...', email: 'Laddar...', active: false, phone_id: 'Laddar...', sith: 'Laddar...', card: 'Laddar...',
			admin: 'Laddar...', east: 'Laddar...', angered: 'Laddar...', lundby: 'Laddar...', id: 'Laddar...', driverslicense: 'Laddar...',
			care_id_2: 'Laddar...', education: 'Laddar...', doorkey: false, comment: 'Laddar...', phone: { id: 'loading' }
		},
	]);
	const [expandedRows, setExpandedRows] = useState([]);
	const [refresher, setRefresher] = useState(false);
	const userObject = JSON.parse(localStorage.getItem('user'));
	const [night, setNight] = useState(localStorage.getItem('night') === 'true' ? true : false);

	useEffect(() => {
		setNight(localStorage.getItem('night') === 'true' ? true : false);
	}, [localStorage.getItem('night')]);

	useEffect(() => {
		fetch(`/api/employees`, {
			method: 'GET',
			headers: {
				'Authorization': userObject.token,
			}
		})
			.then(response => response.json())
			.then(data => {
				setFetching(false);
				const filteredEmployees = filterInput(data, props.data.filter);
				/*const hed = props.data.headers;
				filteredEmployees.splice(10, 0, {id: 999999, phone: { id: 'loading' }, name: hed[0][1], active: hed[1][1], phone_id: hed[2][1], sith: hed[3][1],
					admin: hed[4][1], east: hed[5][1], angered: hed[6][1], lundby: hed[7][1], vh: hed[8][1], backa: hed[9][1], id: hed[10][1], care_id_2: hed[11][1],
					policy_it_signed: hed[12][1], education: hed[13][1], doorkey: hed[14][1], comment: hed[15][1]});*/
				setPeople(filteredEmployees);
				setFetchedPeople(data);
				props.updateResultCount(filteredEmployees.length);
			});
	}, [refresher]);

	useEffect(() => {
		const filteredEmployees = filterInput(fetchedPeople, props.data.filter);
		props.updateResultCount(filteredEmployees.length)
		setPeople(filteredEmployees);
	}, [props.data.filter]);

	//Auto close any opened items when filter changes
	useEffect(() => {
		setExpandedRows([]);
	}, [props.data.filter]);

	function filterInput(input, filter) {
		const output = input.flatMap((item, index) => {

			if (filter.text !== '') {
				if (!((item.name.toLowerCase().indexOf(filter.text.toLowerCase()) !== -1) || (item.email.toLowerCase().indexOf(filter.text.toLowerCase()) !== -1) || (item.comment.toLowerCase().indexOf(filter.text.toLowerCase()) !== -1) || (item.care_id_2.toLowerCase().indexOf(filter.text.toLowerCase()) !== -1) || (item.policy_it_signed.toLowerCase().indexOf(filter.text.toLowerCase()) !== -1))) {
					return [];
				}
			}

			let boolFail = false;
			if (['active', 'admin', 'education', 'east', 'lundby', 'angered', 'vh', 'backa', 'doorkey', 'card'].forEach((filterItem) => {
				if (filter[filterItem]) {
					if (!item[filterItem]) boolFail = true;
				}
			}));
			if (boolFail) return [];

			if (filter.sith !== 'null') {
				if (item.sith !== filter.sith) return [];
			}

			if (filter.policy_it_signed !== 'null') {
				if (item.policy_it_signed !== filter.policy_it_signed) return [];
			}

			if (filter.group !== 'null') {
				if (item.group !== filter.group) return [];
			}

			return [item];
		});

		return output;
	}

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
		const locationArr = [];
		if (item.east) locationArr.push('Ö');
		if (item.lundby) locationArr.push('L');
		if (item.angered) locationArr.push('A');
		if (item.vh) locationArr.push('V');
		if (item.backa) locationArr.push('B');
		if (locationArr.length === 0) locationArr.push('-');
		const location = locationArr.join(', ');
		const itemRows = [
			<Table.Row key={item.id} onClick={() => handleRowClick(index)}>
				<TableFunctionCaret data={{ index: index, expandedRows: expandedRows }} />
				<Table.Cell singleLine>{`${item.admin ? `👑 ` : ''}${item.name}`}</Table.Cell>
				<Table.Cell textAlign='center'>{item.active === 0 ? '❌' : '✔️'}</Table.Cell>
				<Table.Cell textAlign='center'>{item.group === 0 ? '-' : item.group === '1' ? '🏅' : item.group === '2' ? '🥈' : item.group}</Table.Cell>
				<Table.Cell textAlign='center'>{item.phone.name === 0 ? '-' : item.phone.name}</Table.Cell>
				<Table.Cell textAlign='center'>{item.sith === 'Yes' ? '✔️' : item.sith === 'N Never' ? '-' : item.sith === 'To Install' ? '🕑' : item.sith === 'Ordered' ? '✉️' : item.sith === 'To Order' ? '❗' : item.sith === 'Delete' ? '🗑️' : item.sith === 'Deleted' ? '🗑️' : '???'}</Table.Cell>
				<Table.Cell>{location}</Table.Cell>
				<Table.Cell>{item.id}</Table.Cell>
				<Table.Cell textAlign='center'>{item.care_id_2 !== '-1' ? item.care_id_2 : '-'}</Table.Cell>
				<Table.Cell textAlign='center'>{item.policy_it_signed === 'N Do' ? '-' : item.policy_it_signed}</Table.Cell>
				<Table.Cell textAlign='center'>{item.education === 0 ? '-' : '📜'}</Table.Cell>
				<Table.Cell textAlign='center'>{item.doorkey === 0 ? '-' : '🔑'}</Table.Cell>
				<Table.Cell textAlign='center'>{item.card === 0 ? '-' : '🖼️'}</Table.Cell>
				<Table.Cell textAlign='center'>{<div> {(item.driverslicense === 'automatic' || item.driverslicense === 'manual') && <FaRegAddressCard style={{ color: item.driverslicense === 'automatic' ? 'green' : 'green' }} />} {item.driverslicense === 'manual' && <GiGearStickPattern style={{ color: 'green' }} />} {item.driverslicense === 'none' && <MdBlock style={{color: 'red'}}/>} {item.driverslicense === '' && <BsQuestionLg style={{color: 'orange'}}/>}</div>} </Table.Cell>
				<Table.Cell>{item.comment}</Table.Cell>
			</Table.Row>
		];

		if (expandedRows.includes(index)) {
			itemRows.push(
				<Table.Row key={"row-expanded-" + index}>
					<Table.Cell colSpan="22">{renderItemDetails(item)}</Table.Cell>
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
			<Table inverted={night} sortable celled fixed striped selectable compact={props.data.tableSize === 0 ? false : props.data.tableSize === 1 ? true : 'very'}>
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