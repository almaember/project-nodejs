const OrdersModel = require('../../models/orders');

exports.customer_arrived = (req, res) => {
  OrdersModel.update({
    megerkezett: req.body.arrived,
  }, {
    where: {
      id: req.body.orderId,
    },
  }).then(() => {
    OrdersModel.findAll({
      attributes: [
        'megerkezett',
      ],
      where: {
        id: req.body.orderId,
      },
    }).then((data) => {
      res.json(data[0].dataValues.megerkezett);
    }).catch(err => console.log(err));
  }).catch(err => console.log(err));
};