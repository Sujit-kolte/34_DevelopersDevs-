"use client"; // Ensure this is a client component

import { useEffect } from "react";

const EmailSender: React.FC = () => {
  const sendEmail = async () => {
    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "recipient@example.com",
        subject: "Email for Verification",
        text: "Hello Sujit Kolte",
      }),
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      console.error("Error:", errorMessage);
      throw new Error(
        `HTTP error! Status: ${res.status}, Message: ${errorMessage}`
      );
    }

    const responseData = await res.json();
    console.log(responseData);
  };

  useEffect(() => {
    sendEmail().catch((error) => {
      console.error("Failed to send email:", error);
    });
  }, []);

  return (
    <div>
      <button onClick={sendEmail}>Send Email</button>
    </div>
  );
};

export default EmailSender;
