import { useEffect } from 'react'

const useEnter = (callback,change) => {
	useEffect(()=>{
		const onEnter = (event) => event.key === "Enter" && callback()
		document.addEventListener("keyup", onEnter, false);
		return (()=>document.removeEventListener("keyup", onEnter, false));
	},change)
}

export default useEnter