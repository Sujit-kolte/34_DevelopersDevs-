"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { auth } from "../firebase.config";
import { useAppDispatch } from "./hooks";
// import { setSocket } from "./store/socketSlice";
// import { sendVerificationEmail } from "@/nodemailer/nodemailer";

const HomePage = () => {
  const dispatch = useAppDispatch();
  console.log(auth.currentUser);
  if (auth.currentUser === null) {
  }
  async function sendEmail() {
    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "recipient@example.com",
        subject: "Test Email",
        text: "This is a test email.",
      }),
    });
    const response = await res.json();
    console.log(response);
  }
  useEffect(() => {
    sendEmail();
    // const socket = io("http://localhost:3000");
    // dispatch(setSocket(socket));
    // setSocket(socket);
    if (auth.currentUser && auth.currentUser.hasOwnProperty("userId")) {
      // socket.emit("email", auth.currentUser.userId);
    }
    // sendVerificationEmail("asdf", "asfsad", "ASfsdf", "Asfd");
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"></div>
  );
};

export default HomePage;
