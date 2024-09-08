import axios from "axios";
import { ADDPRODUCT } from "../api/url";

// Initial state for the reducer
const initialState = {
  products: [],
  loading: false,
  error: null,
  success: false,
};

// Action types
const ADD_PRODUCT_REQUEST = "ADD_PRODUCT_REQUEST";
const ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS";
const ADD_PRODUCT_FAILURE = "ADD_PRODUCT_FAILURE";

// Action creator to add a new product
export const addProduct = (product) => async (dispatch) => {
  dispatch({ type: ADD_PRODUCT_REQUEST });
  try {
    const response = await axios.post(ADDPRODUCT, product, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch({
      type: ADD_PRODUCT_SUCCESS,
      payload: { product: response.data },
    });
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_FAILURE,
      payload: { error: error.message },
    });
  }
};

// Reducer function to handle state updates based on actions
const foodAddReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [...state.products, action.payload.product],
        loading: false,
        success: true,
        error: null,
      };
    case ADD_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default foodAddReducer;
