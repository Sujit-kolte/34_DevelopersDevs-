import Link from "next/link";
import React from "react";

const page = () => {
<<<<<<< HEAD:app/patient/remedies/page.tsx
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
=======
  return <div>Home Page</div>;
>>>>>>> def00561ef88175d8f8756ac6476970e091db284:app/nurse/home/page.tsx
};

export default page;
