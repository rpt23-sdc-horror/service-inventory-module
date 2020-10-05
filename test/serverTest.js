const assert = require('chai').assert;
const axios = require('axios');
const seeder = require('../seed/seedDBFunctions');
const database = require('../database/index');

describe ('server', () => {
    it ('should send status 200 with a successful get request', (done) => {
        axios.get('http://localhost:3004/inventory/098/002')
        .then((res) => {
            assert.equal(res.status, 200);
            done();
        })
        .catch((err) => {
            console.log('ERROR WITH GET RESQUEST: ', err);
            done();
        });
    });

    it ('should receive an array of styles as response', (done) => {
        let productQuantity = 1;
        let styleQuantity = 1;
        //a mens shoe style should have 17 sizes
        let expected = 17;

        Promise.all(seeder.setInventoryQuantity(productQuantity, styleQuantity, seeder.addSizesToDB))
        .then(() => {
            axios.get('http://localhost:3004/inventory/000/000')
            .then((res) => {
                assert.equal(res.data.length, expected);
                database.db.collection('Products').deleteMany({})
                .then(() => {
                    done();
                })
                .catch((err) => {
                    console.log('ERROR DELETING FROM DATABASE: ', err);
                });
            })
            .catch((err) => {
                console.log('ERROR WITH GET RESQUEST: ', err);
                database.db.close();
                done();
            });
        })
        .catch((err) => {
            console.log('ERROR SETTING INVENTORY: ', err);
        });

    });
});
