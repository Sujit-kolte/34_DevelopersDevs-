"use client";
import React, { useState } from "react"; // Importing React and useState for managing component state
import getDocumentById from "../signinimpfun/signinimpfun"; // Importing a function to fetch documents by ID
import { useAppDispatch } from "@/app/hooks"; // Custom hook to get the Redux dispatch function
import { createPatient } from "@/app/store/patientSlice"; // Redux action to create a patient record
import { patientType } from "@/app/types/patienttype"; // Type definition for patient data

const PatientLogin: React.FC = () => {
  // State management for email input, error message, form submission, and validity check
  const [email, setEmail] = useState<string>(""); // State for storing user input email
  const [error, setError] = useState<string | null>(null); // State for displaying validation errors
  const [submitted, setSubmitted] = useState<boolean>(false); // State to check if form is submitted
  const [notvalid, setNotValid] = useState(false); // State to handle invalid form submission
  const dispatch = useAppDispatch(); // Getting the dispatch function from Redux

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents default form submission behavior

    // Basic form validation: checking if the email is entered
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    // Email format validation using regex
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Fetch the document from the database using the email as the ID
    let result = await getDocumentById("patients", email);

    // If patient is found, dispatch the createPatient action and log in the user
    if (result) {
      setSubmitted(true);
      console.log(result);
      dispatch(createPatient(result as patientType)); // Dispatching the patient data to Redux store
    } else {
      // If no patient is found, show an error message and reset the form after a delay
      console.log("no patient found");
      setNotValid(true); // Display error that no record was found
      setError(null);
      setTimeout(() => {
        setNotValid(false); // Hide the error after 2 seconds
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Login form container */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Patient Login
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your email below to login
        </p>

        {submitted ? (
          // Display success message if form is submitted successfully
          <div className="text-center">
            <p className="text-green-600 font-semibold">
              Logged In Successfully, We Welcome You
            </p>
            <p className="text-gray-600 mt-2">You logged in as a Patient...</p>
          </div>
        ) : (
          // Display the login form when not submitted
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
                onChange={(e) => setEmail(e.target.value)} // Update email state on input change
                placeholder="Enter your email"
              />
            </div>

            {/* Display error message if there's any validation error */}
            {error && (
              <div className="mb-4 text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            {/* Display message when no record is found */}
            {notvalid && (
              <div className="mb-4 text-white font-bold bg-red-500 rounded-md p-2 text-center">
                No record found
              </div>
            )}

            {/* Submit button for the form */}
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
