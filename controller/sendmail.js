const nodemailer = require('nodemailer');

const path = require('path')



const sender ={
   
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
         user: 'geovanni.kuhlman@ethereal.email',
        pass: 'x5UGS7WAtvnUTEB6wF'
    }
}
async function sendmail(req,res){

    try{  
        const auth = nodemailer.createTransport(sender);

        const recevier = {
            from:sender.auth.user,
            to:req.body.email,
            subject:"I am sending Mail",
            attachments:[
                {
                    filename:'Your-invoice.pdf',
                    path:path.join(__dirname,'../Your-invoice.pdf'),
                }
            ]
        }

      auth.sendMail(recevier,(err,rep)=>{
        if (err) {
            console.log("Error sending email:", err);
            return res.status(500).send('Failed to send email.');
        } else {
            console.log("Email sent successfully:", info);
            res.render(`<h1>Succesfully send to user </h1>`);
        }
        })
    }catch(err){
        console.log(err);
    }
        
}


module.exports = {sendmail};