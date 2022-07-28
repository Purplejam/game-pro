import {GameDetailType} from '../actions/gameDetailAction';

//types
export type detailReducerType = {
	game: {
		name: string,
		id: number,
		rating: number,
		parent_platforms: object[],
		background_image: string,
		description_raw: string,
		reddit_description: string,
		developers: {
			id: number,
			name: string,
			slug: string,
			games_count: number,
			image_background: string
		}[],
		added: number,
		website: string
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
		description_raw: '',
		reddit_description: '',
		developers: [{
					id: 0,
					name: '',
					slug: '',
					games_count: 0,
					image_background: ''
				}],
		added: 0,
		website: ''
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