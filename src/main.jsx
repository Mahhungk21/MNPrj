// import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import * as ReactDOM from "react-dom/client";

import App from './App.jsx'
import "./index.css";
import "./assets/font/font-awesome-4.7.0/css/font-awesome.min.css";


ReactDOM.createRoot(document.getElementById("root")).render(
        <Provider store={store}>
                <App />
        </Provider>
);