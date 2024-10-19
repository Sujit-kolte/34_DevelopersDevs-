"use client";
import React, { useState } from "react";

import { IoPerson } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { IoIosHelpCircle } from "react-icons/io";
import { TbSquareToggle } from "react-icons/tb";
import { IoMdNotifications } from "react-icons/io";

const Sidebar = () => {
  const [close, setCLose] = useState<boolean>(false);
  return (
    <div className="h-screen w-64 bg-blue-500 text-white sticky">
      {/* Top Branding or Application Name */}
      <div
        className="ml-2 mb-4 relative flex items-center justify-start h-16 px-6 text-white-400 text-xl font-semibold
      ">
        RapidAid
        <div className="absolute cursor right-5 z-100">
          <IoClose className=" h-6 w-6 text-gray-700" />
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4 px-4">
        {/* Home */}
        <Link
          href="/nurse/home"
          className={`flex items-center space-x-3  px-4 py-2 rounded-md hover:bg-red-100 hover:text-black`}>
          <IoMdHome className="h-6 w-6 text-white-900" />
          <span>Home</span>
        </Link>

        {/* Inbox */}
        <Link
          href="/nurse/profile"
          className="flex items-center space-x-3  hover:bg-red-100 hover:text-black px-4 py-2 rounded-md">
          <IoPerson className="h-6 w-6 text-white-900" />
          <span>Profile</span>
        </Link>

        {/* Calendar */}
        <Link
          href="/chatbot"
          className="flex items-center space-x-3 h hover:bg-red-100 hover:text-black px-4 py-2 rounded-md">
          <IoChatboxEllipsesOutline className="h-6 w-6 text-white-900" />
          <span>Chatbot</span>
        </Link>

        {/* Search */}
        <Link
          href="/nurse/notification"
          className="flex items-center space-x-3  hover:bg-red-100 hover:text-black px-4 py-2 rounded-md">
          <IoMdNotifications className="h-6 w-6 text-white-400" />
          <span>Notification</span>
        </Link>

        {/* Settings */}
      </nav>
    </div>
  );
};

export default Sidebar;
