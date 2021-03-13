import useEnter from 'functions/useEnter';
import { useState, useEffect } from 'react';
import classes from './Main.module.css';

const App = () => {
	const [rootString, setRootString] = useState('')

	useEnter(()=>{
		console.log(`Submitted: ${rootString}`)


		window.ipcRenderer.invoke('example-action', {text: rootString})

	},[rootString])

	return (
		<div className={classes["App"]}>
			<div> Welcome to SpaceInspector </div>
			<input className={classes["root-input"]} defaultValue={rootString} onChange={e=>setRootString(e.target.value)}/>
		</div>
	);
}

export default App;
