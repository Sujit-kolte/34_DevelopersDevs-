// src/PatientDetailsPage.jsx
"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { ImSpinner } from "react-icons/im";
import getDocumentById from "@/app/auth/signin/signinimpfun/signinimpfun";
const PatientDetailsPage = ({
  params,
}: {
  params: {
    patientgmail: string;
  };
}) => {
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState({
    error: false,
    success: false,
    loading: false,
  });
  const getinfo = async () => {
    console.log(params.patientgmail.replace("%40", "@"));
    setStatus({
      error: false,
      success: false,
      loading: true,
    });
    try {
      let result = await getDocumentById(
        "patients",
        params.patientgmail.replace("%40", "@"),
      );
      setStatus({
        error: false,
        success: true,
        loading: false,
      });
      console.log(result);
      if (result) {
        setData({ ...result });
      } else {
        throw new Error("error occurred");
      }
    } catch (error) {
      setStatus({
        error: true,
        success: false,
        loading: false,
      });
      setData(null);
    } finally {
      setTimeout(() => {
        setStatus({
          error: false,
          success: false,
          loading: false,
        });
      }, 2000);
    }
  };
  useEffect(() => {
    getinfo();
  }, []);
  return (
    <>
      {status.loading && (
        <div className="w-screen h-screen flex justify-center items-center flex-col">
          <ImSpinner className=" flex justify-center items-center flex-col animate-spin text-5xl" />
          <h1 className="font-bold tracking-widest">
            Wait Fetching Data For You, Patientl...
          </h1>
        </div>
      )}
      {!data && !status.loading && (
        <h1 className="w-screen h-screen flex justify-center items-center flex-col font-bold tracking-widest">
          Incorrrect Patient Details Provided
        </h1>
      )}
      {data && !status.loading && (
        <div className="flex flex-col md:flex-row h-screen">
          {/* Left Partition: Image with Welcome Message */}
          <div
            className="flex-1 bg-cover bg-center hidden md:flex flex-col justify-start items-start p-8 text-white"
            style={{
              backgroundImage:
                "url('https://source.unsplash.com/600x800/?patient')",
            }}>
            <h1 className="text-4xl font-bold mb-2 text-black">RapidAid</h1>
            <h2 className="text-2xl font-semibold text-black">welcomes you!</h2>
          </div>

          {/* Right Partition: Input Fields */}
          <div className="flex-1 flex flex-col justify-center items-center p-8 bg-gray-100">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Patient Details
            </h2>

            <form className="w-full max-w-md space-y-4">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium">
                  Name
                </label>
                <input
                  contentEditable={false}
                  value={data.Name}
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Phone No Input */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-medium">
                  Phone No
                </label>
                <input
                  type="tel"
                  contentEditable={false}
                  value={data.ContactNo}
                  id="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  contentEditable={false}
                  value={data.Email}
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Location Input */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-gray-700 font-medium">
                  Location
                </label>
                <input
                  type="text"
                  value={`Latitude:-${data.Latitude} Longitude:-${data.Longitude}`}
                  id="location"
                  contentEditable={false}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                  placeholder="Enter your location"
                  required
                />
              </div>

              {/* View Location Button */}
              <button
                type="button" // Change to "button" since it's not a submit
                className="flex items-center justify-center w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition duration-200">
                <span className="mr-2">📍</span> {/* Symbol for location */}
                View Location on Map
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientDetailsPage;
