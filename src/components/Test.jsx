import { Component } from 'react';
import PopUpAccept from './AcceptOrder';
import OrderDetail from './OrderDetail';

export default class Test extends Component {
    render() {
        return (
            <div className="flex items-center justify-center absolute inset-0 z-50">
                <PopUpAccept />
                <OrderDetail />
            </div>
        );
    }
}