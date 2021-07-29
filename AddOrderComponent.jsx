import React, { Component } from 'react'
import OrderService from '../services/OrderService';

class AddOrderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
            orderId: '',
            amount: '',
           billingDate: ''
        }
        this.onSubmit=this.onSubmit.bind(this);
        this.changeOrderIdHandler = this.changeOrderIdHandler.bind(this);
        this.changeAmountHandler = this.changeAmountHandler.bind(this);
        this.changebillingDateHandler = this.changebillingDateHandler.bind(this);
      //  this.saveOrUpdateOrder = this.saveOrUpdateOrder.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
           return
        }else{
            OrderService.getOrderById(this.state.id).then( (res) =>{
                let order = res.data;
                this.setState({
                    orderId: order.orderId,
                    amount: order.amount,
                    billingDate : order.billingDate
                });
            });
        }        
    }
    
    
    
    changeOrderIdHandler= (event) => {
       // alert("fName"+event.target.value)
        this.setState({orderId: event.target.value});
    }

    changeAmountHandler= (event) => {
      //  alert("lName"+event.target.value)
        this.setState({amount: event.target.value});
    }

    changebillingDateHandler= (event) => {
      //  alert("email"+event.target.value)
        this.setState({billingDate: event.target.value});
    }

    cancel(){
        this.props.handleCancel();
       // this.props.history.push('/orders');
    }
    onSubmit(e) {
        e.preventDefault();
        let order = {orderId: this.state.orderId, amount: this.state.amount, billingDate: this.state.billingDate};
        console.log('order => ' + JSON.stringify(order));

        if (!this.state.orderId || !this.state.amount ) {
            this.setState((state) => ({ ...state, error: 'Please set orderId & amount!' }));
        } else {
            this.setState((state) => ({  ...state,error: '' }));
            this.props.onSubmitOrder(
                
                {
                    orderId: this.state.orderId,
                    amount: this.state.amount,
                   billingDate : this.state.billingDate
                    
                },
                
            );
           // 
        }
        
    }

    getTitle(){
        
            return <h3 className="text-center">Add Order</h3>
        
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container" >
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form onSubmit={this.onSubmit} className='add-order-form' >
                                        <div className = "form-group">
                                            <label> OrderId: </label>
                                            <input placeholder="OrderId" required className="form-control" 
                                                value={this.state.orderId} onChange={this.changeOrderIdHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Amount: </label>
                                            <input placeholder="Amount" required className="form-control" 
                                                value={this.state.amount} onChange={this.changeAmountHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> BillingDate: </label>
                                            <input placeholder="BillingDate" required className="form-control" 
                                                value={this.state.billingDate} onChange={this.changebillingDateHandler}/>
                                        </div>
                                        {this.state.error && <b className="m-1 text-danger">{this.state.error}</b>}
                                        <button className="btn btn-success" onClick={this.onSubmit} style={{marginLeft: "10px"}}>Add</button>
                                      {/**  <button className="btn btn-success" onClick={this.saveOrUpdateOrder}>UpdateNSave</button> */}
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                        
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default AddOrderComponent

