import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
	Button,
	Form,
	Grid,
	Loader,
	Dimmer,
	Divider,
	Modal,
	Checkbox,
} from 'semantic-ui-react';
import DatePicker from "react-datepicker";


function Staff(props) {
	const userObject = JSON.parse(localStorage.getItem('user'));
	const history = useHistory();
	const [form, setForm] = useState(props.data.loadForm());

	function createErrorObject() {
		const reply = {};
		Object.entries(props.person).forEach(([key, value]) => { reply[key] = false });
		return reply;
	}

	/*function checkForErrors() {
		if (form.name.length === 0) errorForm.name = true;

		if (errorForm.name = true) return true; else return false;
	}*/

	function sendUpdate() {
		props.sent();
	}

	useEffect(() => {
		props.formToParent(form);
	}, [form]);

	return (
		<Modal
			size="large"
			onClose={props.canceled}
			open={true}
		>
			<Dimmer active={props.data.isUploading}>
				<Loader size="huge" content="Skickar data..." />
			</Dimmer>
			<Modal.Header>{props.name}</Modal.Header>
			<Modal.Content image>
				<Modal.Description>
					<Grid style={{ width: '1150px' }}>
						<Grid.Row>
							<Grid.Column width={4} className="pl-3">
								{props.layout.sidebar.map((item, index) => {
									if (item.type === 'checkbox') return (
										<Form.Field
											key={'sidebar' + index}
											className="p-2"
											control={Checkbox}
											toggle
											label={item.label}
											name={item.data}
											checked={form[item.data]}
											onChange={e => setForm({ ...form, [item.data]: !form[item.data] })}
										/>
									); else if (item.type === 'link') return (
										<div className="text-center" key={'sidebar' + index}>
											<a target="_blank" href={item.data}><Button className="m-2 mt-3" color="blue" fluid icon='world' content="Carefox Profil" labelPosition='left' /></a>
										</div>
									);
								})}
							</Grid.Column>
							<Grid.Column width={12}>
								<Grid className="m-0">
									{props.layout.main.map((row, rowdex) => {
										return (
											<Grid.Row key={'row' + rowdex}>
												{row.map((item, index) => {
													if (item.type === 'title') return (
														<Grid.Column width={16} key={'row' + rowdex + 'item' + index}>
															<h1>{item.label}</h1>
															<Divider className="mb-0" />
														</Grid.Column>
													); else if (item.type === 'input') return (
														<Grid.Column width={item.width} className="pr-0" key={'row' + rowdex + 'item' + index}>
															<Form>
																<Form.Input
																	fluid
																	error={form.name.length < 1}
																	name={item.data}
																	label={item.label}
																	placeholder={item.placeholder}
																	value={form[item.data]}
																	onChange={e => setForm({ ...form, [item.data]: e.target.value })}
																/>
															</Form>
														</Grid.Column>
													); else if (item.type === 'select') return (
														<Grid.Column width={item.width} className="pr-0" key={'row' + rowdex + 'item' + index}>
															<Form>
																<Form.Dropdown
																	disabled={item.disabled === undefined ? false : item.disabled()}
																	fluid
																	selection
																	name={item.data}
																	label={item.label}
																	options={item.options}
																	value={form[item.data]}
																	onChange={(e, val) => setForm({ ...form, [item.data]: val.value })}
																/>
															</Form>
														</Grid.Column>
													); else if (item.type === 'date') return (
														<React.Fragment key={'row' + rowdex + 'item' + index}>
															<Grid.Column width={item.width} className="pr-0">
																<Form>
																	<Form.Field>
																		<label>{item.label}</label>
																		<DatePicker
																			id={item.label}
																			className="mb-3"
																			selected={form[item.data]}
																			onChange={(date) => setForm({ ...form, [item.data]: date })}
																			calendarStartDay={1}
																			peekNextMonth
																			showMonthDropdown
																			showYearDropdown
																			dropdownMode="select"
																			dateFormat="yyyy-MM-dd"
																		/>
																	</Form.Field>
																</Form>
															</Grid.Column>
															<Grid.Column width={1} className="pr-0">
																<Form>
																	<Form.Field>
																		<label>🗑️</label>
																		<Button fluid content="EJ" color="red" className="pl-3" onClick={() => setForm({ ...form, [item.data]: null })} />
																	</Form.Field>
																</Form>
															</Grid.Column>
														</React.Fragment>
													); else if (item.type === 'textbox') return (
														<Grid.Column width={item.width} className="pr-0" key={'row' + rowdex + 'item' + index}>
															<Form>
																<Form.TextArea
																	style={{ width: '100%', height: '100%' }}
																	rows={6}
																	name={item.data}
																	label={item.label}
																	placeholder={item.placeholder}
																	value={form[item.data]}
																	onChange={e => setForm({ ...form, [item.data]: e.target.value })}
																/>
															</Form>
														</Grid.Column>
													)
												})}
											</Grid.Row>
										)
									})}
								</Grid>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				<Button
					color='red'
					onClick={props.canceled}
				>
					Avbryt
				</Button>
				<Button
					content="Skicka in"
					labelPosition='right'
					icon='checkmark'
					positive
					onClick={sendUpdate}
				/>
			</Modal.Actions>
		</Modal >
	);
}

export default Staff;