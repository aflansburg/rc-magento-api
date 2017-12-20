## Magento API OAuth 1.0 Authentication

##### This all desperateley needs to be rewritten/reworked
_A pretty hacky method of authenticating against Magento REST API._

##### Currently you have to follow this methodology

1. Get a `consumer_key`, `consumer_secret` pair from Magento site admin (currently stored in `keys.json`)
2. Use `preauth.js` to generate an "unauthorized" token/secret pair
3. Use the "unauthorized" token/secret pair to create the authentication URL
4. Navigate to the URL in browser (this needs to be done differently in future releases)
5. Authenticate using appropriate user credentials with desired permissions
6. If `callback` value is null or invalid, the browser will respond with a bad request, but
provide the tokens in the URL needed to complete the authentication process.
7. Use `auth.js` and the tokens retrieved from the URL in step 6 to get the final authorized token/secret pair.