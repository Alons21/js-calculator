import React from 'react';
import './App.css';
import KeyHandler, { KEYPRESS } from 'react-key-handler';
import Helmet from 'react-helmet'
class App extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      lastNum: 0,
      currentNum: 0,
      typeOfOperation: null,
      isResult: false,
      nextNumIsFirstDecimal: false,
      currentNumIsEmpty: true,
      decimalCount: 0,
    };
    this.hadleNumTyped.bind(this);
    this.handleOperatorClick.bind(this);
    this.handleEqualClick.bind(this);
  }
  hadleNumTyped(num) {
    if (this.state.isResult) {
      this.handleClear();
    }
    if (this.state.nextNumIsFirstDecimal && this.state.decimalCount === 0) {
      this.setState((state) => ({
        isResult: false,
        currentNum: parseFloat(state.currentNum + "." + num).toFixed(1),
        nextNumIsFirstDecimal: false,
        currentNumIsEmpty: false,
        decimalCount: state.decimalCount++,
      }));
    } else if (this.state.decimalCount > 0) {
      this.setState((state) => ({
        isResult: false,
        currentNum: parseFloat(state.currentNum + num).toFixed(state.decimalCount),
        nextNumIsFirstDecimal: false,
        currentNumIsEmpty: false,
        decimalCount: state.decimalCount++,
      }));
    } else {
      this.setState((state) => ({
        isResult: false,
        currentNum: parseFloat(state.currentNum + num),
        currentNumIsEmpty: false,
      }));
    }
  }
  handleOperatorClick(operator) {
    if (this.state.isResult) {
      this.setState((state) => ({
        isResult: false,
        lastNum: state.currentNum,
        currentNum: 0,
        typeOfOperation: operator,
        nextNumIsFirstDecimal: false,
        currentNumIsEmpty: true,
        decimalCount: 0,
      }))
    }
    if (this.state.lastNum !== 0 && !this.state.currentNumIsEmpty) {
        this.handleEqualClick();
    } else if (this.state.currentNumIsEmpty && this.state.lastNum) {
      if (operator === '-') {
        this.setState(() => ({
          currentNum: operator,
          currentNumIsEmpty: true,
          isResult: false,
        }))
      } else {
        this.setState(() => ({
          currentNum: 0,
          currentNumIsEmpty: true,
          typeOfOperation: operator,
        }))
      }
    }
    if (!this.state.currentNumIsEmpty) {
      this.setState((state) => ({
        isResult: false,
        lastNum: state.currentNum,
        currentNum: 0,
        typeOfOperation: operator,
        nextNumIsFirstDecimal: false,
        currentNumIsEmpty: true,
        decimalCount: 0,
      }))
    }
  }
  handleEqualClick() {
    this.setState((state) => {
      let expresionToCalculate;
      switch (state.typeOfOperation) {
        case "+":
          expresionToCalculate = parseFloat(state.lastNum) + parseFloat(state.currentNum)
          break;
        case "-":
          expresionToCalculate = parseFloat(state.lastNum) - parseFloat(state.currentNum)
          break;
        case "*":
          expresionToCalculate = parseFloat(state.lastNum) * parseFloat(state.currentNum)
          break;
        case "/":
          expresionToCalculate = parseFloat(state.lastNum) / parseFloat(state.currentNum)
          break;
        default:
          expresionToCalculate = state.currentNum;
      }
      return ({
        lastNum: 0,
        currentNum: expresionToCalculate,
        typeOfOperation: null,
        isResult: true,
        nextNumIsFirstDecimal: false,
        currentNumIsEmpty: true,
        decimalCount: 0,
      })})
  }
  handleDotClick() {
    if (!this.state.decimalCount > 0) {
        this.setState((state) => ({
        nextNumIsFirstDecimal: true,
        currentNumIsEmpty: false,
      }))
    }
  }
  handleClear() {
    this.setState({
      currentNum: 0,
      typeOfOperation: null,
      lastNum: 0,
      nextNumIsFirstDecimal: false,
      currentNumIsEmpty: true,
      decimalCount: 0,
    })
  }
  render() {
    const keyHandlerList = [];
    for (let i = 0; i <= 9; i++) {
        keyHandlerList.push(<KeyHandler keyEventName={KEYPRESS}
        keyValue={i.toString()}
        onKeyHandle={() => this.hadleNumTyped(i.toString())} />);
    }
    return (
<div className="App">
        <Helmet>
          <script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></script>
        </Helmet>
        <KeyHandler keyEventName={KEYPRESS}
        keyValue="+"
        onKeyHandle={() => this.handleOperatorClick("+")} />
        <KeyHandler keyEventName={KEYPRESS}
        keyValue="-"
        onKeyHandle={() => this.handleOperatorClick("-")} />
        <KeyHandler keyEventName={KEYPRESS}
        keyValue="*"
        onKeyHandle={() => this.handleOperatorClick("*")} />
        <KeyHandler keyEventName={KEYPRESS}
        keyValue="/"
        onKeyHandle={() => this.handleOperatorClick("/")} />
        <KeyHandler keyEventName={KEYPRESS}
        keyValue="."
        onKeyHandle={() => this.handleDotClick()} />
        {keyHandlerList}
  <div id="calculator-container">
    <p id="display">{this.state.lastNum !== 0 && this.state.lastNum}
    {this.state.typeOfOperation && this.state.typeOfOperation}
    {this.state.currentNum === '-' && '-'}
    {this.state.currentNumIsEmpty && !this.state.isResult ? "_" : this.state.currentNum}
    {this.state.nextNumIsFirstDecimal && "."}</p>
          <button id="clear" onClick={() => this.handleClear()}>AC</button>
          <button id="equals" onClick={() => this.handleEqualClick()}>=</button>
          <button id="one" onClick={() => this.hadleNumTyped("1")}>1</button>
          <button id="two" onClick={() => this.hadleNumTyped("2")}>2</button>
          <button id="three" onClick={() => this.hadleNumTyped("3")}>3</button>
          <button id="four" onClick={() => this.hadleNumTyped("4")}>4</button>
          <button id="five" onClick={() => this.hadleNumTyped("5")}>5</button>
          <button id="six" onClick={() => this.hadleNumTyped("6")}>6</button>
          <button id="seven" onClick={() => this.hadleNumTyped("7")}>7</button>
          <button id="eight" onClick={() => this.hadleNumTyped("8")}>8</button>
          <button id="nine" onClick={() => this.hadleNumTyped("9")}>9</button>
          <button id="zero" onClick={() => this.hadleNumTyped("0")}>0</button>
          <button id="decimal" onClick={() => this.handleDotClick()}>.</button>
          <div id="operator-container">
            <button id="add" onClick={() => this.handleOperatorClick("+")}>+</button>
            <button id="subtract" onClick={() => this.handleOperatorClick("-")}>-</button>
            <button id="multiply" onClick={() => this.handleOperatorClick("*")}>x</button>
            <button id="divide" onClick={() => this.handleOperatorClick("/")}>÷</button>
          </div>
  </div>
  <p id="author">Made by @alons_21</p>
</div>
    );
  }
}

export default App;
