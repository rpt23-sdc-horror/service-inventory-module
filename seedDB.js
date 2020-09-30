const inventoryDB = require('./database');

for (let currentProduct = 0; currentProduct < 1; currentProduct++) {

    for (let currentStyle = 0; currentStyle < 6; currentStyle++) {
        let maleSize = 5.5;
        let femaleSize = 4.5;

        for (let currentSize = 0; currentSize < 17; currentSize++) {
            let randomQuantity = Math.floor(Math.random() * Math.floor(10));
            let productStr = currentProduct.toString();
            let styleStr = currentStyle.toString();

            
            if (maleSize + .5 > 13) {
                maleSize += 1;

                var data = {
                    product_id: productStr,
                    style_id: styleStr,
                    size_male: maleSize,
                    quantity: randomQuantity
                }
            } else {
                maleSize+=.5;
                femaleSize+=.5;


                var data = {
                    product_id: productStr,
                    style_id: styleStr,
                    size_male: maleSize,
                    size_female: femaleSize,
                    quantity: randomQuantity
                }
            }

            
            inventoryDB.updateDb(data)
            .then(() => {
                if (currentProduct == 0 && maleSize == 15) {
                    setTimeout(() => {
                        process.exit();
                    }, 8000);
                }
                
            })
            .catch((err) => {
                console.log(err);
            });
        }



    }

}

