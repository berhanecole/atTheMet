import React from 'react';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { login, register, user, logout, isLoggedIn } = this.props;

    return isLoggedIn ? (
      <button type="submit" className="btn btn-primary mb-2">Logout</button>
    ) : (
      <div>
        <div>
          <h5>login:</h5>
          <form className="form-inline">
            <label className="sr-only" for="loginUsername">Username</label>
            <input type="text" className="form-control mb-2 mr-sm-2" id="loginUsername" placeholder="Username" />
            <label className="sr-only" for="loginPassword">Password</label>
            <div className="input-group mb-2 mr-sm-2">
              <input type="text" className="form-control" id="loginPassword" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary mb-2">Submit</button>
          </form>
        </div>
        <div>
          <h5>Register:</h5>
          <form className="form-inline">
            <label className="sr-only" for="registerUsername">Username</label>
            <input type="text" className="form-control mb-2 mr-sm-2" id="registerUsername" placeholder="Username" />
            <label className="sr-only" for="registerPassword">Password</label>
            <div className="input-group mb-2 mr-sm-2">
              <input type="text" className="form-control" id="registerPassword" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary mb-2">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Navbar;
