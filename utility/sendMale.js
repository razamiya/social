const nodemailer = require("nodemailer");

const sendMail = (to, subject, data) => {
  // create Transport
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS,
    },
  });

  // mail sending process
  transport.sendMail({
    from: `Instagram ${process.env.MAIL_ID}`,
    to: to,
    subject: subject,
    text: "",
    html: `
        
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Verification Template</title>
                <style>
                    @import url(https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic);
            
                    *{
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        font-family: "Google Sans",Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
                    }
                    img{
                        max-width: 100%;
                    }
                    .main-wrapper {
                        background: #ededed;
                        min-height: 630px;
                        width: 100%;
                        overflow: hidden;
                    }
                    .wrapper{
                        background: #fff;
                        width: 60%;
                        border: 1px solid #dedede;
                        padding: 20px 0;
                        max-width: 700px;
                        margin: 0 auto;
                        margin-top: 130px;
                    }
                    .logo{
                        padding: 0 20px 20px;
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center
                    }
                    .logo img{
                        width: 30px;
                        margin-right: 10px;
                    }
                    .message{
                        padding: 20px 50px;
                        font-size: 16px;
                    }
                    .verify-btn {
                        margin: 10px 0 10px 50px;
                    }
                    .verify-btn a {
                        background: #ff0000;
                        color: #fff;
                        text-decoration: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        font-size: 16px;
                    }
                    .follow {
                        
                        padding: 20px 50px 0;
                    }
                    .follow ul {
                        display: flex;
                        list-style-type: none;
                        margin-top: 10px;
                    }
                    .follow ul li{
                        margin-left: 0;
                        margin-right: 15px;
                    }
                    .follow ul li img {
                        width: 25px;
                    }
                    .footer{
                        width: 60%;
                        padding: 20px 0;
                        max-width: 700px;
                        margin: 0 auto;
                        font-size: 14px;
                        line-height: 1.5;
                        text-align: center;
                    }
                    .footer .copyright{
                        margin-top: 10px;
                    }
                    .footer .copyright a{
                        color: #ff0000;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                
                <div class="main-wrapper">
                    <div class="wrapper">
                        <div class="logo">
                            <img src="https://student-app-shb.herokuapp.com/images/mern.png" alt="">
                            <h2>Student <span style="color:#ff0000">App</span></h2>
                        </div>
                        <hr color="#dedede" >
                        <div class="message">
                            <h4>Hi ${data.name},</h4>
                            <br>
                            <p>To activate your Account, please verify your email address.</p>
                        </div>
                        <div class="verify-btn">
                            <a href="${data.link}">Verify Your Email</a>
                        </div>
                        <div class="follow">
                            <span><strong>Follow us</strong></span>
                            <ul>
                                <li><a href="https://facebook.com/frshahab.me"><img src="https://ci5.googleusercontent.com/proxy/Hp1tHwpZJplBQHTr-WRQujyXVO54yAQdUwALRHoIu3TW_4YDZ6B6Ls74s-w-3MEDpMW9F5Bc8V4B2IT49EMXsm4X1qqiK8IjzmNO4S_OfAs-tByTjpOe2-uS3s3hY3HTf5w=s0-d-e1-ft#http://pubs.payoneer.com/EmailSender/Payoneer/img/Default/BlocksTemplate/fb.jpg" alt="" class="CToWUd" data-bit="iit"></a></li>
                                <li><a href="https://twitter.com/SHB_Services"><img src="https://ci6.googleusercontent.com/proxy/IrEOgUYJAxNOXCfkCzRhp3Pr5plttxi_SK_vo7HZtMFa9MnD5KZqMxD0PxnsIjARnAifRp7OuUYYY20Bx98L__qgfC-G266Bqx7WcwKAYkekf1hLO0pZhaVmV4UfPbaFNGY=s0-d-e1-ft#http://pubs.payoneer.com/EmailSender/Payoneer/img/Default/BlocksTemplate/tw.jpg" alt="" class="CToWUd" data-bit="iit"></a></li>
                                <li><a href="https://www.linkedin.com/in/frshahab/"><img src="https://ci6.googleusercontent.com/proxy/KSBDtD0zHbN5XeL5qH34sW3-l80xoG-w0BBfwWJAKOpm5TzMSQdySc4IybYGoQHKjT_Wo3UDUSeCtTIWDxoIky3CVQs4NQ208Te17XQNfgN2coi-_NX4ppd5lt40uL9B-LE=s0-d-e1-ft#http://pubs.payoneer.com/EmailSender/Payoneer/img/Default/BlocksTemplate/li.jpg" alt="" class="CToWUd" data-bit="iit"></a></li>
                                <li><a href="https://www.youtube.com/channel/UCHiu-FbQ6isdk-DICIZdRKg"><img src="https://ci4.googleusercontent.com/proxy/cqBt0SYqEkz5P5RlEVBOgBiEsYGuAGdvEGnMKJY7Pny4E4Fc4Wh2XESh_BSxyR0kc6MwhSZ90frj3Z0X3li2uWsh2aqA78SPkhL0ypAuvU4H_SC5HzvlUoN3eE5687knUrE=s0-d-e1-ft#http://pubs.payoneer.com/EmailSender/Payoneer/img/Default/BlocksTemplate/yt.jpg" alt="" class="CToWUd" data-bit="iit"></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="footer">
                        <p>This system email was sent to Md Shahab Uddin (mdshahab433@gmail.com) regarding your Student App Account</p>
                        <p class="copyright">&copy; copyright <a href="https://shb-services.com"><strong>SHB-Services</strong></a>. All Right Reserved by Shahab</p>
                    </div>
                </div>
            
            </body>
            </html>
        `,
  });
};

module.exports = sendMail;
