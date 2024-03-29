import React, {Component} from 'react';
import AuthService from './auth-service';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

class Signup extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      signedUp: false
    };
    this.service = new AuthService();
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    this.service.signup(username, password)
      .then( res => {
        this.setState({
          username: '',
          password: '',
          signedUp: true
        });
        this.props.setTheUser(res);
      })
      .catch( err => {
        console.log(err);
      });
  }

  render(){
    if(this.state.signedUp){
      return <Redirect to='/'/>
    } else{
      return (
        <div className='signup-login'>
          <h2>Signup</h2>
          <form onSubmit={ e => this.handleFormSubmit(e)}>
            <label>Username:</label>
            <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)}></input>
            <label>Password:</label>
            <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)}></input>
            <input type="submit" value="Submit!"></input>
          </form>
          <p>Already have an account?
            <Link to={'/'}> Login</Link>
          </p>
        </div>
      );
    }
  }
}

export default Signup;