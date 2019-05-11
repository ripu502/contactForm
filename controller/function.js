const keys = require('../config/keys');
const request = require('request');

module.exports.getForm = (req, res, next) => {
    res.render('form', {siteKey : keys.siteKey});
};

module.exports.postForm = (req, res, next) => {
   console.log(req.body);
    // if the capcha is not selected
    if (req.body.captcha === undefined ||
        req.body.captcha === '' ||
        req.body.captcha === null) {
        return res.json({ "msg": "Please select captcha first" });
    }

    // capcha is selected

    const secretKey = keys.secretKey;

    const verificationURL =
        `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

    request(verificationURL, (err, response, body) => {
        body = JSON.parse(body);
        console.log(body);

        if (body.success !== undefined && !body.success) {
            return res.json({ "msg": "Failed captcha verification" });
        }
        res.json({ "msg": "Sucess" });
        console.log('success');
    });
};