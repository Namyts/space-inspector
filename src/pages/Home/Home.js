import useEnter from 'functions/useEnter';
import useUrl from 'functions/useUrl';
import { useState, useEffect } from 'react';
import classes from './Home.module.css';

const Home = () => {
	const url = useUrl()
	const [rootString, setRootString] = useState('')

	const submit = (path) => {
		console.log(`Submitted: ${path}`)
		url.push('drawer',{root: path})
	}

	useEnter(()=>submit(rootString),[rootString])

	const setPaths = [
		'./src',
		'./',
		'/'
	]

	return (
		<div className={classes["page"]}>
			<div className={classes['welcome']}> Welcome to SpaceInspector </div>
			<div className={classes['instructions']}> Enter the path you want to analyse</div>
			<input className={classes["root-input"]} defaultValue={rootString} onChange={e=>setRootString(e.target.value)}/>
			<div className={classes['instructions']}>Or try:</div>
			<div className={classes['button-grid']}>
				{setPaths.map(p=>{
					return <button className={classes['preset-button']} onClick={()=>submit(p)}>{p}</button>
				})}
			</div>
		</div>
	);
}

export default Home;
