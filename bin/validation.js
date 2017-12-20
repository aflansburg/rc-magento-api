

function validateEndpoint(endpoint){
    let isValid;
    switch(endpoint){
        case 'products':
        case 'customers':
        case 'orders':
        {
            return isValid = true;
        }
        default: {
            return isValid = false;
        }
    }
}

module.exports = {
    validateEndpoint
};