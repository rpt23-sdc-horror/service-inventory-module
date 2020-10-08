import React from 'react';
import ReactDOM from 'react-dom';
import SizeTile from './components/sizeTile.jsx';

class SizeGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
 
  render() {
    
    return (
      <div>
          <SizeTile />
      </div>
    );
  }
}

let domContainer = document.querySelector('#app');
ReactDOM.render(<SizeGrid />, domContainer);