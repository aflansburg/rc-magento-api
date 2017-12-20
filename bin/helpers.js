const request = require('request-promise-native');
const validateEndpoint = require('./validation').validateEndpoint;
require('request-debug')(request);
let fs = require('fs');
const keys = require('./auth/keys.json');
const apiUrl = 'http://staging.roughcountry.com/api/rest';
const sizeof = require('object-sizeof');
const oauth = {
    consumer_key: keys.AUTH_KEY,
    consumer_secret: keys.AUTH_SECRET,
    token: keys.AUTH_TOKEN_KEY,
    token_secret: keys.AUTH_TOKEN_SECRET
};

async function paginateResponse(endpoint, response_filter) {
    if (validateEndpoint(endpoint)) {
        console.time('paginateResponse');
        console.log('Starting API call');
        let page = 1;

        let p = new Promise(resolve => {
            let response_arr = [];
            api_call(page, response_filter);

            function api_call(curr_page, filter) {
                let uri;

                if (response_filter){
                    uri = apiUrl + `/${endpoint}?limit=100&page=` + curr_page + filter;
                }
                else {
                    uri = apiUrl + `/${endpoint}?limit=100&page=` + curr_page;
                }

                let req = request.get({
                    url: uri,
                    oauth: oauth,
                    json: true
                });
                req
                    .then(res => {
                        response_arr.push(res);
                        if (Object.keys(res).length === 100) {
                            page++;
                            console.log('Requesting page ' + page);
                            api_call(page, response_filter);
                        }
                        else {
                            resolve(response_arr);
                        }
                    })
                    .catch(err => {
                        console.log('Promise Rejection Error: ' + err);
                    });
            }
        });
        return await p;
    }
    else
        console.log(`Invalid endpoint - '${endpoint}' - supplied to request.`);
    return null;
}

function mutateObjArray(obj_arr, type){
    // this function assumes the existence of the 'sku' property
    let prodArray = [];
    let mObj = {};
    for (let i in obj_arr){
        if (obj_arr.hasOwnProperty(i))
            for (let k in obj_arr[i]){
                if (obj_arr[i].hasOwnProperty(k)) {
                    let sku = obj_arr[i][k]['sku'].toString();
                    mObj[sku] = obj_arr[i][k];
                    if (type === 'array')
                        prodArray.push(mObj);
                }
            }
    }
    if (type === 'array')
        return prodArray;
    else
        return mObj;
}

function writeJSON(obj){
    fs.writeFile('./out.json', JSON.stringify(obj), 'utf8', (err) => {
        if (err) {
            return console.log(err);
        }
    });
    console.log('JSON exported.');
}

module.exports = {
    paginateResponse,
    writeJSON,
    mutateObjArray
};