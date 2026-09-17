import "dotenv/config";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    
    service:"mail",
    auth:{
        type:"Oauth2",
        user:process.env.GOOGLE_USER,
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        refreshToken:process.env.GOOGLE_REFRESH_TOKEN

    }
})


transporter.verify()
.then(()=>{
    console.log("Email transporter is ready to send Email");
})
.catch((err)=>{
    console.error("email transporter verification failed");
})

async function sendEmail({to,subject,html,text}){
    const mailOption = {
        from:process.env.GOOGLE_USER,
        to,
        html,
        text

    };

    const details = await transporter.sendMail(mailOption);
    console.log("Email sent ",details);

    
}

