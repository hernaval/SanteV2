import {FAVORITE_INFO, ADD_FAVORITE, DELETE_FAVORITE} from '../../Action/action-type';


const initialState = {
    favorite: null
}

export default function favoriteReducer(state = initialState, action) {
	switch(action.type) {
        case FAVORITE_INFO: 
        
            return {
                ...state,
                favorite: action.payload
            }
        
        case ADD_FAVORITE: 
            return {
                ...state,
                favorite: action.payload
            }

        case DELETE_FAVORITE: 
            return {
                ...state,
                favorite: action.payload
            }

		default: 
			return state;
	}
}