import { Component, forwardRef } from "react";
import { connect } from "react-redux";
import UploadImage from "../components/UploadImage";
import { addProduct } from "../redux/foodAddReducer";
import { getAllCategory } from "../redux/categoryReducer";
import { ADDPRODUCT } from "../api/url";
import axios from "axios";

class PopUpAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      name: "",
      price: "",
      quantity: "",
      category: "",
      image: "",
      active: true,
    };
  }

  componentDidMount() {
    this.props.getAllCategory();
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, price, quantity, category, active } = this.state;
    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("category", category);
    form.append("active", active.toString()); // Chuyển đổi boolean thành chuỗi

    if (this.img && typeof this.img.getFile() === "function") {
      form.append("image", this.img.getFile());
    }
    console.log(this.img.getFile());
    try {
      const response = await axios.post(ADDPRODUCT, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      this.props.addProduct(response.data);
      this.handleClose();
      this.setState({
        name: "",
        price: "",
        quantity: "",
        category: "",
        image: "",
        active: true,
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  render() {
    const { categories } = this.props;
    const { name, price, quantity, category, active } = this.state;
    return (
      <div>
        <button
          onClick={this.handleOpen}
          className="flex items-center justify-center border-2 border-green-400 text-green-900 bg-none hover:bg-green-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="button"
        >
          Add Dishes
        </button>
        {this.state.isOpen && (
          <div
            id="crud-modal"
            tabIndex={-1}
            aria-hidden="true"
            className="overflow-y-auto overflow-x-hidden flex justify-center items-center w-full md:inset-0 fixed inset-0 z-50"
          >
            <div className="absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-50"></div>
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Create New Product
                  </h3>
                  <button
                    type="button"
                    onClick={this.handleClose}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <form className="p-4 md:p-5" onSubmit={this.handleSubmit}>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="flex col-span-2 flex-col justify-center items-center">
                      <UploadImage ref={(e) => (this.img = e)} />
                    </div>

                    <div className="col-span-2">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Type product name"
                        value={name}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="price"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="$2999"
                        value={price}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="quantity"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Quantity
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="10"
                        value={quantity}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="category"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={category}
                        onChange={this.handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      >
                        <option value="">Select category</option>
                        {categories &&
                          categories.map((category) => (
                            <option key={category.id} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="active"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Status
                      </label>
                      <select
                        id="active"
                        name="active"
                        value={active}
                        onChange={this.handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      >
                        <option value="true">On Sale</option>
                        <option value="false">Out of Stock</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mr-2 text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add new product
                  </button>
                  <button
                    onClick={this.handleClose}
                    type="button"
                    className="text-white inline-flex items-center bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categoryReducer.categories,
});

const mapDispatchToProps = {
  addProduct,
  getAllCategory,
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(PopUpAdd);
