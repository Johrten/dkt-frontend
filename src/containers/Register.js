import React, { Component } from 'react';

import { AppConsumer } from '../context/AppContext';

let value

export default class Register extends Component {
  static contextType = AppConsumer;

  state={
    username: "",
    password: ""
  }

  componentDidMount=()=>{
    value = this.context;
    console.log(value.loggedIn)
  }

  handleChange = e =>{
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleLogin = (e) => {
    e.preventDefault()
    fetch("https://dkt-api.herokuapp.com/api/v1/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          user:{
            username: this.state.username,
            password: this.state.password
          }
        })
      })
      .then(response => {
        console.log(response)
        if (response.ok) {
          return response.json()
        } else {
          alert("Wrong Username or Password")
          throw response
        }
      })
      .then(JSONResponse => {
        // console.log('%c INSIDE YE OLDE .THEN', 'color: navy', JSONResponse)
        localStorage.setItem('jwt', JSONResponse.jwt)
        value.dispatch({
          type: 'SET_CURRENT_USER',
          payload: JSONResponse.user
        })
      })
      .then(this.setState({
        username: "",
        password: ""
      }))
      .catch(r => r.json().then(e => value.dispatch({
        type: 'FAILED_LOGIN',
        payload: e.message
      })))
    // e.target.reset()
  }

  handleSignup = (e) => {
    e.preventDefault()
    fetch("https://dkt-api.herokuapp.com/api/v1/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          user:{
            username: this.state.username,
            password: this.state.password
          }
        })
      })
      .then(response => {
        console.log(response)
        if (response.ok) {
          return response.json()
        } else {
          alert("Username taken")
          throw response
        }
      })
      .then(JSONResponse => {
        // console.log('%c INSIDE YE OLDE .THEN', 'color: navy', JSONResponse)
        localStorage.setItem('jwt', JSONResponse.jwt)
        value.dispatch({
          type: 'SET_CURRENT_USER',
          payload: JSONResponse.user
        })
      })
      .then(this.setState({
        username: "",
        password: ""
      }))
      .catch(r => r.json().then(e => value.dispatch({
        type: 'FAILED_LOGIN',
        payload: e.message
      })))
    // e.target.reset()
  }

  render() {
    return (
              <>
                <div className="register-background">
                  <div className="register">
                    <h3 className="eight-bit-font white-font register-text">Please login or register<br/>to play ranked games!</h3>
                    <form className="register-form">
                        <input type="text" onChange={this.handleChange} name="username" placeholder="Username..." className="Input-text" />
                        <br />
                        <input type="password" onChange={this.handleChange} name="password" placeholder="Password..." className="Input-text" />
                    </form>
                    <button onClick={this.handleLogin} className="eight-bit-font register-btn white-font">Login</button>
                    <br/>
                    <button onClick={this.handleSignup} className="eight-bit-font register-btn white-font">Register</button>
                  </div>
                </div>
              </>
    );
  }
};
