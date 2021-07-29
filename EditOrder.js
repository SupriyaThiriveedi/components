import React from 'react';
//import BookForm from './BookForm';
import OrderForm from './OrderForm';
import { connect } from 'react-redux';
//import { editBook } from '../actions/books';
import { editOrder } from '../actions/actions';

const EditOrder = (props) =>{ 
    if(props.flag) return(
    <div className='container__box'>
        <OrderForm 
            order={props.order}
            onSubmitOrder={(order) => {
                props.dispatch(editOrder(props.order.id, order));
                props.history.push('/');
            }}
        />
    </div>
);else return<div>Order Details</div> }; 

const mapStateToProps = (state, props) => {
    if(props.flag)
    return {
        order: state.find((order) =>
            order.id === props.match.params.id)
    };
    else return;
};

export default connect(mapStateToProps)(EditOrder);