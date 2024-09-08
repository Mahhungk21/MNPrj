import { toast } from "react-toastify";
import { FOOD, LOGIN } from "../api/url";
import { setLocalAccessToken } from "../api/util";
import instance from "../api/util";
// import { setUserInfo } from "./headerReducer";

const initialState = {
    isLogin: false,// Init State 
    username: '',
    password: '',
    validationMsg: {},
    isLoading: false,
    isLoadingIcon: false,
}
const getData = async (username, password) => {
    try {
        const params = {
            "userName": username,
            "pwd": password
        }
        const response = await instance.post(LOGIN, params);
        const { accessToken, refreshToken } = response.data;
        if (response.request.status === 200) {
            setLocalAccessToken(accessToken);
            window.localStorage.setItem('refreshToken', refreshToken);
            toast.success('Login Success', { autoClose: 2000 });
            return { username, password };
        }
    } catch (error) {
        toast.error('Login Fail', { autoClose: 2000 });
        return { error };
    }
}

export const loginPageReducer = (state = initialState, action) => {
    switch (action.type) {      
        case 'LOGIN':
            return {
                ...state,
                isLogin: true,
                username: action.payload.username,
            }
        case 'LOGOUT':
            return {
                ...state,
                isLogin: false,
                username: '',
            }
        case 'SET_LOGIN':
            return {
                ...state,
                isLogin: true
            }
        case 'START_LOADING':
            return {
                ...state,
                isLoading: true,
                isLoadingIcon: true
            }
        case 'STOP_LOADING':
            return {
                ...state,
                isLoading: false,
                isLoadingIcon: false
            }
        default:
            return state;
    }
}
export function loginStatus() {
    return dispatch => {
        dispatch({ type: 'SET_LOGIN' });
    };
}
export function login(username, password, done) {
    return async dispatch => {
        dispatch({ type: 'START_LOADING' });
        let res = await getData(username, password);
        if (!res.error) {
            dispatch({
                type: 'LOGIN',
                payload: { username: res.username, password: res.password }
            });
            done && done();
        }
        dispatch({ type: 'STOP_LOADING' });
    };
}
export function logout() {
    return dispatch => {
        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('refreshToken');
        dispatch({ type: 'LOGOUT' });
    };
}