import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from './components/UserContext';

const LoggedIn = function () {
	const { user, setUser } = useContext(UserContext);



	return (
		<pre>{JSON.stringify(user, 0, '\n')}</pre>
	);
}

export default LoggedIn;