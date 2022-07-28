import axios from "axios";
import {gameDetailsURL, screenshotsURL} from '../api';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {AppStateType} from '../reducers/index';

export const gameDetailAction = (id: number, slug: string) => async (dispatch: ThunkDispatch<AppStateType, void, Action>) => {
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

export const gameResetAction = () => (dispatch: ThunkDispatch<AppStateType, void, Action>) => {
		dispatch({
		type: 'GAME_DETAIL_RESET'
	})
}