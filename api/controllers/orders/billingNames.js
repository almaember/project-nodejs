const sequelize = require('sequelize');
const OrdersModel = require('../../models/orders');

exports.get_billing_names = (req, res) => {
  OrdersModel.findAll({
    attributes: [
      // specify an array where the first element is the SQL function and the second is the alias
      [sequelize.fn('DISTINCT', sequelize.col('szamlazasinev')), 'szamlazasinev'],
    ],
  }).then(data => res.send(data)).catch(err => console.log(err));
};