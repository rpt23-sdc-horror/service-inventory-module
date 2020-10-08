import React from 'react';
import ReactDOM from 'react-dom';

class SizeGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    
    return (
      <div>
          Hello from inventory!!
      </div>
    );
  }
}

let domContainer = document.querySelector('#app');
ReactDOM.render(<SizeGrid />, domContainer);