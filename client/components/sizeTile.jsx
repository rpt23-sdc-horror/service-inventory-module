import React from 'react';
import css from '../css/style.css';

const SizeTile = (props) => (
    <div className="sizeTile" id={'quantity' + props.sizes.quantity}>
        <div className="sizeText">{props.sizes.size}</div>
    </div>
)

export default SizeTile;