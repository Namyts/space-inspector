import useEnter from 'functions/useEnter';
import { useState, useEffect } from 'react';
import classes from './Main.module.css';

const { ipcRenderer } = window.require('electron')

const App = () => {
	const [rootString, setRootString] = useState('')

	useEnter(()=>{
		console.log(`Submitted: ${rootString}`)

		console.log('test')
		ipcRenderer.invoke('example', {text: rootString})

	},[rootString])

	return (
		<div className={classes["App"]}>
			<div> Welcome to SpaceInspector </div>
			<input className={classes["root-input"]} defaultValue={rootString} onChange={e=>setRootString(e.target.value)}/>
		</div>
	);
}

export default App;
