import React, { Component } from 'react';
import { Card, Form, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { Blockchain, Transaction } from './Blockchain/blockchain';
import Transactions from './Transactions';
import { format } from 'date-fns'

import Wallet from './Wallet';
import AddTransactions from './AddTransactions';
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


class Blockviewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blockchain: [],
            loading: true,
            selectedBlock: null,
            difficulty: 2,
            miningReward: 100,
        }
        this.updateSelectedBlock = this.updateSelectedBlock.bind(this);
        this.updateBlockChainSettings = this.updateBlockChainSettings.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateBlockChain = this.updateBlockChain.bind(this);
    }
    handleChange(event) {

        this.setState({
            [event.target.name]: event.target.value
        })

    }
    updateSelectedBlock(block) {
        this.setState({
            selectedBlock: block
        })
    }
    updateBlockChainSettings(event) {

        event.preventDefault();
        let blockchain = this.state.blockchain

        blockchain.difficulty = Number(this.state.difficulty);
        blockchain.miningReward = Number(this.state.miningReward);
        this.setState({
            blockchain: blockchain,
        }, () => {
            console.log(this.state.blockchain);
            console.log("settings changed");
        })

        this.props.closeSettings();
    }

    updateBlockChain(blockchain){
        this.setState({
            blockchain: blockchain
        })

    }

    componentDidMount() {
        const blockchain = new Blockchain();

        this.setState({
            blockchain: blockchain,
            loading: false
        })
    }

    render() { 
        return (
            <div>
                {this.state.loading &&
                    <div>
                        <p>Loading Blockchain</p>
                    </div>
                }
                <div className='d-flex flex-wrap gap-3'>
                    {!this.state.loading &&!this.props.openAddTransaction && !this.props.wallet && !this.props.settings && this.state.blockchain && this.state.blockchain.blockchain.map((block, index) => (
                        <Card className='w-25 m-3' onClick={event => (this.updateSelectedBlock(block))} key={index}>
                            <Card.Body>
                                <Card.Title>Block {index}</Card.Title>
                            </Card.Body>
                            <ListGroup className='list-group list-group-flush'>
                                <ListGroupItem className='list-group-item'>
                                    <span>Hash</span>            
                                    <br />
                                    <div className='text-truncate'>
                                        <small>{block.hash}</small>
                                    </div>
                                    <span>Hash of previous block</span>
                                    <br />
                                    <div className='text-truncate'>
                                        <small>{block.precedingHash}</small>
                                    </div>
                                </ListGroupItem>
                                <ListGroupItem className='list-group-item'>
                                    <span>Nonce</span>
                                    <br />
                                    <div className="text-truncate text-muted">
                                        <small>{block.nonce}</small>
                                    </div>
                                </ListGroupItem>
                                <ListGroupItem className='list-group-item'>
                                    <span className="">Timestamp</span>
                                    <br />
                                    <div className="text-truncate text-muted">
                                        <small>{format(block.timestamp, "dd-MM-yyyy HH:mm:ss")}</small>
                                        
                                    </div>

                                </ListGroupItem>
                            </ListGroup>
                        </Card>

                    ))}
                </div>
                {this.updateSelectedBlock &&!this.props.openAddTransaction && !this.props.settings && !this.props.wallet &&
                    <div>
                        <Transactions block={this.state.selectedBlock} />
                    </div>
                }
                {this.props.settings &&
                    <div className='d-flex flex-column align-items-center'>
                        <h2>Settings</h2>
                        <Form className='w-50' onSubmit={event => this.updateBlockChainSettings(event)}>
                            <Form.Group className="mb-3">
                                <Form.Label>Difficulty</Form.Label>
                                <br/>
                                <small>Amount of 0's needed on block hash</small>
                                <Form.Control name='difficulty' value={this.state.difficulty} onChange={event => this.handleChange(event)} type="number" max={4}/>

                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Mining Reward</Form.Label>
                                <br/>
                                <small>Amount of coins given when mining block</small>
                                <Form.Control name='miningReward' value={this.state.miningReward} onChange={event => this.handleChange(event)} type="number" />
                            </Form.Group>

                            <div className='d-flex justify-content-evenly'>
                            <Button onClick={this.props.closeSettings} variant="primary" type="submit">
                                X
                            </Button>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            </div>
                        </Form>
                    </div>
                }
                {this.props.wallet && <Wallet blockchain={this.state.blockchain}/>}
                {this.props.openAddTransaction && <AddTransactions closeAddTransaction={this.props.closeAddTransaction} updateBlockChain={this.updateBlockChain} blockchain={this.state.blockchain}/>}
            </div>
        );
    }
}

export default Blockviewer;
