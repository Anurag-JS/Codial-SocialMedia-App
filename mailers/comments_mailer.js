const nodemailer = require('../config/nodemailer');


//Another way of exports like module.exports = newComment;

exports.newComment = async (comment) => {
    try{
        console.log('Inside newComment mailer');
        // send mail with defined transport object
        const info = await nodemailer.transporter.sendMail({
            from: 'shinigamilovesapple420@gmail.com', // sender address
            to: comment.user.email, // list of receivers
            subject: "New Comment Published", // Subject line
            text: "Hello world?", // plain text body
            html: "<h1>yay! your comment is now published</h1>", // html body
        })
        console.log('Message sent',info);
        

    }catch(err){
        console.log('Error in sending mail', err);
        return;
    }
    
}    