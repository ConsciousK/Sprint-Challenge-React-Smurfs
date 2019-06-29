import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";

import axios from "axios";

import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3333/smurfs")
      .then(response => {
        this.setState({
          smurfs: response.data
        });
        console.log(this.state.smurfs);
      })
      .catch(err => {
        console.log("Error:", err);
      });
  }

  updateItems = smurfs => {
    this.setState({ smurfs });
  };
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
        <nav>
          <h1 className="village-header">Smurf Village</h1>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/smurfform">Add Smurf</Link>
          </div>
        </nav>
        <Route exact path='/' render={(props) => <Smurfs {...props} smurfs={this.state.smurfs} />} />
        <Route exact path='/smurfform' render={(props) => <SmurfForm {...props} smurfs={this.state.smurfs} />} />
      </div>
    );
  }
}

export default App;
