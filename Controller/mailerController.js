const nodemailer = require('nodemailer')
let random=''
function acak(){
	
	let b='0123456789';
	let c=6;
	let d=b.length;

	for (let i = 0; i < c; i++) {
		random+=b.charAt(Math.floor(Math.random()*d));
	}
	return random;
}



module.exports = function (req, res) {
    acak()
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tested.email.tes@gmail.com',
            pass: 'testedemail123'
        }
    })
    
    let mailOptions = {
        from: 'bc764652ad-251e39@inbox.mailtrap.io',
        to: 'juwar@etlgr.com,robaimuh@gmail.com',
        subject: 'Reset Password',
        text: 'Code Verification is '+random
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(random)
            res.send({
                code: random,
            })
            console.log('Email sent: ' + info.response);
        }
    });


};

