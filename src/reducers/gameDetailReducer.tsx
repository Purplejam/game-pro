import {GameDetailType} from '../actions/gameDetailAction';

//types
export type detailReducerType = {
	game: {
		name: string,
		id: number,
		rating: number,
		parent_platforms: object[],
		background_image: string,
		description_raw: string
	},
	screen: {
		results: object[]
	},
	isLoading: boolean,
}

const initialState = {
	game: {
		name: '',
		id: 0,
		rating: 0,
		parent_platforms: [],
		background_image: '',
		description_raw: ''
	},
	screen: {
		results: []
	},
	isLoading: true,
}


const gameDetailsReducer = (state = initialState, action: GameDetailType) => {
	switch(action.type) {
		case 'GAME_DETAIL_FETCH' :
			return {
				game: action.payload.game,
				screen: action.payload.screen,
				isLoading: false
			}
		case 'GAME_DETAIL_RESET' : 
			return {
				...initialState
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