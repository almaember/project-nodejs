const sequelize = require('sequelize');

const {
  Op,
} = sequelize;

const OrdersModel = require('../models/orders');

exports.orders_get_all = (req, res) => {
  const {
    query,
  } = req;

  // Limit for pagination
  const paramsToFindAllFx = {
    offset: parseInt(query.pageIndex, 10) * parseInt(query.pageSize, 10),
    limit: parseInt(query.pageSize, 10),
  };

  // Sorting
  if (query.direction === 'desc' || query.direction === 'asc') {
    paramsToFindAllFx.order = [
      [query.active, query.direction],
    ];
  }

  // Filter by date
  if (query.isFilterByDate === 'true') {
    if (query.startDate == '') {
      query.startDate = '1999-01-01';
    }
    if (query.endDate == '') {
      query.endDate = '2036-12-24';
    }
    paramsToFindAllFx.where = {
      datum: {
        [Op.between]: [query.startDate, query.endDate],
      },
    };
  }

  // Filter by date
  if (query.isFilterByPublishDate === 'true') {
    if (query.publishStartDate == '') {
      query.publishStartDate = '1999-01-01';
    }
    if (query.publishEndDate == '') {
      query.publishEndDate = '2036-12-24';
    }
    paramsToFindAllFx.where = {
      kozzeteve: {
        [Op.between]: [query.publishStartDate, query.publishEndDate],
      },
    };
  }

  // Filter by product name
  if (query.isFilterByProduct === 'true' && paramsToFindAllFx.hasOwnProperty('where') === false) {
    paramsToFindAllFx.where = {
      termekneve: query.productName,
    };
  } else if (query.isFilterByProduct === 'true' && paramsToFindAllFx.hasOwnProperty('where') === true) {
    paramsToFindAllFx.where.termekneve = query.productName;
  }

  // Filter by billing name
  if (query.isFilterByName === 'true' && paramsToFindAllFx.hasOwnProperty('where') === false) {
    paramsToFindAllFx.where = {
      szamlazasinev: query.billingName,
    };
  } else if (query.isFilterByName === 'true' && paramsToFindAllFx.hasOwnProperty('where') === true) {
    paramsToFindAllFx.where.szamlazasinev = query.billingName;
  }

  OrdersModel.findAll(paramsToFindAllFx)
    .then((orders) => {
      res.send(orders);
    }).catch(err => console.log(err));
};