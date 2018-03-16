import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state={
      currentText: 'O',
      values: ['','','','','','','','',''],
      winner: undefined
    }
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
        <button onClick={this.reset.bind(this)}>Replay!</button>
      </section>
    );
  }

  reset() {
    document.querySelector('.active').classList.remove('active');
    document.querySelectorAll('.winner').forEach((winner) => {
      winner.classList.remove('winner');
    });
    this.setState({
      currentText: 'O',
      values: ['','','','','','','','',''],
      winner: undefined
    });
  }

  handleInput(e, i) {
    if (e.target.innerText || this.state.winner)  return;

    const newValues = this.getNewValues(i);
    
    const newText = this.getNewText(i);

    this.handleClass(e.target);

    this.setState({
      values: newValues,
      currentText: newText
    });

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
        this.setState({winner: 'X'});
        winningPattern = str;
        break;
      } else if (curOstr.indexOf(str) > -1) {
        this.setState({winner: 'O'});
        winningPattern = str;
        break;
      }
    }

    if (winningPattern) {
      const indices = new Set( winningPattern.split('') );
      console.log(indices);
      document.querySelectorAll('.container li').forEach((li, i) => {
        if (indices.has(i.toString())) {
          li.classList.add('winner');
        }
      });
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
}

const Inputs = (props) => {
  let inputs = [];
  for (let i=0; i < 9; i++) {
    inputs.push(<li key={i} name='hello' onClick={(e)=>props.onClick(e, i)} >{props.values[i]}</li>)
  }
  return (
    <article>
      <ul className="container">
        {inputs}
      </ul>
    </article>
  );
}

const Alert = (props) => {
  const alert = props.winner ? "The Winner Is: " + props.winner : "It is " + props.currentText + "'s turn.";
  return (
    <header>{alert}</header>
  );
}

export default App;
