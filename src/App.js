
import './App.css';
import Header from './components/Header.js'

import Blockviewer from './components/Blockviewer';



import React, { Component } from 'react';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      settings: false,
      wallet: false,
      addTransaction: false,
    }
    this.openSettings = this.openSettings.bind(this);
    this.closeSettings = this.closeSettings.bind(this);
    this.openWallet = this.openWallet.bind(this);
    this.closeWallet = this.closeWallet.bind(this);
    this.closeAll = this.closeAll.bind(this);

    this.openAddTransaction = this.openAddTransaction.bind(this);
  }
  closeAll(){
    this.setState({
      settings: false,
      wallet:false, 
      addTransaction: false
    })
  }
  openAddTransaction(){
    this.setState({
      addTransaction: !this.state.addTransaction,
      settings:false,
      wallet:false,
      
    }, () => {
      console.log(this.state);
    })
  }
  openWallet(){
    this.setState({
      wallet: !this.state.wallet,
      settings: false,
      addTransaction: false,
    })
  }
  closeWallet(){
    this.setState({
      wallet: false
    })
  }
  openSettings(){
    this.setState({
      settings: !this.state.settings,
      wallet: false,
      addTransaction: false,
    }, () => {
      console.log(this.state);
    })
  }
  closeSettings(){
    this.setState({
      settings: false
    })
  }
  render() {
    return (
      <div className="App">
      <Header closeAll={this.closeAll} openAddTransaction={this.openAddTransaction} closeWallet={this.closeWallet} openWallet={this.openWallet} openSettings={this.openSettings} closeSettings={this.closeSettings}/>
      <Blockviewer closeAddTransaction={this.openAddTransaction} openAddTransaction={this.state.addTransaction} closeWallet={this.closeWallet} openWallet={this.openWallet} wallet={this.state.wallet} settings={this.state.settings} openSettings={this.openSettings} closeSettings={this.closeSettings}/>
      
    </div>
    );
  }
}

export default App;
