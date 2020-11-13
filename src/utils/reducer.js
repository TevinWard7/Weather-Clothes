import { AccordionActions } from "@material-ui/core";

export const initialState = {
    user: null,
    city: null
};

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_CITY: "SET_CITY"
};

const reducer = (state, action) => {

    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            }
        
        case actionTypes.SET_CITY:
            return {
                ...state,
                city: action.city
            }    
    
        default:
            return state;
    }
}

export default reducer;