import { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { refreshToken as refreshAuthToken, setLocalAccessToken } from '../api/util';

class ProtectedRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: null,
        };
    }

    componentDidMount() {
        const { isLogin } = this.props;
        // Kiểm tra nếu người dùng đã đăng nhập
        if (isLogin) {
            this.setState({ isAuthenticated: true });
        } else {
            // Kiểm tra token trong localStorage
            const accessToken = window.localStorage.getItem('accessToken');
            if (!accessToken) {
                this.setState({ isAuthenticated: false });
            } else {
                if (!this.state.tokenRefreshed) {
                    try {
                        // await this.handleTokenRefresh();
                        this.setState({ isAuthenticated: true, tokenRefreshed: true });
                    } catch (error) {
                        console.error('Token refresh failed:', error);
                        window.localStorage.removeItem('accessToken');
                        window.localStorage.removeItem('refreshToken');
                        this.setState({ isAuthenticated: false });
                    }
                }
            }
        }
    }

    handleTokenRefresh = async () => {
        const refreshToken = window.localStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error('No refresh token found');
        }
        try {
            const newToken = await refreshAuthToken();
            setLocalAccessToken(newToken);
        } catch (error) {
            console.error('Token refresh failed:', error);
            throw error;
        }
    };

    render() {
        const { element } = this.props;
        const { isAuthenticated } = this.state;

        if (isAuthenticated === null) {
            return <div>Loading...</div>; // Or some loading indicator
        }

        return isAuthenticated ? element : <Navigate to="/" />;
    }
}

const mapStateToProps = (state) => ({
    isLogin: state.loginPageReducer.isLogin,
});

export default connect(mapStateToProps)(ProtectedRoute);
