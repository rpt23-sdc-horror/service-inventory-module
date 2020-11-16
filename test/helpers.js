const expect = require("chai");
const mount = require("enzyme").mount;
const render = require("enzyme").render;
const shallow = require("enzyme").shallow;
require = require("esm")(module);

global.expect = expect;

global.mount = mount;
global.render = render;
global.shallow = shallow;
