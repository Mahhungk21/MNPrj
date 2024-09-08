import { Component } from "react";
import DropImageInput from "../components/UploadImage";
import { connect } from "react-redux";
import { setActive, setCategoryID, setEditImage, setInit, setName, setPrice, setQuantity } from "../redux/foodEditReducer";

export class PopUpEdit extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  componentDidMount() {
    // if (this.props.food) {
    //   this.props.updateProduct(this.props.food);
    // }
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
    this.props.setInit();
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Get form data here and call this.props.updateProduct
  };
  render() {
    let { item } = this.props;
    // this.props.setInitData(item);
    return (
      <div>
        <button
          onClick={this.handleOpen}
          className="mr-2 flex items-center justify-center border-2 border-blue-400 text-blue-600 bg-none hover:bg-blue-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
          Edit
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
                    Edit Product
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

                <form className="p-4 md:p-5">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="flex col-span-2 flex-col justify-center items-center ">
                      <DropImageInput img={item.imgURL} />
                    </div>

                    <div className="col-span-2">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        defaultValue={item.name}
                        required
                        onChange={(e) => e && e.preventDefault() || this.props.setName(e.target.value)}

                      />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="price"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        defaultValue={item.price}
                        required
                        onChange={(e) => e && e.preventDefault() || this.props.setPrice(e.target.value)}
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="remain"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Remain
                      </label>
                      <input
                        type="number"
                        name="remmain"
                        id="remain"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        defaultValue={item.quantity}
                        required
                        onChange={(e) => e && e.preventDefault() || this.props.setQuantity(e.target.value)}
                      />
                    </div>

                    <div className="col-span-2">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Time
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        defaultValue={item.createdTime}
                        required
                        disabled
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        onChange={(e) => e && e.preventDefault() || this.props.setCategoryID(e.target.value)}
                        value={item.categoryId}
                      >
                        {this.props.cate.categories.map((category) => (
                          <option
                            key={category.categoryId}
                            value={category.categoryId}
                          >
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="status"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Status
                      </label>
                      <select
                        id="status"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        onChange={(e) => e && e.preventDefault() || this.props.setActive(e.target.value)}
                        value={item.active}
                      >
                        <option value={true}>On Sale</option>
                        <option value={false}>Stop Selling</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-center w-full">
                    <button
                      type="submit"
                      className="mr-2 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      <svg
                        className="me-1 -ms-1 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          clipRule="evenodd"
                        />
                      </svg>
                      Edit Product
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
                  </div>
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
  cate: state.categoryReducer,
  edit: state.foodEditReducer,
});

const mapDispatchToProps = {
  setName, setQuantity, setCategoryID, setActive, setEditImage, setPrice, setInit
};

export default connect(mapStateToProps, mapDispatchToProps)(PopUpEdit);
