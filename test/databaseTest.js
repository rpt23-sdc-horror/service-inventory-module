const database = require('../database/index');
const assert = require('chai').assert;
const seeder = require('../seed/seedDBFunctions');

describe ('database', () => {


    
    it ('should be able to write to the database', (done) => {
        let obj = {
            product_id: 099,
            style_id: 003,
            size: 8,
            quantity: 2
        };

        database.addToDb(obj)
        .then(() => {
            database.findStyle(obj.product_id, obj.style_id)
            .then((result) => {
                if (result) {
                    assert.equal(result[0].product_id, obj.product_id);
                }
            })
            .catch((err) => {
                console.log('ERROR FINDING STYLE IN DATABASE: ', err);
            });
            done();
        })
        .catch((err) => {
            console.log('ERROR WRITING TO DB: ', err);
        });
        

    });

    it ('should be able to find a specific style', (done) => {

        database.findStyle(099, 003)
        .then((result) => {
            assert.equal(result[0].product_id, 099);
            database.db.collection('Products').deleteMany({product_id: 99})
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
    
    });
});


































