const nodemailer = require('nodemailer');

 const sendMail = (recipientEmail, subject, msgData) => {
  // msgData: { type: 'invited', host: ownername, fromDate: date, toDate: date, dest: destination }

    // Create a SMTP transporter object
    const transporter = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOSTNAME,
        port: process.env.NODEMAILER_PORT,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASSWORD
        }
    });
//    console.log('transporter',transporter)
    const msg = `<h1>You're invited!!!<h1>
    ${msgData.host} has invited you on a trip to ${msgData.dest} and wants you to collaborate to build out the itinerary.
    <p>Please login or register at https://copilotfsa.com</p>
    `
    // Message object
    const message = {
        from: 'CoPilot <no-reply@copilotfsa.com>',
        to: recipientEmail,
        subject: subject,
        text: 'Hello to myself!',
        html: msg,
    };
    //console.log('message', message)

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred sending email - ' + err.message);
            return process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
//})
}

// sample function call:
// sendMail ('jpirog@hotmail.com', 'You are invited on my trip!', { type: 'invited',
//   dest: 'DisneyWorld!',
//   host: 'Lucy',
//   fromDate: '2021-11-01',
//   toDate: '2021-11-08',
// }) 
