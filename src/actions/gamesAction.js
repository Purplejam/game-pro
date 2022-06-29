import axios from "axios";
import {popularGameURL, upcomingGamesURL, newestGamesURL, searchedGamesURL} from '../api.js';


export const gamesActionThunk = () => async (dispatch) => {
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


export const gamesSearchThunk = (game_name) => async (dispatch) => {
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

export const clearDataAction = () => (dispatch) => {
	dispatch({
		type: 'CLEAR_DATA'
	})
}