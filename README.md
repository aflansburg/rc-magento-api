## rc-magento-api
#### Node.JS Implementation

This is a node implementation designed to pull relevant data from the Magento 1.x REST API

The Magento 1.x REST API is a little unorthodox in its design and usage. URIs include brackets which can be a little tricky to handle in node (see *Important Note* below).

It is recommended that the developer first review the Magneto 1.x REST API reference at [http://devdocs.magento.com/guides/m1x/api/rest/introduction.html](http://devdocs.magento.com/guides/m1x/api/rest/introduction.html)
before attempting to utilize this project.

This project utilizes `request-promise-native` to facilitate the paging process I created to return all results for the 
specified endpoint. It does not appear that the Magento 1.x REST API has any options for pagination or even indicating
how many pages of products out of the max limit of 100 exist. Also, you may notice `require('request-debug')(request);` as this provides some helpful runtime debugging.

Most heavy lifting is currently done in `./bin/helpers.js`

Important note: `node_modules/request/lib/oauth.js` was slightly modified to fix an issue where brackets in URIs were not 
handled correctly. The change was pulled from [this commit](https://github.com/psyklopz/request/commit/9abf4aaef2febe3f2da027c86ab4e7fe22ec170e) which you can easily implement and properly addresses the bracket parsing issue with the Magento REST API. The change is basically to replace this line in `oauth.js`:
 
 ```var params = qsLib.parse([].concat(query, form, qsLib.stringify(oa)).join('&'))```
 
 with:
 
 
```
var param_list = [].concat(query, form, qsLib.stringify(oa)).join('&').split('&');
    
var params = {};
   
for(var j = 0; j < param_list.length; j++) {
 	var p = param_list[j].split("=");
  	if (p[0] === '') {
  		//do nothing with this garbage!
  	} else if(p[1]){
  		params[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
  	} else {
  		params[decodeURIComponent(p[0])] = "";
  	}
}    
//var params = qsLib.parse([].concat(query, form, qsLib.stringify(oa)).join('&'), {parseArrays: false})
```

For a quick jumpstart into using this project, store your access oauth tokens in `keys.json` (you will have to create
 this file). Also include the api URL for your rest instance in top-level file `settings.json` - for instance `http://www.yourdomain.com/api/rest/`,
  
  Instructions on how to obtain your OAuth tokens (or at least how it was done for the purpose of this 
 project) from your Magento dev instance are included in `./bin/auth/README.md`. Then, check out `products.js` for a
 fairly simple example of how to return products using a few filters.