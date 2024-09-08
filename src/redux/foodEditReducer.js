import { UPDATEFOOD } from "../api/url";
import instance from "../api/util";

// Define initial state
const initialState = {
  image: "",
  categoryID: "",
  name: "",
  quantity: "",
  price: "",
  active: "",
};

// Define reducer
export default function foodEditReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CATEGORY':
      return {
        ...state,
        categoryID: action.payload,
      };
    case 'SET_IMAGE':
      return {
        ...state,
        image: action.payload,
      };
    case 'SET_NAME':
      return {
        ...state,
        name: action.payload,
      };
    case 'SET_QUANTITY':
      return {
        ...state,
        quantity: action.payload,
      };
    case 'SET_PRICE':
      return {
        ...state,
        price: action.payload,
      };
    case 'SET_ACTIVE':
      return {
        ...state,
        active: action.payload,
      };
    case 'SET_INIT':
      return {
        image: "",
        categoryID: "",
        name: "",
        quantity: "",
        price: "",
        active: "",
      }
    default:
      return state;
  }
}

// Define action creator
export function editProduct(data) {
  return async dispatch => {
    const body = data;
    let res = await instance.put(UPDATEFOOD + data.foodId, body);
    console.log('resEdit', res);
    dispatch({
      type: 'SET_INIT',
    })
  }
}

export function setInit() {
  return async dispatch => {
    dispatch({
      type: 'SET_INIT',
    })
  }
}

export function setCategoryID(id) {
  return async dispatch => {
    dispatch({
      type: 'SET_CATEGORY',
      payload: id,
    })
  }
}

export function setEditImage(image) {
  return async dispatch => {
    dispatch({
      type: 'SET_IMAGE',
      payload: image,
    })
  }
}

export function setName(name) {
  return async dispatch => {
    dispatch({
      type: 'SET_NAME',
      payload: name,
    })
  }
}

export function setQuantity(quantity) {
  return async dispatch => {
    dispatch({
      type: 'SET_QUANTITY',
      payload: quantity,
    })
  }
}

export function setPrice(price) {
  return async dispatch => {
    dispatch({
      type: 'SET_PRICE',
      payload: price,
    })
  }
}

export function setActive(active) {
  return async dispatch => {
    dispatch({
      type: 'SET_ACTIVE',
      payload: active,
    })
  }
}

