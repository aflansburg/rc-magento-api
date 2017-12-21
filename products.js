const paginateResponse = require('./bin/helpers').paginateResponse;
const writeJSON = require('./bin/helpers').writeJSON;
const mutateObjects = require('./bin/helpers').mutateObjArray;

// Visibility
// 1 = Not Visible Individually, 2 = Catalog, 3 = Search, 4 = Catalog/Search <-- 4 is what is needed

// Enabled
// 1 = Enabled <-- 1 is what is needed, 2 = Disabled

// filters
let product_filter = '&filter[1][attribute]=visibility&filter[1][in]=4&filter[2][attribute]=status&filter[2][in]=1';

console.time('paginateAllProducts');
paginateResponse('products', product_filter)
    .then(results=>{
        // can retrieve products in an array
        // or as an object indexed with top-level key being the SKU
        if (results){
            let products = mutateObjects(results, 'array');
            writeJSON(products);
            console.log(`Total products returned: ${Object.keys(products).length}`);
            if (Array.isArray(products))
                console.log('Products array length: ' + products.length);
            console.timeEnd('paginateAllProducts');
        }
    })
    .catch(err => {
    console.log(`Error: ${err}`)
    });
