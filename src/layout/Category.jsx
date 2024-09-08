import { Component } from 'react';
import { connect } from 'react-redux';
import { addCategory, closeAddCategory, getAllCategory, openAddCategory, selectCategory, setCategoryName } from '../redux/categoryReducer';
import { getFoodByCategory } from '../redux/foodListReducer'
// import { AddCategory } from '../components/AddCategory';
export class CategoryBar extends Component {
  componentDidMount() {
    this.props.getAllCategory();
  }

  render() {
    // console.log('getbycate', this.props.getFoodByCategory());
    return (
      <div className="h-full w-full justify-start shadow-md rounded-lg border-gray-200 bg-white">
        <div className="flex h-[10%] w-full justify-between">
          <p className="ml-4 my-auto text-2xl font-semibold">Category</p>
          <i
            className="fa fa-plus my-auto rounded bg-orange-300 hover:bg-orange-100 p-2 mx-3"
            aria-hidden="true"
            onClick={(e) => e && e.preventDefault() || this.props.openAddCategory()}
          ></i>
          {this.props.cate.isOpen && (
            <div
              id="popup-modal"
              className="fixed inset-0 z-50 flex items-center justify-center"
            >
              <div className="absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-50"></div>
              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                  <button
                    type="button"
                    className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    data-modal-hide="popup-modal"
                    onClick={(e) => e && e.preventDefault() || this.props.closeAddCategory()}
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
                  </button>

                  <div className="p-4 md:p-5 text-center">

                    <input
                      className='w-4/5 p-2 m-8 rounded border border-gray-500'
                      placeholder='Name your new category here'
                      onChange={(e) => this.props.setCategoryName(e.target.value)}
                      required
                    />
                    <div className='flex justify-center'>
                      <button
                        onClick={() => this.props.addCategory(this.props.cate.newName)}
                        type="submit"
                        className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                      >
                        Add new
                      </button>
                      <button
                        onClick={(e) => e && e.preventDefault() || this.props.closeAddCategory()}
                        type="button"
                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-500 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                      >
                        No, cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Nếu nhiều category thì có thanh cuộn nội bộ nè */}
        <div className="h-[90%] w-full overflow-y-auto">
          <ul>
            {this.props.cate?.categories?.map((category) => (
              <li key={category.categoryId}>
                <button
                  onClick={(e) => e && e.preventDefault() || this.props.selectCategory(category.categoryId) && this.props.getFoodByCategory(category.categoryId)}
                  className={`group ${this.props.cate.selected == category.categoryId ? "bg-gray-100 text-gray-700" : "bg-none text-gray-500"} w-full flex items-center justify-between rounded-lg px-4 py-4 text-gray-500 hover:bg-gray-100 hover:text-gray-700`}>
                  <div className="div flex gap-2">
                    <i className="fa fa-square" aria-hidden="true"></i>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                  </div>
                  {this.props.cate.selected == category.categoryId ? <div className="count">{this.props.foodList.quantityByCategory}</div> : <></>}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cate: state.categoryReducer,
  foodList: state.foodListReducer
});

const mapDispatchToProps = { getAllCategory, getFoodByCategory, selectCategory, openAddCategory, setCategoryName, closeAddCategory, addCategory }

export default connect(mapStateToProps, mapDispatchToProps)(CategoryBar);
