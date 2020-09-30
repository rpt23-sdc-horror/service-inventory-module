const assert = require('chai').assert;
const dataBase = require('../database');

describe("hello", function () {
    it("should equal to hello", function () {
        let hello = 'hello';
        
        assert.equal(hello, 'hello');
    });
});