const nodemailer = require('nodemailer');

const send = async (mail,message,subject,otp) => {
	const transpotor = nodemailer.createTransport({
host: process.env.EMAIL_HOST,
  port: process.env.PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
	});

let html = `<h1>${subject} </h1><br><h4>valid for 10min</h4><br> ${message}<h1>${otp}</h2>`

	const mailOptions = {
		from : 'WCT@banao.io',
		to : mail,
		subject :subject,
		html : html
	}
	console.log('send mail')
	try {		

		await transpotor.sendMail(mailOptions);
	} catch(err) {
		console.log(err)
		return (err);
	}
}

module.exports = send;