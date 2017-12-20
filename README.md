## rc-magento-api
#### Node.JS Implementation

This is a node implementation designed to pull relevant data from the Magento 1.x REST API

It is recommended that the developer first review the Magneto 1.x REST API reference at [http://devdocs.magento.com/guides/m1x/api/rest/introduction.html](http://devdocs.magento.com/guides/m1x/api/rest/introduction.html)
before attempting to utilize this project.

This project utilizes `request-promise-native` to facilitate the paging process I created to return all results for the 
specified endpoint.


For a quick jumpstart into using this project, store your access oauth tokens in `keys.json` (you will have to create
 this file). Instructions on how to obtain your OAuth tokens (or at least how it was done for the purpose of this 
 project) from your Magento dev instance are included in `./bin/auth/README.md`. Then check out `products.js` for a
 fairly simple example of how to return products using a few filters.