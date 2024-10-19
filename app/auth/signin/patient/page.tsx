"use client";
import React, { useState } from "react";
import getDocumentById from "../signinimpfun/signinimpfun";
import { useAppDispatch } from "@/app/hooks";
import { createPatient } from "@/app/store/patientSlice";
import { patientType } from "@/app/types/patienttype";

const PatientLogin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [notvalid, setNotValid] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
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

    let result = await getDocumentById("patients", email);
    if (result) {
      setSubmitted(true);
      console.log(result);
      dispatch(createPatient(result as patientType));
    } else {
      console.log("no nurse found");
      setNotValid(true);
      setError(null);
      setTimeout(() => {
        setNotValid(false);
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Patient Login
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your email below to login
        </p>

        {submitted ? (
          <div className="text-center">
            <p className="text-green-600 font-semibold">
              Logged In Successfully, We Welcome You
            </p>
            <p className="text-gray-600 mt-2">You logged In As A Patient...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
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

            {error && (
              <div className="mb-4 text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            {notvalid && (
              <div className="mb-4 text-white font-bold bg-red-500 rounded-md p-2 text-center">
                No record found
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md transition duration-200">
              Login via Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PatientLogin;
