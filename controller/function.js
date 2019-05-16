const keys = require('../config/keys');
const request = require('request');
var nodemailer = require('nodemailer');
// var xoauth2 = require('xoauth2');

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
        // autobots502 is used to send the mail as 2 step 
        // verification is need to be stop
        // and the special toggle should be some
        // refer link :: https://myaccount.google.com/lesssecureapps
        // study link is here https://codeburst.io/sending-an-email-using-nodemailer-gmail-7cfa0712a799
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: keys.gmailId,
                pass: keys.gmailPassword
            }
        });
        const mailOptions = {
            from: req.body.email, // sender address
            to: keys.apiGmail, // site gmail address
            subject: `Mail by contact form from ${req.body.email}`, // Subject line
            html: `<p>${req.body.message}</p>`// plain text body
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err)
                console.log(err)
            else
                console.log(info);
        });


        res.json({ "msg": "Success" });
        console.log('success');
        

        // start refering form transversy media 
        // hope you got

        // sending the gmail with api 
        // not successfull

        // const transporter = nodemailer.createTransport({
        //     host: "smtp.gmail.com",
        //     service: 'gmail',
        //     port: 25,
        //     secure: false,
        //     auth: {
        //         xoauth2: xoauth2.createXOAuth2Generator({
        //             user: 'ripu502@gmail.com',
        //             clientId: keys.clientId,
        //             clientSceret: keys.clientSceret,
        //             refreshToken: keys.refreshToken
        //         })
        //     },
        //     tls: {
        //         rejectUnauthorized: false
        //     }
        // });

        // const mailOptions = {
        //     from: `Ripudaman <ripu502@gmail.com>`,
        //     to: 'ripu502@gmail.com',
        //     subject: 'My site contact from: ' + req.body.subject,
        //     text: req.body.message,
        //     html: 'Message from: ' + req.body.name
        //         + '<br></br> Email: ' + req.body.email + '<br></br> Message: ' + req.body.message
        // };

        // transporter.sendMail(mailOptions, (err, res) => {
        //     if (err) {
        //         return console.log(err);
        //     } else {
        //         console.log(JSON.stringify(res));
        //     }
        // });
    });
};