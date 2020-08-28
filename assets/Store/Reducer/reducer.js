import {combineReducers} from 'redux';
import userReducer from './userReducer';
import contactReducer from './contactReducer';
import favoriteReducer from './favoriteReducer';
import secondReducer from './secondReducer';
import toggleQuestion from './questionReducer'
const rootReducer = combineReducers({
	user: userReducer,
	contact: contactReducer,
	favorite: favoriteReducer,
	second: secondReducer,
	Idquestion : toggleQuestion

});

export default rootReducer;