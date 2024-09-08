import { toast } from "react-toastify";
import { ALLFOOD, FOODBYCATEGORY, FOODBYSEARCH } from "../api/url";
import instance from "../api/util";

const initialState = {
    foodList: [],
    quantityByCategory: 0,
    noItems: "",
};

export const getFoodList = async () => {
    try {
        const response = await instance.get(ALLFOOD);
        if (response.request.status === 200) {
            return response.data;
        }
    }
    catch (error) {
        toast.error('Get Items Fail', { autoClose: 2000 });
        return { error };
    }
}

const getFoodListByCategory = async (cate) => {
    try {
        const params = {
            "categoryID": cate,
        }
        const url = FOODBYCATEGORY + cate;
        const response = await instance.get(url, params);
        if (response.request.status === 200) {
            return response.data;
        }
    }
    catch (error) {
        toast.error('Get Items Fail', { autoClose: 2000 });
        return { error };
    }
}

const getFoodListBySearch = async (search) => {
    try {
        // Xử lý chuỗi search trước khi gửi lên BE


        const url = FOODBYSEARCH + search;
        const response = await instance.get(url);
        if (response.data === null) {
            return null;
        }
        if (response.request.status === 200) {
            return response.data;
        }
    }
    catch (error) {
        toast.error('Get Items Fail', { autoClose: 2000 });
        return { error };
    }

}

export default function foodListReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_FOOD':
            return {
                ...state,
                foodList: action.payload
            };
        case 'GET_FOOD_BY_CATEGORY':
            return {
                ...state,
                foodList: action.payload.foods,
                quantityByCategory: action.payload.totalItems,
                noItems: action.notFound
            };
        // Chỉ search được 1 sản phẩm 1 lần thôi í, vì BE chỉ trả về 1 object
        case 'GET_FOOD_BY_SEARCH':
            return {
                ...state,
                foodList: action.payload,
                noItems: action.notFound
            };
        default:
            return state;
    }
}

export function getAllFood() {
    return async dispatch => {
        let res = await getFoodList();
        dispatch({
            type: 'GET_ALL_FOOD',
            payload: res
        })
    };
}

export function getFoodByCategory(category) {
    return async dispatch => {
        let res2 = await getFoodListByCategory(category);
        let message = '';
        if (res2.totalItems === 0) { message = 'No items in this category!' }
        dispatch({
            type: 'GET_FOOD_BY_CATEGORY',
            payload: res2,
            notFound: message,
        })
    };
}

export function getFoodBySearch(search) {
    return async dispatch => {
        // Search id sản phẩm
        if (search[0] === '3') {
            let res3 = await getFoodListBySearch(search);
            if (res3 === null) {
                dispatch({
                    type: 'GET_FOOD_BY_SEARCH',
                    payload: [],
                    notFound: 'No items match your search!'
                });
            }
            else {
                dispatch({
                    type: 'GET_FOOD_BY_SEARCH',
                    payload: [res3],
                    notFound: ''
                })
            }
        }

        // Search id category
        if (search[0] === '2') {
            let res2 = await getFoodListByCategory(search);
            let message = '';
            if (res2.totalItems === 0) { message = 'No items match categoryID you searched!' }
            dispatch({
                type: 'GET_FOOD_BY_CATEGORY',
                payload: res2,
                notFound: message,
            })
        }
    }


    // let res3 = await getFoodListBySearch(search);
    // if (res3 === null) {
    //     dispatch({
    //         type: 'GET_FOOD_BY_SEARCH',
    //         payload: [],
    //         notFound: 'No items match your search!'
    //     });
    // }
    // else {
    //     dispatch({
    //         type: 'GET_FOOD_BY_SEARCH',
    //         payload: [res3],
    //         notFound: ''
    //     })
    // }
}
