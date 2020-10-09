import React from 'react';
import ReactDOM from 'react-dom';
import SizeTile from './components/sizeTile.jsx';
import axios from 'axios';

class SizeGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sizes: []
    };
  }

  componentDidMount () {
    //get state from anabell's service
    //pass in product_id & style_id from that into getSize()
    this.getSizes()
    .then((results) => {
      this.setState({sizes: results});  
      console.log(this.state.sizes);
    })
    .catch((err) => {
      console.log('ERROR FETCHING STATE: ', err);
    })
  }

  getSizes () {

    return new Promise ((res, rej) => {

      axios.get('http://localhost:3004/inventory/98/2')
      .then((results) => {
        res(results.data);
      })
      .catch((err) => {
        rej(err);
      });
    })
  }

  render() {
    
    return (
      <div id="inventory">
        <label id="selectSize" className="inventoryHeader">Select Size</label>
        <label id="sizeGuide" className="inventoryHeader">Size Guide</label>
        <div className="grid">
            {this.state.sizes.map(ele => <SizeTile sizes={ele}/>)}
        </div>
      </div>
    );
  }
}

let domContainer = document.querySelector('#app');
ReactDOM.render(<SizeGrid />, domContainer);