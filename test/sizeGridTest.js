import { mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import { assert, expect } from 'chai';
import SizeGrid from '../client/sizeGrid.jsx';


describe ('<SizeGrid />', () => {
    it ('calls componentDidMount', () => {
        sinon.spy(SizeGrid.prototype, 'componentDidMount');
        const wrapper = mount (<SizeGrid />);
        expect(SizeGrid.prototype.componentDidMount).to.have.property('callCount', 1);
    });

    it ('calls getSizes', (done) => {
        sinon.spy(SizeGrid.prototype, 'getSizes');
        const wrapper = mount (<SizeGrid />);
        SizeGrid.prototype.getSizes(1,1)
        .then((res) => {
            console.log(res);
            done();
        })
    });
});