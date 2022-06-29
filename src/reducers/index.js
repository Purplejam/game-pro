import gamesReducer from './gamesReducer.js';
import gameDetailsReducer from './gameDetailReducer.js';
import { combineReducers } from 'redux';
const hui = "HUI";

const initialState = {
	user: hui
}

const userReducer = (state = initialState, action) => {
	switch(action.type) {
		case ('IS_USER') :
			return {...state}
		default : 
			return {...state}
	}

}

const rootReducer = combineReducers({
	games: gamesReducer,
	user: userReducer,
	gameDetail: gameDetailsReducer
})

export default rootReducer;