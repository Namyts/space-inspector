import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import inspectFileSystem, {getFiles} from 'functions/inspectFileSystem'

import classes from './Drawer.module.css'
import useUrl from 'functions/useUrl'

import * as d3 from 'd3'
import useDimensions from 'functions/useDimensions'
import drawSVG from './drawSVG'


const Drawer = (props) => {
	const url = useUrl()
	
	const svgRef = useRef()
	const [drawerRef, getSize] = useDimensions()

	const svgSize = getSize()
	
	const root = url.location.search.root || './src'
	if(!root){url.push('/')}

	const [data, setData] = useState(null)

	const [locked, setLocked] = useState(false)
	useEffect(()=>{
		if(!locked){
			console.log(`INSPECTING FS`)
			inspectFileSystem(root)
			setLocked(true)
		}
		
	},[])

	const onUpdateFiles = () => {
		setData(transformFileData(getFiles()))
	}

	useEffect(()=>{
		if(!svgRef.current || !data){return}
		console.log(svgSize)
		console.log(svgRef.current)
		console.log(drawerRef.current)
		console.log('time to draw')
		drawSVG(d3.select(svgRef.current), data, {
			width: svgSize.width,
			height: svgSize.height
		})
	},[data, JSON.stringify(svgSize)])


	return (
		<div className={classes['page']}>
			<button onClick={onUpdateFiles}>Click to update drawing</button>
			<div className={classes['drawer']} ref={drawerRef}>
				<svg style={{position: 'absolute', height: "100%", width: "100%"}} ref={svgRef}/>
			</div>
		</div>
	)

}

export default Drawer

const transformFileData = (data) => {
	console.log(data)
	const root = data.find(d=>!d.parent)

	const getChildren = (p) => {
		const self = data.find(d=>d.path==p)
		if(!self) {return}
		if(self.type==='file'){
			return {
				name: self.name,
				value: self.size
			}
		} else {
			return {
				name: self.name,
				children: self.contains.map(c=>getChildren(c))
			}
		}
		
	}

	const results = getChildren(root.path)
	console.log(results)
	return results
}