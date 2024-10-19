"use client";
import React, { useState } from "react";
import getDocumentById from "../signinimpfun/signinimpfun";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { createNurse, updateCoordinates } from "@/app/store/nurseSlice";
import { RootState } from "@/app/store";
import { nurseType } from "@/app/types/nursetype";
const EmailLogin = () => {
  const dispatch = useDispatch();
  const nurseInfo = useSelector((state: RootState) => state.nurse);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [notvalid, setNotValid] = useState<boolean>(false); // State for no record found

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

    let result = await getDocumentById("nurse", email);
    if (result) {
      setSubmitted(true);
      setNotValid(false); // Reset no record found state
      console.log(result);

      dispatch(createNurse(result as nurseType));
    } else {
      setSubmitted(false); // Reset submitted state
      setNotValid(true); // Set no record found state
      setError(null); // Clear error state
      setTimeout(() => {
        setNotValid(false); // Clear no record found state after 2 seconds
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login as a Nurse
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Login with your email below
        </p>

        {submitted ? (
          <div className="text-center">
            <p className="text-green-600 font-semibold">
              A login link has been sent to your email.
            </p>
            <p className="text-gray-600 mt-2">You Logged In As A Nurse...</p>
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

            {/* Error Message for Invalid Email or No Record Found */}
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
              Login Via Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EmailLogin;
