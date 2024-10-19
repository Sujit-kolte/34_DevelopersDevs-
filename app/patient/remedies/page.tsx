import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="text-center w-full h-screen flex justify-center items-center flex-col py-8">
      <h1 className="text-3xl md:text-4xl font-semibold mb-6">
        Get the remedies using our personalized assistant
      </h1>

      <Link
        href="/chatbot"
        className="bg-blue-600 text-white font-bold py-3 px-6 rounded hover:bg-blue-700 transition duration-200"
      >
        Use Our Personalized Chatbot / Assistant
      </Link>
    </div>
  );
};

export default page;
