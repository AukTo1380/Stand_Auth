import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender} from "./mail.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipients = [{email}]
    // Ensure the email is your registered email
    if (!email || email !== "hussain.mohammadi1380@gmail.com") {
        throw new Error("You can only send testing emails to your own registered email address.");
    }
    

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipients,
            subject: "Verify your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email verification",
        });
        console.log("Email sent successfully:", response);
        
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error(`Error sending verification::${error.message || error}`);
    }
};

export const sendWellcomEmail=async (email,name)=>{
  
    // const recipients = [{email: "hussain.mohammadi1380@gmail.com"}]
    const recipients = [{email}]
// 
    // Ensure the email is your registered email
    if (!recipients[0].email) {
        throw new Error("You can only send testing emails to your own registered email address.");
    }
    try {
      const response =  await mailtrapClient.send({
            from: sender,
            to: recipients,
            template_uuid:"9ae5f726-bd65-42b1-b4fb-7b5e274fd908",
            template_variables: {
                company_info_zip_code: "TET Software House",
                name:name,              }
        })
        console.log("wellcom email sent successfully", response);
        
    } catch (error) {
        console.log(error.message);
        throw new Error(`Error sending wellcome email::${error.message || error}`);
            
    }
     
}

export const sendResetPasswordEmail =async (email, resetURL)=>{
    const recipient = [{email}]
    
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset Password",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL ),
            category: "Reset Password",
        });
        console.log("Reset password email sent successfully:", response);
        
    } catch (error) {
        console.log(error.message);
        throw new Error(`Error sending reset password email::${error.message || error}`);
    }
     
}


export const sendResetSeccessEmail =async (email)=>{
    const recipient = [{email}]
    
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset Password Successful",
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Reset Password",
        });
        console.log("Reset password successful email sent successfully:", response);
        
    } catch (error) {
        console.log(error.message);
        throw new Error(`Error sending reset password successful email::${error.message || error}`);
    }
    

}