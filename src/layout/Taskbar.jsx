import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { selectPage, toggleSidebar } from "../redux/taskbarReducer";
import "../styles/Taskbar.css";

export class Taskbar extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         open: true,
    //     };
    // }
    // toggleSidebar = () => {
    //     this.setState((prevState) => ({
    //         open: !prevState.open,
    //     }));
    // }
    render() {
        // const { open } = this.state;
        return (
            <>
                <div className="flex h-full">
                    <div className={`bg-blue-300 h-full ${this.props.taskbar.isOpen ? "w-full md:w-64" : "w-20"} duration-300 shadow-lg relative`}>
                        {/* Nút thu/mở taskbar */}
                        <div className="flex h-[72px] w-full">
                            <i className={"mx-auto my-auto p-2 fa fa-bars fa-2x cursor-pointer"
                            } aria-hidden="true"
                                onClick={() => this.props.toggleSidebar()}></i>
                        </div>

                        <div className="h-[calc(100% - 72px)] w-full px-2  flex flex-col">
                            {/* to PM page */}
                            <button className={`inline-flex length-fit p-2 mt-8 rounded hover:bg-orange-100 justify-center 
                            ${this.props.taskbar.isOpen && "justify-between"}
                            ${this.props.taskbar.selected == "PM" ? "bg-orange-100" : "bg-none"}
                            `}
                                onClick={() => this.props.selectPage("PM")}
                            >
                                <Link to="/category" className="flex h-full ">
                                    <i className={`${this.props.taskbar.selected == "PM" ? "bg-orange-300" : "bg-none"} text-2xl p-2 rounded cursor-pointer block float-left fa fa-shopping-cart duration-500`} aria-hidden="true"></i>
                                    <div className={`page-title my-auto ml-2 flex items-center origin-left font-semibold duration-500 text-md cursor-pointer ${!this.props.taskbar.isOpen && "hidden"}`}>
                                        Product Management
                                    </div>
                                </Link>
                            </button>

                            {/* To OM page */}
                            <button className={`inline-flex length-fit p-2 mt-5 rounded hover:bg-orange-100 justify-center
                            ${this.props.taskbar.isOpen && "justify-between"}                            
                            ${this.props.taskbar.selected == "OM" ? "bg-orange-100" : "bg-none"}
                            `}
                                onClick={() => this.props.selectPage("OM")}
                            >
                                <Link to="/view" className="flex h-full ">
                                    <i className={`${this.props.taskbar.selected == "OM" ? "bg-orange-300" : "bg-none"} text-2xl p-2 rounded cursor-pointer block float-left fa fa-shopping-cart duration-500`} aria-hidden="true"></i>
                                    <div className={`page-title my-auto ml-2 flex items-center origin-left font-semibold duration-500 text-md cursor-pointer ${!this.props.taskbar.isOpen && "hidden"}`}>
                                        Order Management
                                    </div>
                                </Link>
                            </button>
                            {/* <button className={`inline-flex p-2 mt-8 rounded hover:bg-orange-100
                                ${this.props.taskbar.selected == "OM" ? "bg-orange-100" : "bg-none"}
                                `}
                                onClick={() => this.props.selectPage("OM")}
                            >
                                <Link to="/view" className="flex h-full">
                                    <i className={`${this.props.taskbar.selected == "OM" ? "bg-orange-300" : "bg-none"} text-2xl p-2 rounded cursor-pointer block float-left fa fa-shopping-cart duration-500`} aria-hidden="true"></i>
                                    <div className={`page-title my-auto ml-2 flex items-center origin-left font-semibold duration-500 text-md cursor-pointer ${!this.props.taskbar.isOpen && "hidden"}`}>
                                        Orders Management
                                    </div>
                                </Link>
                            </button> */}
                        </div>
                    </div >
                </div >
            </>
        );
    }
}

const mapStateToProps = (state) => ({ taskbar: state.taskbarReducer })

const mapDispatchToProps = { toggleSidebar, selectPage }

export default connect(mapStateToProps, mapDispatchToProps)(Taskbar);