import { TOGGLE_SIDEBAR } from '../actions/actionTypes';

const initialState = {
    isOpen: true,
    selected: "PM"
}

export default function taskbarReducer(state = initialState, action) {
    switch (action.type) {
        case "TOGGLE_SIDEBAR":
            return {
                ...state,
                isOpen: !state.isOpen
            }
        case "SELECTE_PAGE":
            return {
                ...state,
                selected: action.payload
            }
        default:
            return state;
    }
}

export function toggleSidebar() {
    return dispatch => {
        dispatch({
            type: TOGGLE_SIDEBAR
        })
    }
}

export function selectPage(page) {
    return dispatch => {
        dispatch({
            type: "SELECTE_PAGE",
            payload: page
        })
    }
}