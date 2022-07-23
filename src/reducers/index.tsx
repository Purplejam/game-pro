import gamesReducer from './gamesReducer';
import gameDetailsReducer from './gameDetailReducer';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
	games: gamesReducer,
	gameDetail: gameDetailsReducer
})

type rootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<rootReducerType>;


export default rootReducer;