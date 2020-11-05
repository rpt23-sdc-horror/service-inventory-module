const expect = require('chai');
const mount = require('enzyme').mount;
const render = require('enzyme').render;
const shallow = require('enzyme').shallow;
const configure = require('enzyme').configure;
const Adapter = require('enzyme-adapter-react-16');
require = require('esm')(module);

configure({ adapter: new Adapter() });

global.expect = expect;

global.mount = mount;
global.render = render;
global.shallow = shallow; 