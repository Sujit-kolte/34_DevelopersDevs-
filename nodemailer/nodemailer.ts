// import nodemailer from "nodemailer";

// export const sendVerificationEmail = async (
//   useremail: string,
//   username: string,
//   patientemail: string,
//   patientname: string
// ) => {
//   try {
//     // Create the transporter using your Mailtrap or another SMTP service
//     const transport = nodemailer.createTransport({
//       host: "sandbox.smtp.mailtrap.io",
//       port: 2525,
//       auth: {
//         user: "047279cbbc53ee", // Store sensitive info in environment variables
//         pass: "fd87884afa2500",
//       },
//     });

//     // Send the email
//     const info = await transport.sendMail({
//       from: '"Akshay Jha" <akshayjha2006@gmail.com>', // sender address
//       to: "suitkolte@gmail.com", // recipient's email
//       subject: "Email for Verification", // subject line
//       text: `Hello ${"sujit kolte"}`, // plain text body
//       html: `
//         This Email is By The RapidAid Website/Organization , We Want To Convey You The Message That , ${"xyz"} is is serious condition and you are at the minimum distance form it. So You have been transferred an Request to Help ${"xyz"} having EmailId:- ${"xyz"}
//       `, // HTML body
//     });

//     console.log("Message sent: %s", info.messageId);
//     return info.messageId; // Return message ID or any other useful information
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw new Error("Failed to send email");
//   }
// };
