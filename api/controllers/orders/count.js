const sequelize = require('sequelize');

const {
  Op,
} = sequelize;

const OrdersModel = require('../../models/orders');

exports.orders_count_all = (req, res) => {
  const {
    query,
  } = req;

  const paramsToFindAllFx = {
    attributes: [
      [sequelize.fn('COUNT', sequelize.col('id')), 'counted_data'],
    ],
  };

  if (query.isFilterByDate === 'true') {
    paramsToFindAllFx.where = {
      datum: {
        [Op.between]: [query.startDate, query.endDate],
      },
    };
  }

  if (query.isFilterByProduct === 'true' && paramsToFindAllFx.hasOwnProperty('where') === false) {
    paramsToFindAllFx.where = {
      termekneve: query.productName,
    };
  } else if (query.isFilterByProduct === 'true' && paramsToFindAllFx.hasOwnProperty('where') === true) {
    paramsToFindAllFx.where.termekneve = query.productName;
  }

  OrdersModel.findAll(paramsToFindAllFx)
    .then((countOfOrders) => {
      res.send(countOfOrders);
    }).catch(err => console.log(err));
};