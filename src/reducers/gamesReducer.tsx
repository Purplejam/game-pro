import {fetchAllGamesType} from '../actions/gamesAction';

const initialState = {
	popular: [],
	newComes: [],
	upcoming: [],
	isLoading: true,
	searched: {
		games: [],
		query: ''
	},
}

const gameReducer = (state = initialState, action: fetchAllGamesType) => {
	switch(action.type) {
		case 'FETCH_GAMES' :
			return {
				...state,
				popular: action.payload.popular,
				newComes: action.payload.newComes,
				upcoming: action.payload.upcoming,
				isLoading: false,
			} 
			case 'LOADING_DATA' : 
				return {
					...state,
					isLoading: true,
				}
			case 'SEARCH_GAMES' : 
				return {
					...state,
					searched: {
						games: action.payload.searched,
						query: action.payload.query},
					isLoading: false,
				}
				case 'CLEAR_DATA' : 
					return {
						...state,
						searched: {
							games: [],
							query: ''
						}
					}
				default : 
					return {
						...state,
					}
	}
}

export default gameReducer;