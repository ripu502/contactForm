const keys = require('../config/keys');
const request = require('request');
var nodemailer = require('nodemailer');

module.exports.getForm = (req, res, next) => {
    res.render('form', { siteKey: keys.siteKey });
};

module.exports.postForm = (req, res, next) => {
    console.log(req.body);
    // if the capcha is not selected
    if (req.body.captcha === undefined ||
        req.body.captcha === '' ||
        req.body.captcha === null) {
        return res.json({ "msg": "Fail from me" });
    }

    // capcha is selected

    const secretKey = keys.secretKey;

    const verificationURL =
        `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

    request(verificationURL, (err, response, body) => {
        body = JSON.parse(body);
        console.log(body);

        if (body.success !== undefined && !body.success) {
            return res.json({ "msg": "Fail" });
        }


        // implementing in the most simple way
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: keys.gmailId,
                pass: keys.gmailPassword
            }
        });
        const mailOptions = {
            from: req.body.email, // sender address
            to: req.body.email, // list of receivers
            subject: req.body.subject, // Subject line
            html: `<p>${req.body.message}</p>`// plain text body
          };
          transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
         });
        res.json({ "msg": "Success" });
        console.log('success');
    });
};