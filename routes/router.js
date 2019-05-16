const router = require('express').Router();
const controller = require('../controller/function');
const { check } = require('express-validator/check');

router.get('/', controller.getForm);

router.post('/', [
    check('name')
        .isLength({ min: 1 })
        .withMessage('Your Name is empty'),

    check('email')
        .isEmail()
        .withMessage('Email is invalid'),

    check('subject')
        .isLength({ min: 1 })
        .withMessage('Subject is also Necessay!'),

    check('message')
        .isLength({ min: 3 })
        .withMessage('Message is meaning less for empty')

], controller.postForm);

module.exports = router;