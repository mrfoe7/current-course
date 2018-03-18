const conn = require('./index');
'SELECT o.id, o.locator, o.date_insert, o.price, o.currency, t.amount  FROM `orders` o left join (select distinct order_id, count(order_id) as amount from `order_passengers` group by order_id) t on o.id = t.order_id;'
module.exports = {};
