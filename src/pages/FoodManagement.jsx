import { Component } from "react";
import { connect } from "react-redux";
import Taskbar from "../layout/Taskbar";
import CategoryBar from "../layout/Category";
import "../styles/FoodManagement.css";
import Header from "../layout/Header";
import Pagination from "../components/Pagination";
import FoodItem from "../components/FoodList";
// import {foodItems} from '../json/food_item.json';
import PopUpAdd from "../components/PopUpAdd";
import { toggleSidebar } from "../redux/taskbarReducer";
import { getAllFood, getFoodByCategory } from "../redux/foodListReducer";

export class FoodManagement extends Component {
    componentDidMount() {
        this.props.getAllFood();
    }

    state = {
        currentPage: 1,
        itemsPerPage: 12,
        isDeletePopupOpen: false,
        isEditPopupOpen: false,
    };

    handleNextPage = () => {
        this.setState((prevState) => ({ currentPage: prevState.currentPage + 1 }));
    };

    handlePreviousPage = () => {
        this.setState((prevState) => ({ currentPage: prevState.currentPage - 1 }));
    };

    handleGoToPage = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    };

    render() {
        let foodItems = this.props.foodList.foodList;
        const { currentPage, itemsPerPage } = this.state;
        const offset = (currentPage - 1) * itemsPerPage;
        const totalItems = foodItems.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        const currentItems = foodItems?.slice(offset, offset + itemsPerPage);
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => this.setState({ currentPage: i })}
                    className={`text-lg ${currentPage === i ? "text-red-500" : ""}`}
                >
                    {i}
                </button>
            );
        }

        return (
            <div className="relative flex h-screen w-screen overflow-y-hidden">
                <div
                    className={`${this.props.taskbar.isOpen ? "w-1/5" : "w-[80px]"
                        } max-w-[300px] min-w-fit duration-300 h-full`}
                >
                    <Taskbar />
                </div>

                <div
                    className={`${this.props.taskbar.isOpen ? "w-full" : "w-full"
                        } duration-300 h-full rounded-lg`}
                >
                    <div>
                        <Header pageTitle="Product Management" />
                    </div>

                    <div className="flex height-frame">
                        <div className="w-[15%] min-w-40 h-full">
                            <CategoryBar />
                        </div>

                        <div className="w-full">
                            <div className="h-[10%] rounded-lg flex justify-between items-center">
                                <div className="text-2xl font-semibold m-4 my-auto">
                                    Manage Dishes
                                </div>
                                <div className="flex gap-4 m-4">
                                    <PopUpAdd />
                                </div>
                            </div>

                            <div className="h-[80%]">
                                <div className="h-full px-[2vw] overflow-y-auto">
                                    <div className="relative h-full rounded-lg grid grid-frame">
                                        {currentItems.length == 0 ? <div className="text-md">{this.props.foodList.noItems}</div> : <></>}
                                        {currentItems.map((foodItem) => (
                                            <div
                                                key={foodItem.foodId}
                                                className="flex flex-col w-full mx-auto py-auto"
                                            >
                                                <div className="block my-3 mx-auto border-2 rounded-lg shadow-sm shadow-indigo-100">
                                                    <FoodItem key={foodItem.name} foodItem={foodItem} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex h-[10%] justify-center items-center">
                                <div className="w-fit">
                                    <Pagination
                                        currentPage={this.state.currentPage}
                                        totalPages={totalPages}
                                        handleNextPage={this.handleNextPage}
                                        handlePreviousPage={this.handlePreviousPage}
                                        handleGoToPage={this.handleGoToPage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    taskbar: state.taskbarReducer,
    foodList: state.foodListReducer,
});

const mapDispatchToProps = { toggleSidebar, getAllFood, getFoodByCategory };

export default connect(mapStateToProps, mapDispatchToProps)(FoodManagement);
