import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import format from 'date-fns/format';

class Transactions extends Component {
    constructor(props) {

        super(props);
        this.state = {
            transactions: []
        }
        this.updateTransactions = this.updateTransactions.bind(this);
    }
    updateTransactions() {
        this.setState({
            transactions: this.props.block.transactions
        }, () => {
            console.log("transactions updated");
            console.log(this.state.transactions);
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.block !== this.props.block) {
            this.updateTransactions();
        }
    }

    render() {
        return (
            <div>
                {this.state.transactions &&
                    <Table className='table table-hover table-striped'>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">From</th>
                                <th scope="col">To</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Timestamp</th>
                                <th scope="col">Valid?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td>{index}</td>
                                    {<td className="text-truncate">
                                        {transaction.fromAddress !== null &&
                                            <a>{transaction.fromAddress.substring(0,20)}</a>
                                        }
                                        {transaction.fromAddress === null &&
                                        <p>System</p>}

                                    </td>}
                                    <td className='text-truncate'>
                                        <a>{transaction.toAddress.substring(0,20)}</a>
                                    </td>
                                    <td>
                                        {transaction.amount}
                                        {transaction.fromAddress === null && 
                                        <span>
                                            <br/>
                                            <small>
                                                block reward
                                            </small>
                                        </span>}
                                    </td>
                                    <td>{format(transaction.timestamp, "dd-MM-yyyy HH:mm:ss")}</td>
                                    <td>
                                        
                                        {!transaction.isValid() && <span>✗
                                        </span>}
                                        {transaction.isValid() && <span>✓
                                        </span>}
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </Table>
                }
            </div>
        );
    }
}

export default Transactions;
