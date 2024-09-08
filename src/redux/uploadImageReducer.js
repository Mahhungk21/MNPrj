import { UPLOAD_IMAGE } from "../actions/actionTypes";

const initialState = {
  imageUrl: "", // Khởi tạo trạng thái ban đầu của ảnh là rỗng
  isEdit: false, //false ->add, true->edit
};

export default function uploadImageReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_IMAGE:
      return {
        ...state,
        imageUrl: action.payload,
      };
    case "UPLOAD_FOR":
      return {
        ...state,
        isEdit: action.payload,
      };
    default:
      return state;
  }
}
export const setUploadForEdit = () => {
  return async dispatch => {
    dispatch({
      type: "UPLOAD_FOR",
      payload: true,
    })
  }
}

export const setUploadForAdd = () => {
  return async dispatch => {
    dispatch({
      type: "UPLOAD_FOR",
      payload: false,
    })
  }
}

export const setImageUrl = (imageUrl) => ({
  type: "UPLOAD_IMAGE",
  payload: imageUrl,
});
