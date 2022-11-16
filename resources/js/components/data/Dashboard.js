import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { Input, Menu, Divider, Grid, Image, Icon, GridColumn } from 'semantic-ui-react';
import SmallEmployeeTable from './components/SmallEmployeeTable';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
		text-decoration: none;
    }
	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
		text-decoration: none;
	}

	color: inherit;
	display:inline-block;
    width:100%;
    height:100%;
`;

const StyledCol = styled(Grid.Column)`
	:hover {
		background-color: rgba(0, 0, 0, 0.1);
		text-decoration: none;
		cursor: pointer;

		> * {
			> * {
				color: #009300;
			}
		}
	}

	
`;

function Dashboard(props) {
	const history = useHistory();

	function handleItemClick(url) {
		history.push(`${url}`);
	}

	return (
		<center>
			<div style={{ width: '90%' }}>
				<h1 className="display-1 mt-5" style={{ marginBottom: '100px', fontFamily: 'Roboto, sans-serif' }}>Intraliv</h1>
				<Grid celled="internally" centered textAlign="center" style={{ paddingBottom: '300px', paddingTop: '50px' }}>
					<Grid.Row columns={15} centered textAlign="center" stretched>
						<StyledCol width={5} textAlign="center" className="p-5" onClick={() => history.push('/personal')}>
							<div>
								<Icon size='huge' name='user' />
								<h1>Personal</h1>
							</div>
						</StyledCol>
						<StyledCol width={5} textAlign="center" className="p-5" onClick={() => history.push('/kunder')}>
							<div>
								<Icon size='huge' name='universal access' />
								<h1>Kunder</h1>
							</div>
						</StyledCol>
						<StyledCol width={5} textAlign="center" className="p-5" onClick={() => history.push('/telefoner')}>
							<div>
								<Icon size='huge' name='phone' />
								<h1>Telefoner</h1>
							</div>
						</StyledCol>
					</Grid.Row>
					<Grid.Row columns={10} centered textAlign="center">
						<StyledCol width={5} textAlign="center" className="p-5" onClick={() => history.push('/data/users/view')}>
							<div>
								<Icon size='huge' name='sitemap' />
								<h1>Användare</h1>
							</div>
						</StyledCol>
						<StyledCol width={5} textAlign="center" className="p-5" onClick={() => history.push('/fordon/alla')}>
							<div>
								<Icon size='huge' name='car' />
								<h1>Fordon</h1>
							</div>
						</StyledCol>
					</Grid.Row>
				</Grid>
				{/*<Grid columns={2} style={{ width: '75%' }}>
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
	</Grid>*/}
			</div>
		</center>
	);
}

export default Dashboard;