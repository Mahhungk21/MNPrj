import { Component } from "react";
import "../styles/Header.css"
import Logo from "../../public/logomini.svg"
import { connect } from "react-redux";
import { setHeaderTitle, setSearch, setUserInfo } from "../redux/headerReducer";
import { getFoodBySearch } from "../redux/foodListReducer";
// import { setHeaderTitle, setUserInfo } from "../redux/headerReducer";
import { logout } from "../redux/loginPageReducer";
export class Header extends Component {

    componentDidMount() {
        this.props.setHeaderTitle(this.props.pageTitle);
        this.props.setUserInfo(this.props.dataLogin.username, "Admin");
    }
    handleLogout = () => {
        this.props.logout();
        window.location.href = '/'
    }
    render() {
        return (
            <div className="duration-300 relative header grid grid-cols-10 w-full h-fit shadow-sm align-middle p-2">
                <div className="flex items-center col-span-4">
                    <img src={Logo} alt="logo" className="h-10 w-10 m-2 ms-5" />
                    <span className="text-2xl font-bold m-2 my-auto">{this.props.header.title}</span>
                </div>
                <div className="relative flex col-span-3 items-center justify-center">
                    <div className="relative flex w-full h-10">
                        <i className="fa fa-search absolute inset-y-0 start-0 place-content-center px-4" aria-hidden="true"></i>
                        <input
                            className="h-full w-full pl-10 pr-4 rounded-md form-input focus:border-orange-500 shadow-sm"
                            type="text"
                            placeholder={`Search any ${this.props.pageTitle == "Product Management" ? "item here" : "order here"} ...`}
                            onChange={(e) => this.props.setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    console.log('Enter key pressed');
                                    this.props.getFoodBySearch(this.props.header.search);
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="flex items-center col-span-3 justify-end">
                    <i className="fa fa-bell fa-1x pl-2" aria-hidden="true"></i>
                    <div className="relative flex w-fit min-w-16 h-14 items-center mx-5 rounded-md shadow-sm py-2 px-5 bg-blue-300 overflow-hidden">
                        <i className="fa fa-user-circle fa-2x absolute inset-y-0 start-0 place-content-center px-4" aria-hidden="true"></i>
                        <div className="pl-10 hidden lg:block">
                            <div id="user-role" className="text-md font-semibold">
                                {this.props.header.username}
                            </div>
                            <div id="user-name" className="text-sm">
                                {this.props.header.role}
                            </div>
                        </div>
                    </div>
                    <button onClick={() => {this.handleLogout() }}>
                        <i className="fa fa-sign-out fa-2x pr-2" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ header: state.headerReducer, dataLogin: state.loginPageReducer })

const mapDispatchToProps = { setHeaderTitle, setUserInfo, setSearch, getFoodBySearch, logout }

export default connect(mapStateToProps, mapDispatchToProps)(Header);
