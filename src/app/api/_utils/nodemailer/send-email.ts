 
import { createTransport } from "nodemailer";

const sendEmail = async (email:string): Promise<Boolean> => {
  try {
    const transporter = createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "lexuslearning@gmail.com",
        pass: "kjomripfdygvfube",
      },
    });

       await transporter.sendMail({
       from: 'Lexus " <lexuslearning@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "Cridential", // Subject line

      html: `<b>Username :${email} </b>
              
         `, // html body
    });
    return true;
  } catch (error) {
    console.log(error)
    return false;
  }
};

export  default sendEmail