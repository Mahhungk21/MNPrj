import { Component } from "react";
import Header from "../layout/Header";
import Taskbar from "../layout/Taskbar";
import { createPortal } from "react-dom";
import HeaderTable from "../components/HeaderTable";
import BodyTable from "../components/BodyTable";
import Pagination from "../components/Pagination";
import OrderDetail from "../components/OrderDetail";
import instance from "../api/util";
import pathlogin from '../api/enpoint'
import { connect } from 'react-redux';
import { toggleSidebar } from '../redux/taskbarReducer';
import { getChangeStatus } from "../redux/tableReducer";
import Loading from "../components/Loading";

export class ViewOrders extends Component {
    state = {
        isShow: false,
        isLoading: false
    };

    async componentDidMount() {
        await instance.post(pathlogin.USER.LOGIN, { userName: "admin", pwd: "admin" });
        this.props.getChangeStatus(-1, 1);
    }
    Column = [
        {
            name: "TableId",
            key: "tableid",
        },
        {
            name: "Order Time",
            key: "order_Time",
        },
        {
            name: "Order Day",
            key: "orderDate",
        },
        {
            name: "Total",
            key: "sum",
        },
        // {
        //     name: 'Status',
        //     key: 'statusCode'
        // }
    ]
    ChangeState = async (status) => {
        this.setState({ isLoading: true }); // Set loading state to true
        this.props.getChangeStatus(Number(status))
        this.setState({ isLoading: false }); // Set loading state to true

    }

    render() {
        return (
            <div className="relative flex w-screen h-screen overflow-hidden">
                {/* h-[calc(100vh-80px)] */}
                <div
                    className={`${this.props.taskbar.isOpen ? "w-1/5" : "w-fit"
                        } duration-300 h-full rounded-lg  min-h-screen`}
                >
                    <Taskbar />
                </div>

                <div
                    className={`${this.props.taskbar.isOpen ? "w-full" : "w-full"
                        } duration-300 h-full rounded-lg`}
                >
                    <Header pageTitle="Order Management" />
                    <div className="flex-1 mt-2 mx-7 overflow-x-auto h-[580px]">
                        <form className="w-48 mr-0 mb-2 flex mx-auto">
                            <select onChange={async (e) => this.ChangeState(e.target.value)}
                                id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-25 p-2.5 ml-2">
                                <option selected value="3">Choose a status</option>
                                <option value="-1">All</option>
                                <option value="0">Confirmed</option>
                                <option value="1">Finished</option>
                                <option value="2">Delivered</option>
                            </select>
                        </form>

                        <div className="h-[700px] w-full">
                            {this.state.isLoading ? ( // Display loading component if isLoading is true
                                <div className="absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-50 z-50"><Loading /></div>
                            ) : (
                                <table className="h-[700px] w-full divide-gray-200">
                                    <HeaderTable headerTable={this.Column} />
                                    <BodyTable
                                        initStatusCode={this.props.dataPagination.statusCode}
                                        getChangeStatus={this.props.getChangeStatus}
                                        headerTable={this.Column}
                                        onClick={() => this.setState({ isShow: true })}
                                    />
                                </table>
                            )}
                        </div>
                    </div>
                    <Pagination statusCode={this.props.dataPagination.statusCode} />
                    {this.state.isShow &&
                        createPortal(
                            <OrderDetail hidden={this.hiddenData} />,
                            document.body
                        )}
                </div>
            </div>
        );

    }
}
const mapStateToProps = (state) => ({ taskbar: state.taskbarReducer, dataLogin: state.loginPageReducer, dataPagination: state.tableReducer })
const mapDispatchToProps = { getChangeStatus, toggleSidebar }
// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, mapDispatchToProps)(ViewOrders);
