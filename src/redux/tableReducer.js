import { ALLORDER } from '../api/url';
import { toast } from "react-toastify";
import instance from '../api/util';
const initialState = {
    column: [
        {
            name: 'TableId',
            key: 'tabledID'
        },
        {
            name: 'Order Time',
            key: 'order_Time'
        },
        {
            name: 'Order Day',
            key: 'orderDate'
        },
        {
            name: 'Total',
            key: 'sum'
        },
        {
            name: 'Status',
            key: 'statusCode'
        }
    ],
    isShow: false,
    table: [],
    statusCode: 0,
    currentPage: '',
    totalPage: '',
    totalItem: '',
    obj: {},
    isLoading: false
}

const getDataOrder = async (statusCode, page = 1) => {
    try {
        if (statusCode === 0 || statusCode === 1 || statusCode === 2 || statusCode === -1) {
            const response = await instance.get(`${ALLORDER}?statusCode=${statusCode}&page=${page}`);
            if (response.request.status === 200) {
                return response.data;
            }
        }
    }
    catch (error) {
        toast.error('Get Items Fail', { autoClose: 2000 });
        return { error };
    }
}

export const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CHANGE_STATUS':
            return {
                ...state,
                table: action.payload.table,
                statusCode: action.payload.statusCode,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages,
                totalItems: action.payload.totalItems
            }
        case 'START_LOADING':
            return {
                ...state,
                isLoading: true,
            }
        case 'STOP_LOADING':
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state;
    }
}

export function getChangeStatus(statusCode, page = 1) {
    return async dispatch => {
        dispatch({ type: 'START_LOADING' });
        let res = await getDataOrder(statusCode, page);
        if (res.error) {
            // toast loi
            toast.error('Failed to call data', { autoClose: 1000 });
        } else {
            dispatch({
                type: 'GET_CHANGE_STATUS',
                payload: {
                    statusCode: statusCode,
                    table: res.orderList,
                    currentPage: res.currentPage,
                    totalPages: res.totalPages,
                    totalItems: res.totalItems
                }
            })
        }
        dispatch({ type: 'STOP_LOADING' });
    };
}

