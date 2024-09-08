import "../styles/Login.css";
import { Component } from 'react';
import { Navigate } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../redux/loginPageReducer'
import { connect } from 'react-redux';
import Loading from "../components/Loading";
class LoginPage extends Component {
    state = {
        username: '',
        password: '',
        error:[],
    }

    validate = () =>{
        const error = [];
        if(isEmpty(this.state.username)){
            error.push('Username is required')
        }
        if(isEmpty(this.state.password)){
            error.push('Password is required')
        }
        this.setState({error: error});
        return error;
    }
    
    handleLogin = async () => {
        const errors = this.validate();
        if (errors.length > 0){
            if(errors.includes('Username is required')&& errors.includes('Password is required') ){
                toast.error(('Username and Password are required'), { autoClose: 1000 });
                return;
            }
            if(errors.includes('Username is required')){
                toast.error(('Username is required'), { autoClose: 1000 });
            }
            if (errors.includes('Password is required')) {
                toast.error(('Password is required'), { autoClose: 1000 });
            }
            return;
        }
        this.props.login(this.state.username, this.state.password, () => {
            this.setState({ isLogin: true })
        });
    };

    render() {
        const { isLoading } = this.props;
        return (
            <>
                {isLoading &&
                    <div className="absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-50 z-50"><Loading /></div>}
                {this.state.isLogin && <Navigate to="/category" />} 
                <section className="relative flex flex-wrap m-[5vh] h-[90vh] card-wrap">
                    <div className="relative w-full h-0 sm:h-1/5 lg:h-full lg:w-1/2">
                        <div className="relative h-full w-full login-img radius-side"></div>
                    </div>

                    <div className="w-full h-full lg:h-full sm:h-4/5 px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-20 flex flex-col justify-center items-center">
                        <div className="mx-auto max-w-lg text-center">
                            <h1 className="text-2xl font-bold sm:text-3xl">
                                Login
                            </h1>
                            <p className="mt-4 text-gray-500">
                                Welcome back! Please login to your account.
                            </p>
                        </div>
                        <form action="#"
                            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
                        >
                            <div>
                                <label htmlFor="username" className="sr-only">
                                    Username
                                </label>
                                <div className="relative">
                                    <input
                                        onChange={e => this.setState({ username: e.target.value })}
                                        id="username"
                                        type="text"
                                        className="w-full rounded-lg border-2 border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        placeholder="Enter username"

                                    />
                                </div>
                            </div>
                            <div className="text-red-500 text-sm">{
                                this.state.error.includes('Username is required') ? 'Username is required' : ''
                            }</div>
                            
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        onChange={e => this.setState({ password: e.target.value })}
                                        id="password"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        className="w-full rounded-lg border-2 border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        placeholder="Enter password"

                                    />
                                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                        <i className={`fa ${this.state.showPassword ? 'fa-eye' : 'fa-eye-slash'} text-gray-500`} onClick={() => this.setState({ showPassword: !this.state.showPassword })}></i>
                                    </span>
                                    <div className="text-red-500 text-sm mt-2">{
                                        this.state.error.includes('Password is required') ? 'Password is required' : ''}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center align-middle items-center py-3">
                                <p className="text-sm text-gray-500">
                                    <a className="underline" href="#">
                                        Don&apos;t have an account yet?
                                    </a>
                                    <span className="px-3">or</span>
                                    <a className="underline" href="#">
                                        Forgot your password?
                                    </a>
                                </p>
                            </div>
                            <div className="flex justify-center align-middle items-center">
                                
                                <button
                                    onClick={(e) => e.preventDefault() || this.handleLogin(e)}
                                    id="submit"
                                    type="submit"
                                    className="mx-auto items-center inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                                >
                                    {(this.props.isLoadingIcon) && <i className="fa fa-spinner mr-1 animate-spin" aria-hidden="true" />}
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>

                </section>
            </>
        );
    }

}
const mapStateToProps = (state) => ({
    dataLogin: state.loginPageReducer,
    isLoading: state.loginPageReducer.isLoading,
    isLoadingIcon: state.loginPageReducer.isLoadingIcon
})
const mapDispatchToProps = { login }

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

// export default LoginPage;


// testFunctionLogin(this.props.dataLogin.username, this.props.dataLogin.username)(dispatch);
// const isValid = validateAll()
// if (!isValid) {
//     return;
// }
// e.preventDefault();
// navigate('/loading');
// try {
//     const params = {
//         "userName": username,
//         "pwd": password
//     }
//     const userData = await instance.post(LOGIN, params);
//     if (userData.request.status === 200) {
//         setMessage('');
//         return navigate('/category');
//     }
//     else {
//         setMessage('Username or Password is incorrect');
//     }
// } catch (error) {
//     toast.error('Login failed. Please try again.');
// }
// let button = form.submit.addEventListener('click', (e) => {