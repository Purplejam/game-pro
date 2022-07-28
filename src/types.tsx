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

export type gamePlatFormType = {
	platform: {
		id: number, 
		name: string
	}
}

export type screenGameType = {
	image: string,
	id: number
}

export type developerType = {
	id: number,
	name: string,
	slug: string,
	games_count: number,
	image_background: string
}

export type gameType = {
	id: number,
	name: string,
	ratings: {
		percent: number
	}[],			
	slug: string,
	added: number,
	released: string,
	background_image: string,
	genres: {
		name: string,
		id: number
	}[]
}

export type gameListType = Array<gameType>;

export type fetchAllGamesType = {
	type: actionTypes,
	payload: {
		popular: gameListType,
		newComes: gameListType,
		upcoming: gameListType,
		searched: gameListType,
		query: string,
	}
}

type actionTypes = 'FETCH_GAMES' | 'LOADING_DATA' | 'SEARCH_GAMES' | 'CLEAR_DATA';

export type GameDetailType = {
	type: detailActionTypes,
	payload: detailReducerType
}

type detailActionTypes = 'LOADING_DATA_DETAILS' | 'GAME_DETAIL_FETCH' | 'GAME_DETAIL_RESET';
