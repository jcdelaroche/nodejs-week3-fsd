const {router} = require('express');
const {explosion} = require('./admin.controller');

router.route('/admin').delete(explosion);

module.exports = router;