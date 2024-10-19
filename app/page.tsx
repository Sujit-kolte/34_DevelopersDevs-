"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "./hooks";
import { auth } from "../firebase.config";
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
};

// Header Component
const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center font-bold text-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-10 h-10 mr-2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2v20M2 12h20"
            />
          </svg>
          <span>RapidAid</span>
        </div>
        <p className="text-lg">Your Health is Our Responsibility</p>
      </div>
    </header>
  );
};

// SignInSignUpCard Component// SignInSignUpCard Component
const SignInSignUpCard = ({ role }: { role: string }) => {
  return (
    <div className="p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold text-blue-600 mb-4">{role}</h3>
        <div className="flex justify-center space-x-4">
          {" "}
          {/* Changed from flex-col to flex-row */}
          <a
            href="#"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full">
            Sign In
          </a>
          <a
            href="#"
            className="bg-white border border-blue-600 hover:bg-blue-100 text-blue-600 font-bold py-2 px-6 rounded-full">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

// FeatureCard Component
const FeatureCard = ({
  title,
  description,
  imgSrc,
}: {
  title: string;
  description: string;
  imgSrc: string;
}) => {
  return (
    <div className="p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center flex flex-col h-full">
        <img
          src={imgSrc}
          alt={title}
          className="mx-auto mb-4 rounded-full h-20"
        />
        <h3 className="text-xl font-semibold text-blue-600 mb-2">{title}</h3>
        <p className="text-gray-600 flex-grow">{description}</p>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-6">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 RapidAid. All rights reserved.</p>
        <p>Contact us: support@rapidaid.com | 1-800-555-1234</p>
      </div>
    </footer>
  );
};

// App Component
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white">
      {/* Loading Screen */}
      {loading && (
        <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Main App */}
      {!loading && (
        <>
          <Header />

          {/* Informative Section */}
          <section className="bg-blue-50 py-6">
            <div className="container mx-auto text-center px-4">
              <p className="text-2xl font-bold text-blue-600 mb-2">
                "Regular health check-ups can prevent potential issues from
                becoming serious!"
              </p>
              <p className="text-lg font-semibold text-gray-700 mb-8">
                "Staying informed about your health is the first step to a
                longer, healthier life."
              </p>
            </div>
          </section>

          {/* Sign In/Sign Up Section */}
          <section className="bg-blue-50 py-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-center px-4">
              <SignInSignUpCard role="Patient" />
              <SignInSignUpCard role="Nurse" />
            </div>
          </section>

          {/* Main Section */}
          <section className="bg-blue-50 py-12">
            <div className="container mx-auto text-center px-4">
              <h1 className="text-4xl font-bold text-blue-600 mb-6">
                Find the Nearest Nurse Instantly
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                A healthcare app designed for senior citizens to connect with
                nurses at the touch of a button.
              </p>
            </div>

            {/* Features Section */}
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 px-4">
              <FeatureCard
                title="Chatbot for Precautionary Care"
                description="A precautionary care chatbot provides personalized health tips, preventive measures, and reminders for proactive wellness management."
                imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm3N2CfF3IjblgO7xjRkYcIlloTtVG_5pDzA&s"
              />
              <FeatureCard
                title="Heart Rate Monitoring and Alerts"
                description="Real-time tracking of heart rates, notifying users of abnormal levels to ensure timely intervention."
                imgSrc="https://via.placeholder.com/150"
              />
              <FeatureCard
                title="Vehicle Assignment"
                description="Vehicle assignment optimizes logistics and response times by allocating available vehicles to nurses."
                imgSrc="https://via.placeholder.com/150"
              />
              <FeatureCard
                title="Live Nurse and Patient Tracking"
                description="Track the location of both the nurse and patient in real-time to ensure accurate and prompt service delivery."
                imgSrc="https://via.placeholder.com/150"
              />
              <FeatureCard
                title="Find the Nearest Nurse"
                description="Instantly connect to the nearest available nurse for immediate assistance using advanced location-based services."
                imgSrc="https://via.placeholder.com/150"
              />
              <FeatureCard
                title="Provide Fastest Vehicle"
                description="Selects the fastest vehicle type for nurses, reducing response times and ensuring swift assistance."
                imgSrc="https://via.placeholder.com/150"
              />
            </div>
          </section>

          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
function io(arg0: string) {
  throw new Error("Function not implemented.");
}
