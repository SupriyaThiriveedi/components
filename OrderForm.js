import React from 'react';

export default class OrderForm extends React.Component {
    constructor(props) {
        super(props);
        this.onOrderIdChange = this.onOrderIdChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onBillingDateIdChange = this.onBillingDateChange.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            flag:false,
            orderId: '',
            amount: '',
            billingDate: '',            
            error: ''
        };
    }

    onFirstNameChange(e) {
        const orderId = e.target.value;
        this.setState((state) => ({ ...state, orderId: orderId }));
    }

    onLastNameChange(e) {
        const amount = e.target.value;
        this.setState((state) => ({ ...state, amount: amount }));
    }

    onEmailIdChange(e) {
        const billingDate = e.target.value;
        this.setState((state) => ({ ...state, billingDate: billingDate }));
    }
   

    onSubmit(e) {
        e.preventDefault();

        if (!this.state.orderId || !this.state.amount || !this.state.billingDate  ) {
            this.setState((state) => ({ ...state, error: "Please input all the required values " }));
        } else {
            this.setState((state) => ({ ...state, error: '' }));
            this.props.onSubmitOrder(
                {
                    orderId: this.state.orderId,
                    amount: this.state.amount,
                    billingDate: this.state.billingDate
                    
                }
            );
        }
    }

    render() {
        return (
            <div> 
                <form onSubmit={this.onSubmit} className="form-group m-4">           
                    <input className="form-control m-1 w-50" required type="text" placeholder="Enter orderId here..." value={this.state.orderId} onChange={this.onOrderIdChange}/>
                    <input className="form-control m-1 w-25" required type="text" placeholder="Enter amount here..."  value={this.state.amount} onChange={this.onAmountChange}/>
                    <input className="form-control m-1 w-50"  required type="text"  placeholder="Enter billingDate here..." value={this.state.billingDate} onChange={this.onbillingDateChange}/>
                    
                    {this.state.error && <b className="m-1 text-danger">{this.state.error}</b>}
                    <button className="btn btn-primary m-1 w-25">Edit Order</button>
                </form>
            </div>
        );
    }
}