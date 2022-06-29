import axios from "axios";
import {gameDetailsURL, screenshotsURL} from '../api.js';

export const gameDetailAction = (id, slug) => async (dispatch) => {
	const gameURL = await axios.get(gameDetailsURL(id));
	const screenshotUrl = await axios.get(screenshotsURL(slug));
	
	dispatch({
		type: 'LOADING_DATA_DETAILS'
	})

	dispatch({
		type: 'GAME_DETAIL_FETCH',
		payload: {
			game: gameURL.data,
			screen: screenshotUrl.data
		}
	})
}

export const gameResetAction = () => (dispatch) => {
		dispatch({
		type: 'GAME_DETAIL_RESET'
	})
}