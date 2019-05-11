const router = require('express').Router();
const controller = require('../controller/function');

router.get('/', controller.getForm);

module.exports = router;