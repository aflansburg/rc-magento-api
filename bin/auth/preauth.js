const request = require('request-promise-native');
const keys = require('./keys.json');
const siteUrl = 'http://staging.roughcountry.com';
const authKey = keys.AUTH_KEY;
const authSecret = keys.AUTH_SECRET;

// this is ad hoc and run manually
// this is for getting the 'unauthorized' tokens from the staging site

let qs = require('querystring'),
    oauth = {
        callback: 'http://dummydevurl.io/callback',
        consumer_key: authKey,
        consumer_secret: authSecret
    },
    url = siteUrl + '/oauth/initiate';

let oauth_token_response = request.post({
    url: url,
    oauth : oauth
});

oauth_token_response.then(token_response => {
    let unauth_token_url = 'https://staging.roughcountry.com/index.php/mgmt/oauth_authorize?' + token_response;
    console.log(unauth_token_url);
    console.log('Navigate here to authenticate with credentials get the "verifier" token id.');
}).catch(err => {
    console.log('Error resolving oauth_token_response POST (Promise): ' + err);
});
