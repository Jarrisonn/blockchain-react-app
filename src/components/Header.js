import React, { Component } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap'
class Header extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Navbar bg="navbar navbar-dark bg-dark" expand="lg">
                <Container>
                    <Navbar.Brand onClick={this.props.closeAll} href="#home">JoshCoin Crypto Simulator</Navbar.Brand>
                    <Button onClick={this.props.openSettings}>Settings</Button>
                    <Button onClick={this.props.openWallet}>Wallet</Button>
                    <Button onClick={this.props.openAddTransaction}>Add Transaction</Button>
                </Container>
            </Navbar>
        );
    }
}

export default Header;
