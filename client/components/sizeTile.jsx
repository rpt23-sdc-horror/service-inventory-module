import React from 'react';
import css from '../css/style.css';

const SizeTile = (props) => (
    <div onClick={() => props.clickFunc(props.sizes.size.toString())} className={"sizeTile " + props.sizes.size} id={'quantity' + props.sizes.quantity}>
        <div className="sizeText">{props.sizes.size}</div>
    </div>
)

export default SizeTile;