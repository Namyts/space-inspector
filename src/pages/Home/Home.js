import useEnter from 'functions/useEnter';
import useUrl from 'functions/useUrl';
import { useState, useEffect } from 'react';
import classes from './Home.module.css';

const Home = () => {
	const url = useUrl()
	const [rootString, setRootString] = useState('')

	useEffect(()=>console.log(`Reloading! ${new Date().toTimeString()}`),[])

	useEnter(()=>{
		console.log(`Submitted: ${rootString}`)
		url.push('drawer',rootString)
	},[rootString])

	return (
		<div className={classes["page"]}>
			<div className={classes['welcome']}> Welcome to SpaceInspector </div>
			<div className={classes['instructions']}> Enter the path you want to analyse</div>
			<input className={classes["root-input"]} defaultValue={rootString} onChange={e=>setRootString(e.target.value)}/>
		</div>
	);
}

export default Home;
