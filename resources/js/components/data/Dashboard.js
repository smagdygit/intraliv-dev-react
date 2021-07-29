import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { Input, Menu, Divider, Grid, Image, Icon } from 'semantic-ui-react';
import SmallEmployeeTable from './components/SmallEmployeeTable';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
		text-decoration: none;
    }
	&:hover {
		color: green;
	}

	color: inherit;
	display:inline-block;
    width:100%;
    height:100%;
`;

function Navbar(props) {
	const history = useHistory();

	function handleItemClick(url) {
		history.push(`${url}`);
	}

	return (
		<div className="container" style={{ width: '90%' }}>
			<center>
				<h1 className="display-1 mt-5" style={{ marginBottom: '100px' }}>Intraliv</h1>
				<Grid columns={2} style={{ width: '75%' }}>
					<Grid.Row style={{ height: '300px', padding: '0px' }} >

						<Grid.Column className="p-0">
							<StyledLink to="/data/employees/view" onClick={props.updateParentUrl}>
								<Icon size='huge' name='user' />
								<h1>Personal</h1>
							</StyledLink>
						</Grid.Column>

						<Grid.Column className="p-0">
						<StyledLink to="/data/clients/view" >
							<Icon size='huge' name='universal access' />
							<h1>Kunder</h1>
							</StyledLink>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row style={{ height: '300px', padding: '0px' }}>
					<Grid.Column className="p-0">
						<StyledLink to="/data/phones/view" >
							<Icon size='huge' name='phone' />
							<h1>Telefoner</h1>
							</StyledLink>
						</Grid.Column>
						<Grid.Column className="p-0">
						<StyledLink to="/data/users/view" >
							<Icon size='huge' name='sitemap' />
							<h1>Användare</h1>
							</StyledLink>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</center>
		</div>
	);
}

export default Navbar;