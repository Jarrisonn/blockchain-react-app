import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Transaction } from './Blockchain/blockchain';
import Pendingtransactions from './PendingTransactions';
import Transactions from './Transactions';
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Addtransactions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            publickey: '',
            privatekey: '',
            amount: 0,
            publickeyrecipient: '',
            blockchain: null,
            miningReward: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.createTransaction = this.createTransaction.bind(this);
        this.updatePendingTransactions = this.updatePendingTransactions.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })

    }
    updatePendingTransactions(blockchain) {


        this.setState({
            blockchain: blockchain
        })


    }

    createTransaction(event) {

        event.preventDefault();
        console.log(event);

        let publickey = event.target[0].value;
        let privatekey = event.target[1].value;
        let recipient = event.target[2].value;
        let amount = event.target[3].value;

        let blockchain = this.props.blockchain

        const key = ec.keyFromPrivate(privatekey)
        const walletAddress = publickey;



        console.log(key);
        const tx = new Transaction(walletAddress, recipient, amount);
        
        try {
            tx.signTransaction(key)
        } catch (error) {
            alert(error)
        }
        console.log(tx);
        blockchain.addTransaction(tx);
        console.log(blockchain);

        this.props.updateBlockChain(blockchain);
        this.updatePendingTransactions(blockchain)
    }

    mineBlock(event) {
        event.preventDefault();
        let address = event.target[0].value;
        let blockchain = this.props.blockchain;
        this.props.closeAddTransaction();
        blockchain.minePendingTransactions(address);
        this.props.updateBlockChain(blockchain);
        
    }
    render() {
        return (
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <Form className='w-50' onSubmit={event => this.createTransaction(event)}>
                    <h2 className='mt-3'>Add Transaction</h2>
                    <Form.Group className="mb-3">
                        <Form.Label>PublicKey</Form.Label>
                        <Form.Control name='publickey' value={this.state.publickey} onChange={event => this.handleChange(event)} type="input" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>PrivateKey</Form.Label>
                        <Form.Control name='privatekey' value={this.state.privatekey} onChange={event => this.handleChange(event)} type="input" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>PublicKey of Recipient</Form.Label>
                        <Form.Control name='publickeyrecipient' value={this.state.publickeyrecipient} onChange={event => this.handleChange(event)} type="input" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control name='amount' value={this.state.amount} onChange={event => this.handleChange(event)} type="number" />
                    </Form.Group>
                    <Button type='submit'>CreatePendingTransaction</Button>
                </Form>
                <br/>
                <div className='w-50'>
                    <Form onSubmit={event => this.mineBlock(event)}>
                        <h2>Mine Block</h2>
                        <Form.Group className="mb-3">
                            <Form.Label>Mining Rewards Address</Form.Label>
                            <Form.Control name='miningReward' value={this.state.miningReward} onChange={event => this.handleChange(event)} type="input" />
                        </Form.Group>
                        <Button type='submit'>Mine Block!</Button>
                    </Form>
                </div>
                <br/>
                <div className='w-50'>
                    {<Pendingtransactions blockchain={this.props.blockchain} />}
                </div>
                
               



            </div>
        );
    }
}

export default Addtransactions;
