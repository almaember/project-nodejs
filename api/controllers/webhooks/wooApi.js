const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;



const wooApiSettings = {
    development: {
        url: 'http://woo.onlinevagyok.hu',
        consumerKey: 'ck_fc969493397136c53419320d066cb49335499be0',
        consumerSecret: 'cs_a5b1716529a93d9a0f919676fe0da1968960cfa9',
        version: 'wc/v3',
    },
    production: {
        url: 'https://kreativliget.hu',
        consumerKey: 'ck_58603d4556376154239616b58bf0b0189489c082',
        consumerSecret: 'cs_f39769e74ae4868c98492a7b0e404e597e3aa2f6',
        version: 'wc/v3',
    }
}



const env = process.env.NODE_ENV;

exports.url = wooApiSettings[env].url;
exports.consumerKey = wooApiSettings[env].consumerKey;
exports.consumerSecret = wooApiSettings[env].consumerSecret;
exports.wooApi = new WooCommerceRestApi(wooApiSettings[env]);
