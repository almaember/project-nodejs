const wooApi = require('./wooApi').wooApi;
const OrdersModel = require('../../models/orders');

exports.update_order_status_from_woocommerce = (req, res) => {
  const order = req.body;
  OrdersModel.update({
    allapot: order.status,
  }, {
    where: {
      wooid: parseInt(order.id, 10),
    },
  }).then(() => {
    res.send('Státusz sikeresen frissítve WooCommerce-ből');
  }).catch(err => console.log(err));
};

exports.update_order_status_to_woocommerce = (req, res) => {
  const order = req.body;

  // If the status successfully modified in the woocommerce
  wooApi.put(`orders/${order.id}`, {
    status: order.status,
  }).then(() => {
    // then send the mofified status to the database
    OrdersModel.update({
      allapot: order.status,
    }, {
      where: {
        wooid: parseInt(order.id, 10),
      },
    }).then(() => {
      res.json('Státusz sikeresen frissítve WooCommerce-be');
    }).catch(err => console.log(err));
  }).catch(err => console.log(err));
};