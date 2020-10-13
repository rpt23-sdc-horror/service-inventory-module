import React from 'react';
import ReactDOM from 'react-dom';
import SizeTile from './components/sizeTile.jsx';
import axios from 'axios';
import $ from 'jquery';

class SizeGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sizes: [],
      currentSize: '',
      currentTile: ''
    };
  }

  componentDidMount () {
    const ids = window.location.pathname.split('/');
    const productId = ids[1];
    const styleId = ids[2];
  
    this.getSizes(productId, styleId)
    .then((results) => {
      this.setState({sizes: results});  
    })
    .catch((err) => {
      throw(err);
    });
  }

  getSizes (productId, styleId) {

    return new Promise ((res, rej) => {
      axios.get(`http://localhost:3004/inventory/054/001`)
      .then((results) => {
        res(results.data);
      })
      .catch((err) => {
        rej(err);
      });
    })
  }

  selectSize (selectedSize) {
    const selected = document.getElementsByClassName(selectedSize)[0];

    if (this.state.currentSize) {
      this.state.currentTile.setAttribute('class', `sizeTile ${this.state.currentSize}`);
    }
    
    this.setState({currentSize: selectedSize, currentTile: selected}, () => {
      selected.setAttribute('class', `selected ${selectedSize}`);

      if (this.hasFewLeft(this.getQuantity(this.state.currentTile))) {
        if ($('#fewLeft').length == 0) {
          $('#inventory').prepend('<div id="fewLeft">Just a few left. Order soon.</div>');
        }
      } else {
        $('#fewLeft').remove();
      }
    });

  }

  hasFewLeft (quantity) {
    let selectedQuantity = parseInt(quantity);

    if (selectedQuantity <= 2) {
      return true;
    } 
    return false;
  }

  getQuantity (selectedTile) {
    return selectedTile.id.slice(8);
  }

  addToBag () {
    if (this.checkIfSizeSelected()) {
      console.log('a size is selected');
      $('.grid').css('border', '');
      $('.inventory-text').css('display', 'none');
    } else {
      $('.grid').css('border', '.5px solid');
      $('.grid').css('border-color', 'red');
      $('.inventory-text').css('display', 'contents');
    }
  }

  checkIfSizeSelected () {
    if ($('.selected').length == 0) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    
    return (
      <div id="inventory">
        <label id="selectSize" className="inventoryHeader">Select Size</label>
        <label id="sizeGuide" className="inventoryHeader">Size Guide</label>
        <div className="grid">
            {this.state.sizes.map(ele => <SizeTile sizes={ele} clickFunc={this.selectSize.bind(this)}/>)}
        </div>
        <div class="inventory-text">Please select a size.</div>
        <button className="inventory-button add-to-cart" onClick={this.addToBag.bind(this)}>Add to Bag</button>
        <button className="inventory-button favorite">Favorite  ♡</button>
        
        <div className="shipping-text">Shipping</div>
        <div className="shipping-date">Arrives by Sun, Nov 1
          <div className="edit-location">Edit Location</div>
        </div>
      </div>
    );
  }
}

const domContainer = document.querySelector('#inventory-module');
ReactDOM.render(<SizeGrid />, domContainer);