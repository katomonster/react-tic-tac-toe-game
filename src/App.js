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
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6]
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
    newValues.forEach((e, i) => {
      if (e === 'X') curXs.push(i);
      else if(e === 'O') curOs.push(i);
    });

    const curXstr = curXs.sort().join('');
    const curOstr = curOs.sort().join('');

    for (const pattern of this.winningPatterns) {
      const str = pattern.join('');
      if (curXstr.indexOf(str) > -1) {
        this.setState({winner: 'X'});
        break;
      } else if (curOstr.indexOf(str) > -1) {
        this.setState({winner: 'O'});
        break;
      }
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
