import React from "react";
import PopUpDelete from "./PopUpDelete";
import PopUpEdit from "./PopUpEdit";
import { API_BASE_URL } from "../api/url";

class FoodItem extends React.Component {
  state = {
    isDeletePopupOpen: false,
    isEditPopupOpen: false,
  };
  handleOpenDeletePopup = () => {
    this.setState({ isDeletePopupOpen: true });
  };

  handleCloseDeletePopup = () => {
    this.setState({ isDeletePopupOpen: false });
  };

  handleOpenEditPopup = () => {
    this.setState({ isEditPopupOpen: true });
  };

  handleCloseEditPopup = () => {
    this.setState({ isEditPopupOpen: false });
  };
  render() {
    const { foodItem } = this.props;
    return (
      <div className="group flex flex-col items-center justify-center">
        <img
          alt={foodItem.name}
          src={API_BASE_URL + foodItem.imgURL}
          className="aspect-square w-28 h-28 m-2 rounded-md object-cover"
        />

        <div className="mt-3 text-center">
          <h3 className="text-lg text-gray-900 group-hover:underline group-hover:underline-offset-4">
            {foodItem.name}
          </h3>

          <div className="mt-6 flex items-center gap-8 text-xs">
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500 text-lg">Price</p>
                <p className="font-medium text-lg">{foodItem.price}</p>
              </div>
            </div>

            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500 text-lg">Remain</p>
                <p className="font-medium text-lg">{foodItem.quantity}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="inline-flex rounded-lg border border-gray-100 bg-white-100 p-auto m-4">
          <PopUpEdit item={foodItem} />
          <PopUpDelete />
        </div>
      </div>
    );
  }
}

export default FoodItem;
