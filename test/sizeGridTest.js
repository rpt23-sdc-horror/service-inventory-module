import { mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import { assert, expect } from 'chai';
import SizeGrid from '../client/sizeGrid.jsx';
import SizeTile from '../client/components/sizeTile.jsx';

describe ('<SizeGrid />', () => {
    describe ('componentDidMount', () => {
        it ('should be invoked after component mounts', () => {
            sinon.spy(SizeGrid.prototype, 'componentDidMount');
            const wrapper = mount (<SizeGrid />);
            expect(SizeGrid.prototype.componentDidMount).to.have.property('callCount', 1);
        });

        it ('should call getSizes', () => {
            expect(SizeGrid.prototype.componentDidMount).to.have.property('callCount');
        });
    });

    describe ('getSizes', () => {
        it ('should receive an array as a response', (done) => {
            sinon.spy(SizeGrid.prototype, 'getSizes');
            const wrapper = mount (<SizeGrid />);
            SizeGrid.prototype.getSizes(1,1)
            .then((res) => {
                expect(res).to.be.an('array');
                done();
            })
        });
    });

    describe ('selectSize', () => {
        it ('should change the state of currentSize', () => {
            const wrapper = mount(<SizeGrid />, {attachTo: document.getElementById('inventory-module')});
            let sizes = [{product_id: 1, style_id: 1, size: 5, quantity: 3},
                        {product_id: 1, style_id: 1, size: 5.5, quantity: 3},
                        {product_id: 1, style_id: 1, size: 6, quantity: 2},
                        {product_id: 1, style_id: 1, size: 6.5, quantity: 0}];
            
            wrapper.setState({sizes: sizes, currentSize: ''});
            wrapper.instance().selectSize('5');
            console.log(wrapper.state());
            expect(wrapper.find('div.sizeTile').length).to.equal(4);
        });
    });
});