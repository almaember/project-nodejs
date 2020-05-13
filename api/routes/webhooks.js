const express = require('express');
const WebHookController = require('../controllers/webhooks');
const WebHookControllerStatusUpdate = require('../controllers/webhooks/updateOrderStatus');
const WebHookControllerGetOrder = require('../controllers/webhooks/getOrder');

const router = express();

router.post('/', WebHookController.create_order_sql_row);

router.post('/update', WebHookControllerStatusUpdate.update_order_status_from_woocommerce);

router.post('/updateLocal', WebHookControllerStatusUpdate.update_order_status_to_woocommerce);

router.get('/get/:id', WebHookControllerGetOrder.get_order);

module.exports = router;