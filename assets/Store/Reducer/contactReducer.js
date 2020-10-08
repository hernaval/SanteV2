import {CONTACT_INFO, ADD_CONTACT, DELETE_CONTACT} from '../../Action/action-type';

const initialState = {
    contact: null
}

export default function userReducer(state = initialState, action) {
	switch(action.type) {
        
        case CONTACT_INFO: 
            return {
                ...state,
                contact: action.payload
            }
        
        case ADD_CONTACT: 
            return {
                ...state,
                contact: action.payload
            }

        case DELETE_CONTACT: 
            return {
                ...state,
                contact: action.payload
            }

		default: 
			return state;
	}
}