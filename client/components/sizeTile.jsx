import React from 'react';
import css from '../css/style.css';

const SizeTile = (props) => (
    <div id="sizeTile">
        <div id="sizeText">{props.sizes.size}</div>
    </div>
)

export default SizeTile;