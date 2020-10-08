import {SECOND_INFO,MODIFY_SECOND,CHANGE_SECOND_PDP, ADD_SECOND, DELETE_SECOND, CHANGE_INDEX} from '../../Action/action-type';

const initialState = {
    indexSelected: 0,
    second_users: null
}

export default function userReducer(state = initialState, action) {
	switch(action.type) {
        
        case SECOND_INFO: 
            return {
                ...state,
                second_users: action.payload
            }
        case MODIFY_SECOND :
            return {
                ...state,
                second_users : action.payload
            }
        case CHANGE_SECOND_PDP : 
        return {
            ...state,
            second_users : action.payload
        }
        
        case ADD_SECOND: 
            return {
                ...state,
                second_users: action.payload
            }

        case DELETE_SECOND: 
            return {
                ...state,
                second_users: action.payload
            }

        case CHANGE_INDEX:
            return {
                ...state,
                indexSelected: action.payload
            }
		default: 
			return state;
	}
}