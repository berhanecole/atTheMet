import React from 'react';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUser: '',
      loginPass: '',
      regUser: '',
      regPass: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.loginClick = this.loginClick.bind(this);
    this.registerClick = this.registerClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  async loginClick() {
    const { login } = this.props;
    const { loginUser, loginPass } = this.state;
    return await login(loginUser, loginPass);
  }

  registerClick() {
    const { register } = this.props;
    const { regUser, regPass } = this.state;
    register(regUser, regPass);
  }

  render () {
    const { user, logout, isLoggedIn } = this.props;

    return isLoggedIn ? ( 
      <div className='logout'>
        <button type="submit" className="btn btn-primary mb-2" onClick={logout}>Logout</button>
      </div>
    ) : (
      <div className='login'>
        <span>
          <h5>Login:</h5>
          <form className="form-inline">
            {/* <label className="sr-only" for="loginUsername">Username</label> */}
            <input 
              value={this.state.loginUser}
              type="text" 
              className="form-control mb-2 mr-sm-2" 
              name='loginUser' 
              onChange={this.handleChange} 
              placeholder="Username" />
            {/* <label className="sr-only" for="loginPassword">Password</label> */}
            <div className="input-group mb-2 mr-sm-2">
              <input 
                value={this.state.loginPass}
                type="text" 
                className="form-control" 
                name="loginPass" 
                onChange={this.handleChange} 
                placeholder="Password" />
            </div>
            <button type='button' className="btn btn-outline-secondary btn-sm mb-2" onClick={this.loginClick}>Login</button>
          </form>
        </span>
        <span>
          <h5>Register:</h5>
          <form className="form-inline">
            {/* <label className="sr-only" for="registerUsername">Username</label> */}
            <input 
              type="text" 
              className="form-control mb-2 mr-sm-2" 
              name="regUser" 
              value={this.state.regUser}
              onChange={this.handleChange} 
              placeholder="Username" />
            {/* <label className="sr-only" for="registerPassword">Password</label> */}
            <div className="input-group mb-2 mr-sm-2">
              <input 
                type="text" 
                className="form-control" 
                name="regPass" 
                value={this.state.regPass}
                onChange={this.handleChange} 
                placeholder="Password" />
            </div>
            <button type='button' className="btn btn-outline-secondary btn-sm mb-2" onClick={this.registerClick}>Register</button>
          </form>
        </span>
      </div>
    );
  }
}

export default Navbar;
