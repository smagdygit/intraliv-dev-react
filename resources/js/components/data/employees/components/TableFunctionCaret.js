import { Table, Icon } from 'semantic-ui-react';

function TableFunctionCaret(props) {

	function renderItemCaret(rowId) {
		const currentExpandedRows = props.data.expandedRows;
		const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

		if (isRowCurrentlyExpanded) {
			return <Icon name="caret down" />;
		} else {
			return <Icon name="caret right" />;
		}
	}

	return (
		<Table.Cell textAlign='center'>{renderItemCaret(props.data.index)}</Table.Cell>
	);
}

export default TableFunctionCaret;