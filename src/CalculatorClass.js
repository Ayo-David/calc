import React from "react";
import { render } from "react-dom";

class Calculate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      output: 'Output'
    }
    //borrow function handleChange for this using bind
    this.handleChangee = this.handleChange.bind(this)

  }
  //if state is defined outside the constructor you dont need this.state
  // state = {
  //   input: '',
  //   output: 'Output'
  // }
  handleChange(e) {
    this.setState(
      {
        ...this.state,
        input: e.target.value
      }
    )
  }
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.input}
          onChange={(e) => this.handleChange(e)}
        //if you are not using callback you have to bind the fxn
        //onChange={this.handleChangee}
        />
        <MyInput value={this.state.output} />
        <p>{this.state.input}</p>
      </div>
    )
  }
}

class MyInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
  }
  render() {
    return (
      <>
        <h3>Class Component</h3>
        <input
          type="text"
          value={this.state.input}
          onChange={e => this.setState({ input: e.target.value })}
        />
      </>
    )
  }
}

export default Calculate