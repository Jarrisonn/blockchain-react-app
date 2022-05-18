
import React, { Component } from 'react';
import { Wallet as wal } from './Blockchain/blockchain'
import { Form, Button,  } from 'react-bootstrap';
class Wallet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            privatekey: '',
            publickey: '',
            balancekey: '',
            balance: null
        }
        this.generateKey = this.generateKey.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })

    }
    generateKey(event) {

        event.preventDefault();
        console.log(event);
        const wallet = new wal();
        const key = wallet.generateKeypair();
        const publickey = key.getPublic('hex');
        const privatekey = key.getPrivate('hex');

        this.setState({
            privatekey: privatekey,
            publickey: publickey,
        }, () => {
            console.log(this.state);
        })

    }
    getBalance(event) {
        event.preventDefault();
        let address = event.target[0].value;
        console.log(event)
        let blockchain = this.props.blockchain;
        let balanceaddressTransactions = blockchain.getBalanceOfAddress(address)
        console.log(balanceaddressTransactions);
        let balance = balanceaddressTransactions[0];
        this.setState({
            balance: balance
        })
       
        
    }

    render() {
        return (
            <div className='d-flex flex-column align-items-center'>
                <Form className='w-50'>
                    <h2>Generate KeyPair</h2>
                    <Form.Group className="mb-3">
                        <Form.Label>PublicKey</Form.Label>
                        <br/>
                        <small>Public Key is needed to recieve coins</small>
                        <Form.Control name='publickey' value={this.state.publickey} onChange={event => this.handleChange(event)} type="input" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>PrivateKey</Form.Label>
                        <br/>
                        <small>Public + PrivateKey are needed to spend coins</small>
                        <Form.Control name='privatekey' value={this.state.privatekey} onChange={event => this.handleChange(event)} type="input" />
                    </Form.Group>
                    <Button onClick={this.generateKey}>Generate KeyPair</Button>
                </Form>
                <br/>
                <Form className='w-50' onSubmit={event => this.getBalance(event)}>
                    <h2>Get Balance</h2>
                    <Form.Label>Enter public key to get balance</Form.Label>
                    <Form.Control name='balancekey' value={this.state.balancekey} onChange={event => this.handleChange(event)} type="input" />
                    <br/>
                    <Button type='submit'>Submit</Button>
                    <br />
                    <Form.Text>Key Balance:</Form.Text>
                    {this.state.balance &&
                        <Form.Group>
                            
                            <Form.Text>{this.state.balance}</Form.Text>
                        </Form.Group>}
                </Form>
            </div>
        );
    }
}

export default Wallet;
