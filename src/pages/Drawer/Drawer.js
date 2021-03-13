import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import inspectFileSystem, {getFiles} from 'functions/inspectFileSystem'

import classes from './Drawer.module.css'
import useUrl from 'functions/useUrl'

import * as d3 from 'd3'

const Drawer = (props) => {
	const url = useUrl()
	const drawingRef = useRef(null)
	
	const [locked, setLocked] = useState(false)

	const root = url.location.search
	if(!root){url.push('/')}

	useEffect(()=>{
		if(root && !locked){
			setLocked(true)
			inspectFileSystem('./src')
		}
	},[root])

	const [files, setFiles] = useState([])

	const onUpdateFiles = () => {
		const newFiles = getFiles()
		setFiles(newFiles)
	}

	console.log(drawingRef)

	useLayoutEffect(()=>{

	},[files])


	if(locked) {
		return (
			<div className={classes['page']}>
				<button onClick={onUpdateFiles}>Click to update drawing</button>
				<div className={classes['drawer']}>
					<div ref={drawingRef}/>
				</div>
			</div>
			
		)
	} else {
		return null
	}
}

export default Drawer