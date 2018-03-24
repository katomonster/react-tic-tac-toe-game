import React, { Component } from 'react';
import './App.css';

import Inputs from './components/Inputs';
import Alert from './components/Alert';
import History from './components/History';
import {
  setWinner,
  resetState,
  updateStateValues,
  setNewHistory, defaultState} from './state-functions';

class App extends Component {
  constructor() {
    super();

    this.state = defaultState();

    this.winningPatterns = [
      '036',
      '147',
      '258',
      '012',
      '345',
      '678',
      '048',
      '246'
    ];
  }

  render() {
    return (
      <section className="App">
        <Alert winner={this.state.winner} currentText={this.state.currentText}></Alert>
        <Inputs onClick={(e, i) => this.handleInput(e, i)} currentText={this.state.currentText} values={this.state.values}></Inputs>
        <aside>
          <button onClick={this.reset.bind(this)} className={this.state.winner || this.state.gameover ? 'reset-button' : 'hide'}>Replay!</button>
          <History history={this.state.history} onClick={(i) => this.goBack(i)}></History>
        </aside>
      </section>
    );
  }

  reset() {
    console.log('default state; ',defaultState())
    console.log('before',this.state.values);
    this.resetClasses();
    this.setState(resetState(defaultState()));

    setTimeout(function() {console.log('after',this.state.values);}.bind(this), 100);
  }

  resetClasses() {
    if (document.querySelector('.active')) document.querySelector('.active').classList.remove('active');
    document.querySelectorAll('.winner').forEach((winner) => {
      winner.classList.remove('winner');
    });
  }

  handleInput(e, i) {
    if (e.target.innerText || this.state.winner)  return;

    const newValues = this.getNewValues(i);
    
    const newText = this.getNewText(i);

    const newHistory = setNewHistory(this.state.history, newValues);
    //console.log(newHistory)

    this.handleClass(e.target);

    this.setState(updateStateValues(this.state, {
      values: newValues,
      currentText: newText,
      history: newHistory
    }));

    this.checkWinner(newValues);
  }

  checkWinner(newValues) {
    let curXs = [];
    let curOs = [];
    let winningPattern = '';
    newValues.forEach((e, i) => {
      if (e === 'X') curXs.push(i);
      else if(e === 'O') curOs.push(i);
    });

    const curXstr = curXs.sort().join('');
    const curOstr = curOs.sort().join('');

    for (const str of this.winningPatterns) {
      if (curXstr.indexOf(str) > -1) {
        this.setState(setWinner('X'));
        winningPattern = str;
        break;
      } else if (curOstr.indexOf(str) > -1) {
        this.setState(setWinner('O'));
        winningPattern = str;
        break;
      }
    }

    if (winningPattern) {
      const indices = new Set( winningPattern.split('') );
      document.querySelectorAll('.container li').forEach((li, i) => {
        if (indices.has(i.toString())) {
          li.classList.add('winner');
        }
      });
    }

    if (newValues.indexOf('') === -1) {
      this.setState(updateStateValues({gameover: true}))
    }
  }

  getNewValues(index) {
    const newValues = Array.from(this.state.values);
    newValues[index] = this.state.currentText;
    return newValues;
  }

  getNewText(index) { 
    return this.state.currentText === 'X' ? 'O' : 'X';
  }

  handleClass(target) {
    if (target.parentNode.querySelector('.active')) {
      target.parentNode.querySelector('.active').classList.remove('active');
    }
    target.className = 'active'; 
  }

  goBack(i) {
    this.setState(updateStateValues({
      values: this.state.history[i-1],
      history: this.state.history.slice(0, i)
    }));
    this.resetClasses();
  }
}

export default App;
