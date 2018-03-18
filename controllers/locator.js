'SELECT op.order_id, o.locator, op.name_second, op.name_first FROM `orders` o, `order_passengers` op where op.order_id = o.id;'
module.exports = {};
