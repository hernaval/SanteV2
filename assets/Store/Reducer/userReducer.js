import {IS_LOGGED, CHANGE_PDP, ONLINE_USER} from '../../Action/action-type';
import {USER_INFO} from '../../Action/action-type';
import {MODIFY_USER} from '../../Action/action-type';
import { CHANGE_INDEX } from "../../Action/action-type";
const initialState = {
    isLoggedIn: false,
    user: null
}

export default function userReducer(state = initialState, action) {
	switch(action.type) {
		case IS_LOGGED:
			return {
                ...state,
				isLoggedIn: action.payload
			}
        break;
        
        case USER_INFO: 
            return {
                ...state,
                user: action.payload
            }

        case MODIFY_USER: 
            return {
                ...state,
                user: action.payload
            }
        
        case CHANGE_PDP:
            return{
                ...state,
                user : action.payload
            }
        
        case ONLINE_USER : 
            return {
                ...state,
                online_users : action.payload
            }
        
      
		default: 
			return state;
	}
}