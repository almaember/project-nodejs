const express = require('express');
const AdminController = require('../controllers/admin');
const OrdersController = require('../controllers/orders');
const OrdersControllerCount = require('../controllers/orders/count');
const OrdersControllerProductNames = require('../controllers/orders/productNames');
const OrdersControllerBillingNames = require('../controllers/orders/billingNames');
const OrdersControllerArrived = require('../controllers/orders/arrived');
const OrdersControllerGenerateExcel = require('../controllers/orders/generateExcel');


const router = express();

router.get('/authority', AdminController.get_authority);

router.get('/orders', OrdersController.orders_get_all);

router.get('/orders/count', OrdersControllerCount.orders_count_all);

router.get('/orders/productnames', OrdersControllerProductNames.get_product_names);

router.get('/orders/billingnames', OrdersControllerBillingNames.get_billing_names);

router.get('/orders/excel', OrdersControllerGenerateExcel.generate_excel);

router.post('/orders/arrived', OrdersControllerArrived.customer_arrived);


module.exports = router;