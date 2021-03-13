import {useHistory, useLocation, useParams} from 'react-router-dom'

import queryString from 'querystring'

const useUrl = () => {
	const history = useHistory()
	const location = useLocation()
	const match = useParams()
	const urlQueryString = location.search.replace("?","")
	const query = queryString.parse(urlQueryString);
	const newPush = (path, query) => {
		const newSearch = queryString.encode(query);
		history.push(path+"?"+newSearch)
	}

	const setQuery = (obj) => {
		const newSearch = queryString.encode({...query, ...obj});
		const newPath = location.pathname+"?"+newSearch+location.hash
		history.replace(newPath)
	}

	const setHash = (id) => {
		history.replace(location.pathname+location.search+'#'+id)
	}

	const useUrlObject = {
		...history,
		
		location: {
			...location,
			fullPathname: location.pathname+location.search+location.hash,
			search: query,
			match: match
		},
		push: newPush,
		setSearch: setQuery,
		setHash: setHash
	}
	return useUrlObject
}

export default useUrl