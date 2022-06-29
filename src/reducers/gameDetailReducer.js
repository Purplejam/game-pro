const initialState = {
	game: {
		parent_platforms: []
	},
	screen: {
		results: []
	},
	isLoading: true,
}

const gameDetailsReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'GAME_DETAIL_FETCH' :
			return {
				...state,
				game: action.payload.game,
				screen: action.payload.screen,
				isLoading: false
			}
		case 'GAME_DETAIL_RESET' : 
			return {
				isLoading: true,
				game: {parent_platforms: []},
				screen: {results: []},
			}
		case 'LOADING_DATA_DETAILS' : 
			return {
				...state,
				isLoading: true
			}
		default : 
			return {
				...state,
			}
	}
}

export default gameDetailsReducer;