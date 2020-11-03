const database = require('../database/index');
const assert = require('chai').assert;
const seeder = require('../seed/seedDBFunctions');

describe ('seeder', () => {

    describe ('setInventoryQuantity', () => {
        it ('should populate database with the given product & style quantities', (done) => {
            let productQuantity = 1;
            let styleQuantity = 1;
            //34 documents for mens, 30 documents for womens
            let expected = 15;
            
    
            Promise.all(seeder.setInventoryQuantity(productQuantity, styleQuantity, seeder.addSizesToDB))
            .then(() => {
                database.db.collection('Products').find({}, (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        results.toArray()
                        .then((res) => {
                            assert.equal(res.length, expected);
                            //console.log(res);
                        })
                        .catch((err) => {
                            console.log('NEW ERROR: ', err);
                        });
                    }
                });
                database.db.collection('Products').deleteMany({})
                .then(() => {
                    done();
                })
                .catch((err) => {
                    console.log('ERROR DELETING DOCUMENTS: ', err);
                });
            })
            .catch((err) => {
                console.log('ERROR SETTING INVENTORY: ', err);
            });
            
        })
    });
    
    describe ('addSizesToDB', () => {
        it ("should add appropriate sizes for a given productID to the database", (done) => {
            let productId = '102';
            let styleId = '001';
            let expected = 17;
    
            //for even numbered product id's, styles should have 17 different sizes
            Promise.all(seeder.addSizesToDB(productId, styleId))
            .then(() => {
                database.findStyle(productId, styleId)
                .then((results) => {
                    assert.equal(results.length, expected);
                    database.db.collection('Products').deleteMany({})
                    .then(() => {
                        done();
                    })
                    .catch((err) => {
                        console.log('ERROR DELETING FROM DATABASE: ', err);
                    });
                })
                .catch((err) => {
                    console.log('ERROR FINDING STYLE: ', err);
                });
            })
            .catch((err) => {
                console.log('ERROR ADDING SIZES TO THE DATABASE: ', err);
            });
        });
    });
});




