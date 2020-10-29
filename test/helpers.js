const expect = require('chai');
const mount = require('enzyme').mount;
const render = require('enzyme').render;
const shallow = require('enzyme').shallow;
const configure = require('enzyme').configure;
const Adapter = require('enzyme-adapter-react-16');
require = require('esm')(module);

configure({ adapter: new Adapter() });

module.exports = require('./sizeGridTest.js');
module.exports = require('./sizeTileTest.js');

global.expect = expect;

global.mount = mount;
global.render = render;
global.shallow = shallow; 

import { JSDOM } from 'jsdom';
 
const { window } = new JSDOM('<!doctype html><html><body></body></html>');
 
function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props);
}
 
global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
 
copyProps(window, global);