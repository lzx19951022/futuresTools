import React from 'react';
import './App.css';
import { Head } from '../head/head';
import { Cal  } from '../cal/cal';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return(
      <div>
        <Head />
          <Cal />
      </div>
    )
  }
}

export default App;
