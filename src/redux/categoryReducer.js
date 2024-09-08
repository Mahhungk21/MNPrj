import { ADDCATEGORY, CATEGORY } from "../api/url";
import instance from "../api/util";

const initialState = {
    categories: [],
    selected: "all",
    isOpen: false,
    newName: ""
}

const getCategory = async (name, categoryId) => {
    try {
        const params = {
            "name": name,
            "categoryId": categoryId
        }
        const response = await instance.get(CATEGORY, params);
        if (response.request.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Get categories Fail', error);
    }
};

export default function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_CATEGORY':
            return {
                ...state,
                categories: action.payload
            };
        case 'SELECT_CATEGORY':
            return {
                ...state,
                selected: action.payload
            };
        case 'OPEN_ADD_CATEGORY':
            return {
                ...state,
                isOpen: true
            };

        case 'CLOSE_ADD_CATEGORY':
            return {
                ...state,
                isOpen: false
            };
        case 'SET_CATE_NAME':
            return {
                ...state,
                newName: action.payload
            };
        case 'ADD_CATE':
            return {
                ...state,
                categories: [...state.categories, action.payload],
                isOpen: false,
                newName: ""
            };
        default:
            return state;
    }
}

export function getAllCategory() {
    return async dispatch => {
        let res = await getCategory();
        dispatch({
            type: 'GET_ALL_CATEGORY',
            payload: res
        })
    };
}

export function selectCategory(categoryId) {
    return async dispatch => {
        dispatch({
            type: 'SELECT_CATEGORY',
            payload: categoryId
        })
    };
}

export function openAddCategory() {
    return async dispatch => {
        dispatch({
            type: 'OPEN_ADD_CATEGORY'
        })
    };
}

export function closeAddCategory() {
    return async dispatch => {
        dispatch({
            type: 'CLOSE_ADD_CATEGORY'
        })
    };
}

export function setCategoryName(name) {
    return async dispatch => {
        dispatch({
            type: 'SET_CATE_NAME',
            payload: name
        })
    };
}

export function addCategory(category) {
    return async dispatch => {
        const body = {
            name: category
        }
        let res = await instance.post(ADDCATEGORY, body);
        dispatch({
            type: 'ADD_CATE',
            payload: res.data
        })
    }
}


