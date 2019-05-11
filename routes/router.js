const router = require('express').Router();
const controller = require('../controller/function');

router.get('/', controller.getForm);

router.post('/', controller.postForm);

module.exports = router;