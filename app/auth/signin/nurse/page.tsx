"use client";
import React, { useState } from "react";
import getDocumentById from "../signinimpfun/signinimpfun"; // Import function to fetch nurse data by email
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for dispatching actions and selecting state
import { createNurse } from "@/app/store/nurseSlice"; // Action to create nurse record
import { RootState } from "@/app/store"; // Type for accessing the state in the store
import { nurseType } from "@/app/types/nursetype"; // Type for nurse data

// Functional component for Email Login
const EmailLogin = () => {
  const dispatch = useDispatch(); // Used to dispatch actions to the Redux store
  const nurseInfo = useSelector((state: RootState) => state.nurse); // Fetch current nurse state from Redux store
  const [email, setEmail] = useState<string>(""); // State to hold input email value
  const [error, setError] = useState<string | null>(null); // State for displaying error messages
  const [submitted, setSubmitted] = useState<boolean>(false); // State to track form submission status
  const [notvalid, setNotValid] = useState<boolean>(false); // State to track if no record is found for the entered email

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    // Basic form validation to check if email field is empty
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    // Validate email format using a regular expression
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Fetch nurse document by email
    let result = await getDocumentById("nurse", email);
    if (result) {
      setSubmitted(true); // Mark form as submitted
      setNotValid(false); // Reset the "no record found" state
      console.log(result);

      // Dispatch action to create nurse in the Redux store
      dispatch(createNurse(result as nurseType));
    } else {
      setSubmitted(false); // Reset submission state if no record is found
      setNotValid(true); // Mark as "no record found"
      setError(null); // Clear error messages
      // Clear the "no record found" state after 2 seconds
      setTimeout(() => {
        setNotValid(false);
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {/* Header and description */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login as a Nurse
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Login with your email below
        </p>

        {/* Conditionally render login confirmation or login form */}
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

            {/* Display error message if email is invalid or no record is found */}
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

            {/* Submit button */}
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
