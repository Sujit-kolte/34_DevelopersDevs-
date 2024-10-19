"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { auth } from "../firebase.config";
import { useAppDispatch } from "./hooks";
import { setSocket } from "./store/socketSlice";

const HomePage = () => {
  const dispatch = useAppDispatch();
  console.log(auth.currentUser);
  if (auth.currentUser === null) {
  }
  useEffect(() => {
    const socket = io("http://localhost:3000");
    dispatch(setSocket(socket));
    setSocket(socket);
    if (auth.currentUser && auth.currentUser.hasOwnProperty("userId")) {
      // socket.emit("email", auth.currentUser.userId);
    }
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"></div>
  );
};

export default HomePage;
