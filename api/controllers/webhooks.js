const OrdersModel = require('../models/orders');
const wooApi = require('./webhooks/wooApi').wooApi;
const sleep = require('../services/sleep');

exports.create_order_sql_row = async (req, res) => {
  const ordersToDataBase = [];

  if (!req.body || !req.body.id) {
    res.send('Teszt sikeres');
    return;
  }

  let response;
  let
    order;
  try {
    res.send('Lekérés sikeres');
    await sleep(30000);
    response = await wooApi.get(`orders/${req.body.id}`);
    console.log(response.data.line_items.meta_data);
    order = response.data;
  } catch (err) {
    console.log(err);
    res.send('Hiba történt');
  }

  for (let i = 0; i < order.line_items.length; i += 1) {
    let datum = '';
    let vasznak = '';
    const szamlazasinev = `${order.billing.last_name} ${order.billing.first_name}`;
    for (const meta of order.line_items[i].meta_data) {
      if (meta.key === 'Dátum') {
        datum = meta.value;
      } else if (meta.key.startsWith('Vászon:')) {
        vasznak += `${meta.key.substring(8)}: ${meta.value}; `;
      }
    }
    if (datum) {
      ordersToDataBase.push({
        wooid: parseInt(order.id, 10),
        kozzeteve: order.date_created_gmt,
        allapot: order.status,
        termekneve: order.line_items[i].name,
        datum,
        mennyiseg: order.line_items[i].quantity,
        vegosszeg: parseInt(order.line_items[i].total, 10) +
          parseInt(order.line_items[i].total_tax, 10),
        fizetesimod: order.payment_method_title,
        megjegyzes: order.customer_note,
        megerkezett: 0,
        vasznak,
        szamlazasinev,
      });
    }
  }

  if (!ordersToDataBase.length) {
    console.log(`Nem volt esemény a rendelésben: ${order.id}`);
  }
  OrdersModel.bulkCreate(
    ordersToDataBase, {
      fields: Object.keys(ordersToDataBase[0]),
    },
  ).then(
    () => {
      console.log(`Rendelés sikeresen importálva: ${order.id}`);
    },
  ).catch(err => console.log(err));
};