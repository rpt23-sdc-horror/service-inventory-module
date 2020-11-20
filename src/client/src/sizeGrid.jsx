import React from "react";
import SizeTile from "./components/sizeTile.jsx";
import axios from "axios";
const port = process.env.PORT || 3004;

class SizeGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sizes: [],
      currentSize: "",
      currentTile: "",
      didNotSelectSize: false,
      fewSizesLeft: false,
    };

    const ids = window.location.pathname.split("/");
    const productId = ids[2];
    const styleId = ids[3];

    this.getSizes(productId, styleId)
      .then((results) => {
        this.setState({ sizes: results });
      })
      .catch((err) => {
        throw err;
      });
  }

  getSizes(productId, styleId) {
    return new Promise((res, rej) => {
      axios
        .get(`http://localhost:${port}/inventory/${productId}/${styleId}`)
        .then((results) => {
          res(results.data);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }

  selectSize(selectedSize) {
    const selected = document.getElementsByClassName(selectedSize)[0];
    if (this.state.currentSize) {
      this.state.currentTile.setAttribute(
        "class",
        `sizeTile ${this.state.currentSize}`
      );
    }

    this.setState({ currentSize: selectedSize, currentTile: selected }, () => {
      selected.setAttribute("class", `selected ${selectedSize}`);

      if (this.hasFewLeft(this.getQuantity(this.state.currentTile))) {
        if (!document.getElementById("fewLeft")) {
          this.setState({ fewSizesLeft: true });
        }
      } else {
        this.setState({ fewSizesLeft: false });
      }
    });
  }

  hasFewLeft(quantity) {
    let selectedQuantity = parseInt(quantity);

    if (selectedQuantity <= 2) {
      return true;
    }
    return false;
  }

  getQuantity(selectedTile) {
    return selectedTile.id.slice(8);
  }

  addToBag() {
    if (!this.state.currentSize) {
      this.setState({ didNotSelectSize: true });
    } else {
      this.setState({ didNotSelectSize: false });
    }
  }

  render() {
    let gridClass;
    let selectASizeClass;
    let orderSoonClass;
    let selectTextClass;

    if (!this.state.currentSize && this.state.didNotSelectSize) {
      gridClass = "grid grid-selected";
      selectASizeClass = "inventory-text";
      selectTextClass = "error-text";
    } else {
      gridClass = "grid";
      selectASizeClass = "hidden";
    }

    if (this.state.fewSizesLeft) {
      orderSoonClass = "fewLeft";
    } else {
      orderSoonClass = "hidden";
    }

    return (
      <div id="inventory">
        <div className={orderSoonClass}>
          <svg width="24px" height="24px" fill="#BA861E" viewBox="0 0 24 24">
            <path d="M12.2 22.2c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9zm0-16.4c-4.1 0-7.5 3.4-7.5 7.5s3.4 7.5 7.5 7.5 7.5-3.4 7.5-7.5-3.3-7.5-7.5-7.5zm.6 8l-1.1-1.1L16 8.5l1 1-4.2 4.3zm4-11h-9V1.2h9v1.6z"></path>
          </svg>
          <span id="order-soon-text">Just a few left. Order soon.</span>
        </div>
        <label id="selectSize" className={"inventoryHeader " + selectTextClass}>
          Select Size
        </label>
        <label id="sizeGuide" className="inventoryHeader">
          Size Guide
        </label>
        <div className={gridClass}>
          {this.state.sizes.map((ele) => (
            <SizeTile
              sizes={ele}
              clickFunc={this.selectSize.bind(this)}
              key={ele.size}
            />
          ))}
        </div>
        <div className={selectASizeClass} id="selectSize">
          Please select a size.
        </div>
        <button
          className="inventory-button add-to-cart"
          onClick={this.addToBag.bind(this)}
        >
          Add to Bag
        </button>
        <button className="inventory-button favorite">Favorite ♡</button>
        <div className="shipping-text">Shipping</div>
        <div className="shipping-date">
          Arrives by Sun, Nov 1
          <div className="edit-location">Edit Location</div>
        </div>
      </div>
    );
  }
}

export default SizeGrid;
