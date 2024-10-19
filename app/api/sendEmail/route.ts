import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Change the function to handle POST requests
export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request body
    const { name, email, pname, pemail } = await request.json(); // Assuming the body is in JSON format

    // Create a transporter using nodemailer
    const transport = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: "immortalking069@gmail.com",
        pass: "jubtxhnwbicofwce", // Consider using environment variables for sensitive info
      },
    });

    // Create the email receiver object
    const receiver = {
      from: "immortalking069@gmail.com",
      to: email, // Use the email from the request body
      subject: `Hello ${name}`, // Dynamic subject based on the name
      text: `This is an urgent mail , Someone from the RapidAid is in serious condition,The Name of Patient is ${pname} and the Email of Patient is ${pemail}, Please Accept the Request as you are the nearest , Just Check Your Notification Section in The RapidAid Website`, // Dynamic message
    };

    // Send the email
    const res = await transport.sendMail(receiver);
    console.log("Email sent successfully!");

    return NextResponse.json({
      status: true,
      response: res,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json({
      status: false,
      error: error, // Return error message for debugging
    });
  }
}
