import axios from "axios";
import {popularGameURL, upcomingGamesURL, newestGamesURL, searchedGamesURL} from '../api';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { AppStateType } from '../reducers/index';
import {gameListType} from '../components/Home';

//types
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

//actions
export const gamesActionThunk = () => async (dispatch: ThunkDispatch<AppStateType, void, Action>) => {
	const popularGamesData = await axios.get(popularGameURL);
	const newestGamesData = await axios.get(newestGamesURL);
	const upcomingGamesData = await axios.get(upcomingGamesURL);

	dispatch({
		type: 'FETCH_GAMES',
		payload: {
			popular: popularGamesData.data.results,
			newComes: newestGamesData.data.results,
			upcoming: upcomingGamesData.data.results,
		}
	})
}


export const gamesSearchThunk = (game_name: string) => async (dispatch: ThunkDispatch<AppStateType, void, Action>) => {
	dispatch({
		type: 'LOADING_DATA',
	})

	const searchedGamesPayload = await axios.get(searchedGamesURL(game_name));

	dispatch({
		type: 'SEARCH_GAMES',
		payload: {
			searched: searchedGamesPayload.data.results,
			query: game_name
		}
	})
}

export const clearDataAction = () => (dispatch: ThunkDispatch<AppStateType, void, Action>) => {
	dispatch({
		type: 'CLEAR_DATA'
	})
}