import { shallow } from 'enzyme';
import React from 'react';
import { assert } from 'chai';
import SizeTile from '../client/components/sizeTile.jsx';

describe ('SizeTile Component', () => {
    let product = {size: 11, quantity: 2};
    let wrapper = shallow(<SizeTile sizes={product}/>);

    it ('should contain a size in its class name', (done) => {
        assert.equal(wrapper.props().className, `sizeTile ${product.size}`);
        done();
    });

    it ('should contain a quantity in its id', (done) => {
        assert.equal(wrapper.props().id, `quantity${product.quantity}`);
        done();
    });

    it ('should contain a child element with a size as its value', (done) => {
        let childElement = wrapper.props().children;
        assert.equal(childElement.props.children, product.size);
        done();
    });
});