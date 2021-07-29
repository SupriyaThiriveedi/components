import React, { Component } from 'react'
import { connect } from 'react-redux';
import { removeOrder } from '../actions/actions';
import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { lightGreen, blue, purple, pink } from "@material-ui/core/colors";
import ContainedButtons from './ContainedButtons';
import CustomizedTables from './CustomizedTables';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
{/*const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
const classes = useStyles();*/}
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
  const styles = theme => ({
    root: {
      width: '80%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 500,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  });
class ListOrderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orders: [],
            flag:false
    }
       this.addOrder = this.addOrder.bind(this);
       this.editOrder = this.editOrder.bind(this);
       this.deleteOrder = this.deleteOrder.bind(this);
    }

    deleteOrder(id){
       this.props.dispatch(removeOrder(id))
    }
    addOrder(){
       // this.props.history.push('/add-order/_add');
        this.props.history.push('/addorder');
    }
        
    viewOrder(id){
        this.props.history.push(`/view-order/${id}`);
    }
    edit1Order(id){
    // alert("hi")
     alert(id);
     console.log(id);
     this.setState({flag:true});
    // if(this.state.flag===true)
   //  this.props.history.push(`/edit-order/${id}`);
     this.props.history.push(`/addedit/${id}`);
     // this.props.history.push(`/orders`);

    }
    editOrder(id){
        //  this.props.dispatch(editOrder(id))
        alert(id);
        console.log(id);
        this.setState({flag:true});
       // if(this.state.flag===true)
        this.props.history.push(`/edit-order/${id}`);
    }
    componentDidMount(){
     this.setState({orders:this.props.orders})  
    }
    render() {
        return (
            <div>
                 <h2 align="center" className="text-center">Orders List</h2>
                 <div className = "row">
                 <Button variant="contained" color="primary" onClick={this.addOrder} className="btn btn-info"> Add Order</Button>
                 </div>
                 <br></br>
                 
                        {/*<CustomizedTables clickHandler={this.edit1Order}>

                        </CustomizedTables>*/}
                       <TableContainer component={Paper}>
      <Table  aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">Order orderId</StyledTableCell>
            <StyledTableCell align="right">Order amount</StyledTableCell>
            <StyledTableCell align="right">Order billingDate</StyledTableCell>
            <StyledTableCell align="right">paymentmethod</StyledTableCell>
            <StyledTableCell align="right">customerid</StyledTableCell>
            <StyledTableCell align="right">paymentid</StyledTableCell>
            <StyledTableCell align="left">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {this.props.orders.map((order) => (
            <StyledTableRow key={order.id}>
             
              <StyledTableCell align="right">{order.orderId}</StyledTableCell>
              <StyledTableCell align="right">{order.amount}</StyledTableCell>
              <StyledTableCell align="right">{order.billingDate}</StyledTableCell>
              <StyledTableCell align="right">{order.paymentMethod}</StyledTableCell>
              <StyledTableCell align="right">{order.customer.userId}</StyledTableCell>
              <StyledTableCell align="right">{order.payment.paymentId}</StyledTableCell>
              
             {/**  <StyledTableCell align="right"> <Button color="primary" variant="contained" onDoubleClick={ props.clickHandler(order.id)} className="btn btn-info">Update </Button></StyledTableCell>
              <StyledTableCell align="right"><Button color="primary" variant="contained" onClick={ () => this.deleteOrder(order.id)} className="btn btn-danger">Delete </Button></StyledTableCell>*/}
              <StyledTableCell align="right">   <Button color="primary" variant="contained" onClick={ () => 
                                                this.edit1Order(order.id)} className="btn btn-info">Update </Button></StyledTableCell> 
              <StyledTableCell align="right"><Button color="primary" variant="contained" onClick={ () => this.deleteOrder(order.id)} className="btn btn-danger">Delete </Button></StyledTableCell>                                 
            
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                      
                 </div>
            
        )
    }
}

//export default ListOrderComponent

const mapStateToProps = (state) => {
    return {
        orders: state
    };
}
const matchDispatchToProps = (dispatch) => {
    return {
      // dispatching plain actions
      edit: () => dispatch({ type: 'EDIT_FIRST_ORDER' })
      
    }
  }


//export default connect(mapStateToProps)(ListOrderComponent);
export default withRouter(connect(mapStateToProps)(ListOrderComponent));