const {wooApi} = require('./wooApi');

exports.get_order = (req, res) => {
  const orderId = req.params.id;

  // If the status successfully modified in the woocommerce
  wooApi.get(`orders/${orderId}`)
    .then((response) => {
      res.send(response.data);
    }).catch(err => console.log(err));
};