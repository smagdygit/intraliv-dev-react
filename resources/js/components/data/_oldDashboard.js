import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { Input, Menu, Divider, Grid, Image } from 'semantic-ui-react';
import SmallEmployeeTable from './components/SmallEmployeeTable';

function Navbar() {


	return (
		<div className="container" style={{ width: '90%' }}>
			<Grid columns={3} divided>
				<Grid.Row>
					<Grid.Column>
						<center>
							<h1>Personal</h1>
							<SmallEmployeeTable />
						</center>
					</Grid.Column>
					<Grid.Column>
						<h1>Personal</h1>
						<SmallEmployeeTable />
					</Grid.Column>
					<Grid.Column>
						<h1>Personal</h1>
						<SmallEmployeeTable />
					</Grid.Column>
				</Grid.Row>

				<Grid.Row>
					<Grid.Column>
						<Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
					</Grid.Column>
					<Grid.Column>
						<Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
					</Grid.Column>
					<Grid.Column>
						<Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</div>
	);
}

export default Navbar;