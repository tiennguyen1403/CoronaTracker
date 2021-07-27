import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from "react-redux";
import store from "./redux/store";
import "./i18n";

ReactDOM.render(
    <Provider store={store}>
        <Suspense fallback={<span>Loading...</span>}>
            <App />
        </Suspense>
    </Provider>,
document.getElementById('root'));

reportWebVitals();
