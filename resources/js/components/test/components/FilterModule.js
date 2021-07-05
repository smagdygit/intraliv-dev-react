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



function FilterModule(props) {
	const [form, setForm] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [uploadingStatus, setUploadingStatus] = useState({ status: 'standby', text: '' });
	const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
	const [formDynamicData, setFormDynamicData] = useState(props.data.dynamicData);
	const [dynamicDataList, setDynamicDataList] = useState([]);
	const [phoneUserLog, setPhoneUserLog] = useState([]);
	const userObject = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		if (props.data.dynamicDataUrl) {
			fetch(props.data.dynamicDataUrl, {
				method: 'GET',
				headers: {
					'Authorization': userObject.token,
				}
			})
				.then(response => response.json())
				.then(data => {
					//setDynamicDataList();
					const recievedData = props.sendDynamic(data);
					//console.log(recievedData);
					//setDynamicDataList(recievedData);
				});
		}
	}, []);

	//Convert boolean data from 1's and 0's to true's and false's
	if (props.data.table !== undefined && isLoading === true) {
		setIsLoading(false);
		const newForm = { ...props.data.table };
		props.data.booleanList.map((item) => {
			newForm[item] = props.data.table[item] === 1 ? true : false
		});
		setForm({ ...newForm });
	}

	function handleInputChange(e) {
		const target = e.target;
		form[target.name] = target.value;
		setForm({ ...form });
	}

	function handleDynamicDataInputChange(e, data) {
		//const target = e.target; console.log(data);
		setFormDynamicData(data.value);
		/*const newPhoneLog = data.value.map((item) => {
			if (item.phone_id !== '') {
				return (
					<Message warning key={'message ' + item}>
						<Message.Header>OBS, {phoneList.find(x => x.key === item).employees} har redan telefon WP{phoneList.find(x => x.key === item).}</Message.Header>
						<p>
							Om du lägger till denna telefonen på han kommer den gamla att överskrivas då en anställd endast kan ha en telefon registrerad på sig.
					</p>
					</Message>
				);
			}
		});*/
		//setPhoneUserLog([...newPhoneLog]);
	}

	function handleSelectChange(e, name, val) {
		const target = e.target;
		form[name] = val.value;
		setForm({ ...form });
	}

	function handleCheckboxChange(e, name) {
		const target = e.target;
		form[name] = !form[name];
		setForm({ ...form });
	}

	function handleSubmit(event) {
		event.preventDefault();

		const body = {};
		props.data.variableList.map((item, index) => {
			body[item] = form[item];
		});
		if (props.data.dynamicKey) {
			body[props.data.dynamicKey] = formDynamicData;
		}

		setUploadingStatus({ status: 'uploading', text: 'Updaterar data, vänligen vänta...' });
		const postMethod = (props.data.table.id !== '') ? 'PUT' : 'POST';
		fetch(props.data.uploadUrl, {
			method: postMethod,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': userObject.token,
			},
			body: JSON.stringify(body),
		})
			.then(response => response.json())
			.then(data => {
				if (data.status === 'success') {
					setUploadingStatus(form.id !== '' ? { status: 'success', text: props.data.successUpdate } : { status: 'success', text: props.data.successNew });
					const newForm = { ...form };
					props.data.booleanList.map((item) => {
						newForm[item] = props.data.table[item] === true ? 1 : 0
					});
					props.sendDataToParent({ status: 'updated', newForm: newForm });
				} else {
					setUploadingStatus({ status: 'error', text: 'Error: ' + data.text });
				}
			});
	}

	function handleRemovePress(event) {
		event.preventDefault();
		setDeleteConfirmOpen(true);
	}

	function handleCancelPress() {
		props.sendDataToParent('cancel');
	}

	function handleRemoveConfirm() {
		setDeleteConfirmOpen(false);
		fetch(props.data.uploadUrl, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': userObject.token,
			},
			body: JSON.stringify({ id: form.id }),
		})
			.then(response => response.json())
			.then(data => {
				if (data.status === 'success') {
					setUploadingStatus({ status: 'success', text: props.data.successDelete });
					props.sendDataToParent({ status: 'deleted', id: form.id });
				} else {
					setUploadingStatus({ status: 'error', text: 'Error: ' + data.text });
				}
			});
	}


	return (
		<>
			<Grid>
				<GridColumn width={2}>
					{props.data.layout.areaTopLeft.map((item, index) => {
						return (
							<Form.Field
								key={"areaTopLeft" + index}
								className="p-2"
								control={Checkbox}
								toggle
								label={item.text}
								name={item.data}
								checked={form[item.data]}
								onChange={e => handleCheckboxChange(e, item.data)}
							/>
						);
					})}
					{((props.data.layout.areaTopLeft.length > 0) && (props.data.layout.areaBottomLeft.length > 0)) &&
						<Divider />
					}
					{props.data.layout.areaBottomLeft.map((item, index) => {
						return (
							<Form.Field
								key={"areaBottomLeft" + index}
								className="p-2"
								control={Checkbox}
								toggle
								label={item.text}
								name={item.data}
								checked={form[item.data]}
								onChange={e => handleCheckboxChange(e, item.data)}
							/>
						);
					})}
				</GridColumn>
				<GridColumn width={14}>
					<Form>
						{props.data.layout.areaRight.map((item, index) => {
							const result = item.map((subItem, subIndex) => {
								if (subItem.type === 'input') {
									return (
										<Form.Input
											key={"areaRight" + index + subIndex}
											name={subItem.data}
											fluid
											label={subItem.text}
											placeholder={subItem.placeholder}
											value={form[subItem.data]}
											onChange={e => handleInputChange(e)}
										/>
									);
								}
								if (subItem.type === 'dropdown') {
									if (subItem.data === 'dynamic') {
										return (
											<Form.Dropdown
												key={"areaRight" + index + subIndex}
												name='phone'
												label='Telefon ID'
												placeholder='WPXX'
												disabled={props.data.dynamicDataList.length === 0}
												fluid
												selection
												multiple={subItem.multiple}
												options={props.data.dynamicDataList}
												value={formDynamicData}
												onChange={(e, data) => handleDynamicDataInputChange(e, data)}
											/>
										);
									} else {
										return (
											<Form.Select
												key={"areaRight" + index + subIndex}
												name={subItem.data}
												options={subItem.options}
												fluid
												multiple={subItem.multiple}
												label={subItem.text}
												defaultValue={form[subItem.data]}
												onChange={(e, val) => handleSelectChange(e, subItem.data, val)}
											/>
										);
									}
								}
								if (subItem.type === 'text') {
									return (
										<Form.TextArea
											key={"areaRight" + index + subIndex}
											name={subItem.data}
											label={subItem.text}
											placeholder={subItem.placeholder}
											value={form[subItem.data]}
											onChange={e => handleInputChange(e)}
										/>
									);
								}
							})
							return (
								<Form.Group widths='equal' key={"areaRight" + index}>
									{result}
								</Form.Group>
							);
						})
						}
						<Button positive type='submit' className="w-100 mb-3" onClick={event => handleSubmit(event)}>{(props.data.id !== '') ? props.data.buttonAcceptNewText : props.data.buttonAcceptUpdateText}</Button>
						{props.data.table.id !== '' &&
							<div>
								<Button type='submit' color="red" className="w-100" onClick={event => handleRemovePress(event)}>{props.data.buttonCancelText}</Button>
								<Confirm
									open={deleteConfirmOpen}
									onConfirm={() => handleRemoveConfirm()}
									onCancel={() => setDeleteConfirmOpen(false)}
									cancelButton={props.data.alertCancel}
									confirmButton={props.data.alertAccept}
									content={props.data.alertContent}
									header={props.data.alertTitle}
								/>
							</div>
						}
						{props.data.table.id === '' &&
							<Button type='submit' color="red" className="w-100" onClick={event => handleCancelPress(event)}>Avbryt</Button>
						}
					</Form>
				</GridColumn>
			</Grid>
			<center>
				<h2 className="mt-3">{uploadingStatus.text}</h2>
			</center>
		</>
	);
}

export default FilterModule;