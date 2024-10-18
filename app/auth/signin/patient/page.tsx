"use client";
import React, { useState } from "react";

const PatientLogin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    // Check if email format is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    setSubmitted(true);

    // Simulate async login logic (e.g., sending a magic link or OTP)
    console.log("Sending login link to:", email);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Patient Login
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your email below to login
        </p>

        {/* Show success message after submission */}
        {submitted ? (
          <div className="text-center">
            <p className="text-green-600 font-semibold">
              A login link has been sent to your email.
            </p>
            <p className="text-gray-600 mt-2">Please check your inbox.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 hover:bg-black text-white font-bold rounded-md transition duration-200">
              Login via Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PatientLogin;
