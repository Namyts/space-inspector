import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import Drawer from 'pages/Drawer/Drawer'
import Home from 'pages/Home/Home'
import classes from './App.module.css';
import useUrl from 'functions/useUrl';


const App = () => {
	const url = useUrl()
	useEffect(()=>console.log(`Reloading! ${new Date().toTimeString()}`),[])
	return (
		<div className={classes["main"]}>
			{url.location.pathname !== '/' && <button onClick={()=>url.push('/')}>Go back</button>}
			<Switch>
				<Route path="/" exact component={Home}/>
				<Route path="/drawer" exact component={Drawer}/>
			</Switch>
		</div>
	);
}

export default App;
