import React from 'react';
import AddOrderComponent from './AddOrderComponent';
import { connect } from 'react-redux';
import { addOrder } from '../actions/actions';

const AddOrder = (props) => (
    <div >
        <h3>Set Order information:</h3>
        <AddOrderComponent order={props.order}
            handleCancel={()=>{props.history.push('/');}}
            onSubmitOrder={(order) => {
                console.log("hi "+order.orderId+order.amount+order.billingDate)
                props.dispatch(addOrder(order));
                props.history.push('/');
            }}
        />
    </div>
);
//export default connect()(AddOrder);

const mapStateToProps = (state,props) => {
    return {
                    order:state
    };
};

export default connect(mapStateToProps)(AddOrder);

