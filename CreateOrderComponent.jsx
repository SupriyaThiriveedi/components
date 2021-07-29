import React, { Component } from 'react'
import OrderService from '../services/OrderService';

class CreateOrderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        }
        this.onSubmit=this.onSubmit.bind(this);
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.saveOrUpdateOrder = this.saveOrUpdateOrder.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
           return
        }else{
            OrderService.getOrderById(this.state.id).then( (res) =>{
                let order = res.data;
                this.setState({firstName: order.firstName,
                    lastName: order.lastName,
                    emailId : order.emailId
                });
            });
        }        
    }
    saveOrUpdateOrder = (e) => {
        e.preventDefault();
        alert("hi");
        let order = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId};
        console.log('order => ' + JSON.stringify(order));

        OrderService.updateOrder(order, this.state.id).then( res => {
            alert("from server");
        this.props.history.push('/orders');});
        // step 5
     //   if(this.state.id === '_add'){
     //       OrderService.createOrder(order).then(res =>{
     //           this.props.history.push('/orders');
     //       });
     //   }else{
     //       OrderService.updateOrder(order, this.state.id).then( res => {
      //          this.props.history.push('/orders');
     //       });
     //   }
    }
    
    changeFirstNameHandler= (event) => {
       // alert("fName"+event.target.value)
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
      //  alert("lName"+event.target.value)
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler= (event) => {
      //  alert("email"+event.target.value)
        this.setState({billingDate: event.target.value});
    }

    cancel(){
        this.props.history.push('/orders');
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
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Order</h3>
        }else{
            return <h3 className="text-center">Update Order</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
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
                                            <input placeholder="billingDate" required className="form-control" 
                                                value={this.state.billingDate} onChange={this.changebillinglHandler}/>
                                        </div>
                                        {this.state.error && <b className="m-1 text-danger">{this.state.error}</b>}
                                        {/*<button className="btn btn-success" onClick={this.onSubmit} style={{marginLeft: "10px"}}>Add</button>*/}
                                       <button className="btn btn-success" onClick={this.saveOrUpdateOrder}>UpdateNSave</button> 
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

export default CreateOrderComponent

