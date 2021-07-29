import React from 'react';
import {getOrders} from '../actions/actions';
import ListOrderComponent from './ListOrderComponent';
import {connect} from 'react-redux';

const DashBoard = (props) =>{
    props.fetchOrders();
    return(
    <div className='container__list'>
        
        <ListOrderComponent />
    </div>
);}

const mapDispatchToStore = (dispatch) => {
    return {
        fetchOrders: () => dispatch(getOrders())
    }
}

export default connect(null,mapDispatchToStore)(DashBoard);
