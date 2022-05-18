import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class Pendingtransactions extends Component {
    constructor(props) {

        super(props);
        this.state = {
            transactions: [],

        }
        this.updateTransactions = this.updateTransactions.bind(this);
    }
    updateTransactions() {
        this.setState({
            transactions: this.props.blockchain.pendingTransactions
        }, () => {
            console.log("transactions updated");
            console.log(this.state.transactions);
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.blockchain !== this.props.blockchain) {
            this.updateTransactions();
        }
    }
    componentDidMount() {
        this.setState({
            transactions: this.props.blockchain.pendingTransactions
        })
    }


    render() {
        return (
            <div>
                {this.state.transactions &&
                    <div className='d-flex flex-column align-items-center'>
                        <h2>PendingTransactions</h2>
                        <Table className='w-50 table table-hover table-striped'>

                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th className='w-25' scope="col">From</th>
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
                                        {<td>
                                            {transaction.fromAddress !== null &&
                                                <a>{transaction.fromAddress.substring(0, 20)}</a>
                                            }
                                            {transaction.fromAddress === null &&
                                                <p>System</p>}

                                        </td>}
                                        <td>
                                            <a> {transaction.toAddress.substring(0,20)}</a>
                                        </td>
                                        <td>
                                            {transaction.amount}
                                            {transaction.fromAddress === null &&
                                                <span>
                                                    <br />
                                                    <small>
                                                        block reward
                                                    </small>
                                                </span>}
                                        </td>
                                        <td>{transaction.timestamp}</td>
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
                    </div>
                }
            </div>
        );
    }
}

export default Pendingtransactions;
